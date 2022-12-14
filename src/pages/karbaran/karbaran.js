import React,{Component} from 'react';
import RVD from 'react-virtual-dom';
import Table from './../../components/table/table';
import AIOButton from 'aio-button';
import UserForm from './../../components/user-form/user-form';
import {Icon} from '@mdi/react';
import {mdiDotsHorizontal} from '@mdi/js';
import {Popup} from 'react-super-app';
import AppContext from './../../app-context';
export default class Karbaran extends Component{
  static contextType = AppContext;
  constructor(props){
    super(props);
    this.state = {
      showDetail:false
    }
  }
  table(){
    let {activityStatuses,users} = this.context;
    if(!users){return 'در حال بارگزاری'}
    if(!users.length){return 'موردی موجود نیست'}
    return (
        <Table
          editGroupName={(name)=>{return activityStatuses[name]}}
          model={users}
          templates={{
            'status':(row)=>activityStatuses[row.activityStatus],
            'options':(row)=>{
              return (
                <AIOButton
                  type='button' onClick={()=>this.setState({showDetail:row})}
                  style={{background:'none',width:16,height:16,background:'dodgerblue',borderRadius:'100%',color:'#fff'}}
                  text={<Icon path={mdiDotsHorizontal} size={0.6}/>}
                />
              )
            }
          }}
          columns={[
            {title:'نام',field:'row.firstname',search:true,minWidth:110},
            {title:'نام خانوادگی',field:'row.lastname',search:true,width:110},
            {title:'کد مشتری',field:'row.code',search:true,width:80},
            {title:'شماره تلفن',field:'row.mobile',search:true,width:110},
            {title:'استان',field:'row.state',search:true,width:80},
            {title:'شهر',field:'row.city',search:true,width:80},
            {title:'وضعیت',field:'row.activityStatus',search:true,group:true,width:110,template:'status'},
            {title:'',justify:true,width:80,template:'options'},
          ]}
        />
      )
  }
  render(){
    let {showDetail} = this.state;
    return (
      <>
        <RVD
          layout={{
            className:'page',
            html:this.table()
          }}
        />
        {showDetail && <JoziateKarbar model={showDetail} onClose={()=>this.setState({showDetail:false})}/>}
      </>
    )
  }
}
class JoziateKarbar extends Component{
  render(){
    let {onClose,model} = this.props;
    return (<Popup title='اطلاعات کاربر' onClose={onClose} getContent={()=><UserForm user={model}/>}/>)
  }
}