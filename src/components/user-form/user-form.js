import React,{Component} from 'react';
import AppContext from './../../app-context';
import AIOForm from './../../components/form/index';
import Map from './../../components/map/index';

export default class UserForm extends Component{
  static contextType = AppContext;
  constructor(props){
    super(props);
    this.state = {
      user:props.user
    }
  }
  render(){
    let {activityStatuses} = this.context;
    let {user} = this.state;
    return (
      <AIOForm 
          style={{background:'#fff'}}
          inputStyle={{background:'#f8f8f8',border:'none',height:30}}
          title='اطلاعات کاربر' 
          model={user} 
          data={{activityStatusOptions:Object.keys(activityStatuses).map((o)=>{return {text:activityStatuses[o],value:o}})}}
          onChange={(user)=>this.setState({user})}
          onSubmit={()=>{

          }}
          inputs={[
            {type:'text',field:'model.firstname',label:'نام',rowKey:'1'},
            {type:'html',html:()=>'',rowWidth:12,rowKey:'1'},
            {type:'text',field:'model.lastname',label:'نام خانوادگی',rowKey:'1'},
            {type:'text',field:'model.mobile',label:'شماره همراه',rowKey:'2'},
            {type:'html',html:()=>'',rowWidth:12,rowKey:'2'},
            {type:'text',field:'model.phone',label:'شماره ثابت',rowKey:'2'},
            {type:'text',field:'model.shopName',label:'نام فروشگاه',rowKey:'3'},
            {type:'html',html:({latitude,longitude})=>{
              return (
                <Map 
                  latitude={latitude} longitude={longitude} changeView={false}
                  onClick={()=>this.setState({showMap:true})}
                  style={{width:'100%',height:'120px',border:'1px solid'}}
                />
              )
            },label:'موقعیت فروشگاه'},
            {type:'text',field:'model.state',label:'استان',rowKey:'4'},
            {type:'html',html:()=>'',rowWidth:12,rowKey:'4'},
            {type:'text',field:'model.city',label:'شهر',rowKey:'4'},
            {
              type:'radio',field:'model.activityStatus',label:'وضعیت کاربر',
              options:'props.data.activityStatusOptions',
            }
          ]} 
        />
    )
  }
}