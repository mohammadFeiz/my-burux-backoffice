import React,{Component} from 'react';
import AIOButton from 'aio-button'; 
import AppContext from './../../app-context';
import RVD from 'react-virtual-dom';
import UserForm from './../../components/user-form/user-form';
import {Icon} from '@mdi/react';
import {mdiDotsHorizontal} from '@mdi/js';
import Table from './../../components/table/table';
import Popup from '../../components/popup/popup';
export default class TarikhcheGardoone extends Component{
  static contextType = AppContext;
  constructor(props){
    super(props);
    this.state = {
      showDetail:false
    }
  }
  async changeActivity(item){
    let {services} = this.context;
    let {items} = this.state;
    let res = await services({type:'taghyire_faaliate_gardoone',parameter:{state:!item.gardooneStatus,userId:item.userId}})
    if(res){
      item.gardooneStatus = !item.gardooneStatus;
      this.setState({items})
    }
  }
  async componentDidMount(){
    let {services} = this.context;
    let items = await services({type:'tarikhche_gardoone'});
    let {users} = this.context;
    let usersDic = {}
    for(let i = 0; i < users.length; i++){
      let user = users[i];
      usersDic[user.id] = user;
    }
    this.setState({items:items.map((o)=>{
      return {...o,...usersDic[o.userId]}
    })})
  }
  table(){
    let {items} = this.state;
    if(!items){return 'در حال بارگزاری'}
    if(!items.length){return 'موردی موجود نیست'}
    let valueOptions = [{text:'همه'},{text:'فعال',value:true},{text:'غیر فعال',value:false}];
    
    return (
      <Table
        editGroupName={(name)=>{
          if(name === 'true'){return 'فعال'}
          if(name === 'false'){return 'غیر فعال'}
        }}
        model={items}
        templates={{
          'options':(row)=>{
            return (
              <AIOButton
                type='button'
                onClick={()=>this.setState({showDetail:row})}
                style={{background:'none',width:16,height:16,background:'dodgerblue',borderRadius:'100%',color:'#fff'}}
                text={<Icon path={mdiDotsHorizontal} size={0.6}/>}
              />
            )
          },
          'status':(row)=>{
            return (
              <button 
                style={{fontFamily:'inherit',background:row.gardooneStatus?'#00800073':'#ff000080',color:'#fff',border:'none',width:60,height:24,borderRadius:4,fontSize:12}}
                onClick={()=>this.changeActivity(row)}
              >{row.gardooneStatus?'فعال':'غیر فعال'}</button>
            )
          },
        }}
        columns={[
          {title:'نام',field:'row.firstname',search:true,width:160,titleJustify:false},
          {title:'نام خانوادگی',field:'row.lastname',search:true,width:160,titleJustify:false},
          {title:'کد مشتری',field:'row.code',search:true,width:80},
          {title:'شماره تلفن',field:'row.mobile',search:true,width:110},
          {title:'دفعات شرکت در گردونه',field:'row.tryCount',width:160,justify:true},
          {title:'دفعات برنده شده',field:'row.winCount',width:120,justify:true},
          {
            type:'text',title:'وضعیت گردونه',field:'row.gardooneStatus',width:140,justify:true,
            template:'status',
            filter:{add:false,items:[{operator:'equal'}],operators:['equal'],valueOptions}
          },
          {title:'',justify:true,width:80,template:'options'},
          {title:''}
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
        {
          showDetail &&
          <JoziateGardoone
            model={showDetail}
            onClose={()=>this.setState({showDetail:false})}
          />
        }
      </>
    )
  }
}
class JoziateGardoone extends Component{
  static contextType = AppContext;
  constructor(props){
    super(props);
    this.state = {}
  }
  async componentDidMount(){
    let {services} = this.context;
    let {model} = this.props;
    let history = await services({type:'tarikhche_javayeze_barande_shode',parameter:{userId:model.userId}})
    this.setState({history})
  }
  tarikhcheJavayezeBarandeShode_table(){
    let {history} = this.state;
    if(!history){return 'loading'}
    if(!history.length){return 'empty'}
    return (
      <Table
        model={history}
        columns={[
          {title:'تاریخ',field:'row.date',titleJustify:false},
          {title:'جایزه',field:'row.award',titleJustify:false}
        ]}
      />
    )
  }
  getContent(tabIndex){
    if(tabIndex === 0){return this.tarikhcheJavayezeBarandeShode_table()}
    if(tabIndex === 1){return <UserForm user={this.props.model}/>}
  }
  render(){
    let {onClose} = this.props
    return (  
      <Popup
        title='درخواست برداشت از کیف پول'
        onClose={onClose}
        tabs={['تاریخچه جوایز برنده شده','اطلاعات کاربر']}
        getContent={(tabIndex)=>this.getContent(tabIndex)}
      />
    )
  }
}