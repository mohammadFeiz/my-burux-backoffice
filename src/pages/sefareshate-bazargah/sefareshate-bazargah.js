import React,{Component} from 'react';
import AIOButton from 'aio-button'; 
import AppContext from './../../app-context';
import RVD from 'react-virtual-dom';
import PageHeader from './../../components/page-header/page-header';
import OrderForm from './../../components/order-form/order-form';
import {Icon} from '@mdi/react';
import {mdiDotsHorizontal,mdiClose} from '@mdi/js';
import Table from './../../components/table/index';
export default class SefareshateBazargah extends Component{
  static contextType = AppContext;
  constructor(props){
    super(props);
    this.state = {
      showDetail:false
    }
  }
  componentDidMount(){
    let items = [
      {orderNumber:'4324',orderDate:'1400/3/3',firstname:'محمد',lastname:'فیض',state:'تهران',city:'تهران',mobile:'09123534314',orderAmount:12345678,orderStatus:'0',"latitude": 35.699739,"longitude": 51.338097},
      {orderNumber:'4324',orderDate:'1400/3/3',firstname:'محمد',lastname:'فیض',state:'تهران',city:'تهران',mobile:'09123534314',orderAmount:12345678,orderStatus:'1',"latitude": 35.699739,"longitude": 51.338097},
      {orderNumber:'4324',orderDate:'1400/3/3',firstname:'محمد',lastname:'فیض',state:'تهران',city:'تهران',mobile:'09123534314',orderAmount:12345678,orderStatus:'2',"latitude": 35.699739,"longitude": 51.338097},
      {orderNumber:'4324',orderDate:'1400/3/3',firstname:'محمد',lastname:'فیض',state:'تهران',city:'تهران',mobile:'09123534314',orderAmount:12345678,orderStatus:'3',"latitude": 35.699739,"longitude": 51.338097},
      {orderNumber:'4324',orderDate:'1400/3/3',firstname:'محمد',lastname:'فیض',state:'تهران',city:'تهران',mobile:'09123534314',orderAmount:12345678,orderStatus:'4',"latitude": 35.699739,"longitude": 51.338097},
      {orderNumber:'4324',orderDate:'1400/3/3',firstname:'محمد',lastname:'فیض',state:'تهران',city:'تهران',mobile:'09123534314',orderAmount:12345678,orderStatus:'1',"latitude": 35.699739,"longitude": 51.338097},
      {orderNumber:'4324',orderDate:'1400/3/3',firstname:'محمد',lastname:'فیض',state:'تهران',city:'تهران',mobile:'09123534314',orderAmount:12345678,orderStatus:'2',"latitude": 35.699739,"longitude": 51.338097},
      {orderNumber:'4324',orderDate:'1400/3/3',firstname:'محمد',lastname:'فیض',state:'تهران',city:'تهران',mobile:'09123534314',orderAmount:12345678,orderStatus:'3',"latitude": 35.699739,"longitude": 51.338097}
    ]
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
          rtl={true}
          editGroupName={(name)=>bazargahStatuses[name]}
          rowHeight={30} headerHeight={30} striped={true} model={items}
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
            'status':(row)=>bazargahStatuses[row.orderStatus]
          }}
          columns={[
            {title:'شماره سفارش',field:'row.orderNumber',search:true,minWidth:110},
            {title:'تاریخ سفارش',field:'row.orderDate',search:true,width:110},
            {title:'نام',field:'row.firstname',search:true,width:80},
            {title:'نام خانوادگی',field:'row.lastname',search:true,width:110},
            {title:'استان',field:'row.state',width:160},
            {title:'شهر',field:'row.city',search:true,width:120},
            {title:'شماره تلفن',field:'row.mobile',search:true,width:120},
            {title:'مبلغ سفارش',field:'row.orderAmount',width:120},
            {
              type:'text',title:'وضعیت گردونه',field:'row.orderStatus',group:true,width:140,justify:true,
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
  constructor(props){
    super(props);
    this.state = {
      order:props.order,
      inputs0:[
        {type:'text',field:'model.requestDate',label:'تاریخ درخواست',rowKey:'1',disabled:true},
        {type:'html',html:()=>'',rowWidth:12,rowKey:'1'},
        {type:'text',field:'model.requestCount',label:'تعداد درخواست های فعال',rowKey:'1',disabled:true},
        {type:'text',field:'model.amount',label:'مبلغ درخواست',rowKey:'2',disabled:true},
        {type:'html',html:()=>'',rowWidth:12,rowKey:'2'},
        {type:'text',field:'model.cardNumber',label:'شماره حساب واریزی',rowKey:'2',disabled:true},
        {type:'html',html:()=>{
          return <button className='button-1'>تایید و ارجاع به واحد مالی</button>
        },rowKey:'3',rowWidth:'fit-content'},
        {type:'html',html:()=>'',rowWidth:12,rowKey:'3'},
        {type:'html',html:()=>{
          return <button className='button-2'>رد درخواست</button>
        },rowKey:'3'}
      ],
      tabs:[
        {text:'اطلاعات سفارش',value:'0'},
        {text:'تاریخچه تغییر وضعیت',value:'1'},
      ],
      activeTabId:'0'
    }
  }
  componentDidMount(){
    let history = [
      {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
      {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
      {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
      {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
      {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
      {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
      {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
      {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
      {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
      {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
      {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
      {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'}
    ]
    this.setState({history})
  }
  header_layout(){
    let {onClose} = this.props;
    return {
      size:48, 
      className:'bgDDD color323130',
      row:[
        {flex:1,html:'جزئیات سفارش',align:'v',className:'padding-0-24 size20'},
        {size:48,html:<Icon path={mdiClose} size={0.8}/>,align:'vh',attrs:{onClick:()=>onClose()}}
      ]
    }
  }
  tarikhcheTaghireVaziat_table(){
    let {history} = this.state;
    return (
      <Table
        rowHeight={30} headerHeight={30} striped={true} model={history}
        columns={[
          {title:'تاریخ',field:'row.date'},
          {title:'جایزه',field:'row.description'}
        ]}
      />
    )
  }
  tab0_layout(){
    let {activeTabId,order} = this.state;
    if(activeTabId !== '0'){return false}
    return {flex:1,html:<OrderForm order={order}/>}
  }
  tab1_layout(){
    let {activeTabId,history} = this.state;
    if(activeTabId !== '1'){return false}
    if(!history){return {flex:1,html:'در حال بارگزاری',align:'vh'}}
    if(!history.length){return {flex:1,html:'موردی موجود نیست',align:'vh'}}
    return {flex:1,html:this.tarikhcheTaghireVaziat_table()}
  }
  body_layout(){
    let {tabs,activeTabId} = this.state;
    return {
      flex:1,
      column:[
        {html:(<AIOButton type='tabs' options={tabs} value={activeTabId} onChange={(activeTabId)=>this.setState({activeTabId})}/>)},
        this.tab0_layout(),
        this.tab1_layout(),
      ]
    }
  }
  render(){
    return (  
      <div className='popup full-screen'>
        <RVD
          layout={{
            className:'form',style:{flex:'none'},
            column:[
              this.header_layout(),
              this.body_layout()
            ]
          }}
        />  
      </div>
    )
  }
}