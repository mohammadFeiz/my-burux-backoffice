import React,{Component} from 'react';
import AppContext from './../../app-context';
import AIOForm from './../../components/form/index';
import Map from './../../components/map/index';

export default class OrderForm extends Component{
  static contextType = AppContext;
  constructor(props){
    super(props);
    this.state = {
      order:props.order
    }
  }
  render(){
    let {order} = this.state;
    return (
      <AIOForm 
          style={{background:'#fff'}}
          inputStyle={{background:'#f8f8f8',border:'none',height:30}}
          model={order} 
          onChange={(order)=>this.setState({order})}
          onSubmit={()=>{

          }}
          inputs={[
            {type:'text',field:'model.firstname',label:'نام',rowKey:'1'},
            {type:'html',html:()=>'',rowWidth:12,rowKey:'1'},
            {type:'text',field:'model.lastname',label:'نام خانوادگی',rowKey:'1'},
            {type:'text',field:'model.mobile',label:'شماره همراه',rowKey:'2'},
            {type:'html',html:()=>'',rowWidth:12,rowKey:'2'},
            {type:'text',field:'model.phone',label:'شماره ثابت',rowKey:'2'},
            {type:'html',html:({latitude,longitude})=>{
              return (
                <Map 
                  latitude={latitude} longitude={longitude} changeView={false}
                  onClick={()=>this.setState({showMap:true})}
                  style={{width:'100%',height:'120px',border:'1px solid'}}
                />
              )
            },label:'موقعیت محل تحویل'},
            {type:'text',field:'model.state',label:'استان تحویل',rowKey:'4'},
            {type:'html',html:()=>'',rowWidth:12,rowKey:'4'},
            {type:'text',field:'model.city',label:'شهر تحویل',rowKey:'4'},
            {type:'textarea',autoHeight:true,field:'model.address',label:'آدرس تحویل'}
          ]} 
        />
    )
  }
}