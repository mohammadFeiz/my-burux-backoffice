import React,{Component} from 'react';
import AIOButton from 'aio-button'; 
import AppContext from './../../app-context';
import {splitNumber} from './../../components/super-app/super-app';
import RVD from 'react-virtual-dom';
import PageHeader from './../../components/page-header/page-header';
import OrderForm from './../../components/order-form/order-form';
import {Icon} from '@mdi/react';
import {mdiDotsHorizontal} from '@mdi/js';
import Table from './../../components/table/table';
import Popup from '../../components/popup/popup';
export default class SefareshateBazargah extends Component{
  static contextType = AppContext;
  constructor(props){
    super(props);
    this.state = {
      showDetail:false
    }
  }
  async componentDidMount(){
    let {services} = this.context;
    let items = await services({type:'sefareshate_bazargah'});
    this.setState({items})
  }
  header_layout(){return {html:<PageHeader title='سفارشات بازارگاه'/>}}
  body_layout(){
    let {items} = this.state;
    let {bazargahStatuses} = this.context;
    if(!items){return {flex:1,html:'در حال بارگزاری',align:'vh'}}
    if(!items.length){return {flex:1,html:'موردی موجود نیست',align:'vh'}}
    let valueOptions = [{text:'همه'}];
    for(let prop in bazargahStatuses){
      valueOptions.push({text:bazargahStatuses[prop],value:prop})
    }
    return {
      flex:1,
      html:(
        <Table
          editGroupName={(name)=>bazargahStatuses[name]}
          model={items}
          setModel={(items)=>this.setState({items})}
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
            'amount':(row)=>splitNumber(row.orderAmount) + ' ریال',
            'status':(row)=>bazargahStatuses[row.orderStatus]
          }}
          columns={[
            {title:'شماره سفارش',field:'row.orderNumber',search:true,minWidth:110,titleJustify:false,toggle:true},
            {title:'تاریخ سفارش',type:'date',field:'row.orderDate',search:true,width:110,titleJustify:false,toggle:true,sort:true},
            {title:'نام',field:'row.firstname',search:true,width:80,titleJustify:false,toggle:true},
            {title:'نام خانوادگی',field:'row.lastname',search:true,width:110,titleJustify:false,toggle:true},
            {title:'استان',field:'row.state',width:160,search:true,justify:true,toggle:true,sort:true},
            {title:'شهر',field:'row.city',search:true,width:120,justify:true,toggle:true,sort:true},
            {title:'شماره تلفن',field:'row.mobile',search:true,width:120,toggle:true},
            {title:'مبلغ سفارش',field:'row.orderAmount',width:120,titleJustify:false,toggle:true,sort:true,template:'amount'},
            {
              type:'text',title:'وضعیت گردونه',field:'row.orderStatus',width:140,titleJustify:false,toggle:true,
              template:'status',
              filter:{add:false,items:[{operator:'equal'}],operators:['equal'],valueOptions}
            },
            {title:'',justify:true,width:80,template:'options'}
          ]}
        />
      )
    }
  }
  render(){
    let {showDetail} = this.state;
    return (
      <>
        <RVD
          layout={{
            style:{flex:'none'},className:'page',
            column:[this.header_layout(),this.body_layout()]
          }}
        />
        {
          showDetail &&
          <JoziateSefaresheBazargah
            order={showDetail}
            onClose={()=>this.setState({showDetail:false})}
          />
        }
      </>
    )
  }
}

class JoziateSefaresheBazargah extends Component{
  static contextType = AppContext;
  async componentDidMount(){
    let {services} = this.context;
    let history = await services({type:'tarikhche_taghire_vaziate_bazargah'})
    this.setState({history})
  }
  tarikhcheTaghireVaziat_table(){
    let {history} = this.state;
    if(!history){return 'loading'}
    if(!history.length){return 'empty'}
    return (
      <Table
        model={history}
        columns={[
          {title:'تاریخ',field:'row.date'},
          {title:'جایزه',field:'row.description'}
        ]}
      />
    )
  }
  getContent(tabIndex){
    if(tabIndex === 0){return <OrderForm order={this.props.order}/>}
    if(tabIndex === 0){return this.tarikhcheTaghireVaziat_table()}
  }
  render(){
    let {onClose} = this.props;
    return (  
      <Popup 
        title='جزئیات سفارش'
        onClose={onClose}
        tabs={['اطلاعات سفارش','تاریخچه تغییر وضعیت']}
        getContent={(tabIndex)=>this.getContent(tabIndex)}
      />
    )
  }
}