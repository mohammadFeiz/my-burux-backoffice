

import React,{Component} from 'react';
import AIOButton from 'aio-button'; 
import AppContext from './../../app-context';
import RVD from 'react-virtual-dom';
import AIOForm from './../../components/form/index';
import PageHeader from './../../components/page-header/page-header';
import UserForm from './../../components/user-form/user-form';
import {Icon} from '@mdi/react';
import {mdiDotsHorizontal,mdiClose} from '@mdi/js';
import Table from './../../components/table/index';
import services from '../../services';
export default class DarkhasteBardasht extends Component{
  static contextType = AppContext;
  constructor(props){
    super(props);
    this.state = {
      items:[],
      showDetail:false
    }
  }
  async componentDidMount(){
    let {services} = this.context;
    let items = await services({type:'darkhaste_bardasht'})
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
  header_layout(){
    return {html:<PageHeader title='درخواست برداشت'/>}
  }
  body_layout(){
    let {items} = this.state;
    let {darkhasteBardashtStatuses} = this.context;
    if(!items){return {flex:1,html:'در حال بارگزاری',align:'vh'}}
    if(!items.length){return {flex:1,html:'موردی موجود نیست',align:'vh'}}
    let valueOptions = [{text:'همه'}];
    for(let prop in darkhasteBardashtStatuses){
      valueOptions.push({text:darkhasteBardashtStatuses[prop],value:prop})
    }
    return {
      flex:1,
      html:(
        <Table
          rtl={true}
          editGroupName={(name)=>{return darkhasteBardashtStatuses[name]}}
          rowHeight={48}
          headerHeight={30}
          striped={true}
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
            'status':(row)=>this.context.darkhasteBardashtStatuses[row.darkhasteBardashtStatus],
            'amount':(row)=>this.context.splitNumber(row.amount) + ' ریال'
          }}
          columns={[
            {title:'نام',field:'row.firstname',search:true,minWidth:110},
            {title:'نام خانوادگی',field:'row.lastname',search:true,width:110},
            {title:'کد مشتری',field:'row.code',search:true,width:80},
            {title:'شماره تلفن',field:'row.mobile',search:true,width:110},
            {title:'مبلغ',field:'row.amount',search:true,width:120,template:'amount'},
            {title:'تعداد درخواست های فعال',field:'row.requestCount',search:true,width:160},
            {title:'تاریخ درخواست',field:'row.requestDate',search:true,width:120},
            {
              type:'text',title:'وضعیت',field:'row.darkhasteBardashtStatus',search:true,group:true,width:120,
              template:'status',
              editFilter:false,
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
            style:{flex:'none'},
            className:'page',
            column:[
              this.header_layout(),
              this.body_layout()
            ]
          }}
        />
        {
          showDetail &&
          <JoziateDarkhasteBardasht
            model={showDetail}
            onClose={()=>this.setState({showDetail:false})}
          />
        }
      </>
    )
  }
}


class JoziateDarkhasteBardasht extends Component{
  static contextType = AppContext;
  constructor(props){
    super(props);
    this.state = {
      model:props.model,
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
        {text:'جزئیات درخواست',value:'0'},
        {text:'تاریخچه درخواست ها',value:'1'},
        {text:'اطلاعات کاربر',value:'2'},
      ],
      activeTabId:'1'
    }
  }
  async componentDidMount(){
    let {services} = this.context;
    let {model} = this.props;
    let history = await services({type:'darkhaste_bardasht_history',parameter:{userId:model.userId}})
    let {users} = this.context;
    let usersDic = {}
    for(let i = 0; i < users.length; i++){
      let user = users[i];
      usersDic[user.id] = user;
    }
    
    this.setState({history:history.map((o)=>{
      return {...o,...usersDic[model.userId]}
    })})
  }
  header_layout(){
    let {onClose} = this.props;
    return {
      size:48, 
      className:'bgDDD color323130',
      row:[
        {flex:1,html:'درخواست برداشت از کیف پول',align:'v',className:'padding-0-24 size20'},
        {size:48,html:<Icon path={mdiClose} size={0.8}/>,align:'vh',attrs:{onClick:()=>onClose()}}
      ]
    }
  }
  joziateDarkhast_form(){
    let {inputs0,model,activeTabId} = this.state;
    return (
      <AIOForm 
        key={activeTabId}
        style={{background:'#fff'}}
        inputStyle={{background:'#f8f8f8',border:'none',height:30}}
        title='درخواست برداشت از کیف پول' inputs={inputs0} model={model} 
        onChange={(model)=>this.setState({model})}
      />
    )
  }
  tarikhcheDarkhast_table(){
    let {history} = this.state;
    let {darkhasteBardashtStatuses} = this.context;
    return (
      <Table
        rowHeight={30}
        headerHeight={30}
        striped={true}
        model={history}
        templates={{
          'amount':(row)=>this.context.splitNumber(row.amount) + ' ریال',
          'cardNumber':(row)=>this.context.splitNumber(row.cardNumber,4,'-'),
          'status':(row)=>darkhasteBardashtStatuses[row.darkhasteBardashtStatus]
        }}
        columns={[
          {title:'مبلغ',field:'row.amount',width:120,template:'amount'},
          {title:'شماره حساب واریزی',field:'row.cardNumber',width:160,template:'cardNumber'},
          {title:'تاریخ درخواست',field:'row.requestDate',width:120},
          {title:'وضعیت',field:'row.darkhasteBardashtStatus',width:120,template:'status'}
        ]}
      />
    )
  }
  tab0_layout(){
    let {activeTabId} = this.state;
    if(activeTabId !== '0'){return false}
    return {flex:1,html:this.joziateDarkhast_form()}
  }
  tab1_layout(){
    let {activeTabId,history} = this.state;
    if(activeTabId !== '1'){return false}
    if(!history){
      return {flex:1,html:'در حال بارگزاری',align:'vh'}
    }
    if(!history.length){
      return {flex:1,html:'موردی موجود نیست',align:'vh'}
    }
    return {flex:1,html:this.tarikhcheDarkhast_table()}
  }
  tab2_layout(){
    let {activeTabId} = this.state;
    let {model} = this.props;
    if(activeTabId !== '2'){return false}
    return {flex:1,html:<UserForm user={model}/>}
  }
  body_layout(){
    let {tabs,activeTabId} = this.state;
    return {
      flex:1,
      column:[
        {
          html:(
            <AIOButton
              type='tabs'
              options={tabs}
              value={activeTabId}
              onChange={(activeTabId)=>this.setState({activeTabId})}
            />
          )
        },
        this.tab0_layout(),
        this.tab1_layout(),
        this.tab2_layout()
      ]
    }
  }
  render(){
    return (  
      <div className='popup full-screen'>
        <RVD
        layout={{
          className:'form',
          style:{flex:'none'},
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