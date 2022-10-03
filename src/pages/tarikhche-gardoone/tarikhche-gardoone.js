import React,{Component} from 'react';
import AIOButton from 'aio-button'; 
import AppContext from './../../app-context';
import RVD from 'react-virtual-dom';
import PageHeader from './../../components/page-header/page-header';
import UserForm from './../../components/user-form/user-form';
import {Icon} from '@mdi/react';
import {mdiDotsHorizontal,mdiClose} from '@mdi/js';
import Table from './../../components/table/index';
export default class TarikhcheGardoone extends Component{
  static contextType = AppContext;
  constructor(props){
    super(props);
    this.state = {
      items:[],
      showDetail:false
    }
  }
  componentDidMount(){
    let items = [
      {winCount:1,tryCount:12,gardooneStatus:true,userId:'0'},
      {winCount:1,tryCount:12,gardooneStatus:false,userId:'1'},
      {winCount:1,tryCount:12,gardooneStatus:true,userId:'2'},
      {winCount:1,tryCount:12,gardooneStatus:false,userId:'3'},
      {winCount:1,tryCount:12,gardooneStatus:true,userId:'4'}
    ]
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
    return {html:<PageHeader title='تاریخچه گردونه'/>} 
  }
  body_layout(){
    let {items} = this.state;
    if(!items){return {flex:1,html:'در حال بارگزاری',align:'vh'}}
    if(!items.length){return {flex:1,html:'موردی موجود نیست',align:'vh'}}
    let valueOptions = [{text:'همه'},{text:'فعال',value:true},{text:'غیر فعال',value:false}];
    
    return {
      flex:1,
      html:(
        <Table
          rtl={true}
          editGroupName={(name)=>{
            if(name === 'true'){return 'فعال'}
            if(name === 'false'){return 'غیر فعال'}
          }}
          rowHeight={48} headerHeight={30} striped={true} model={items}
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
                <button style={{background:row.gardooneStatus?'green':'red',color:'#fff',border:'none',width:60,height:30,borderRadius:4}}>{row.gardooneStatus?'فعال':'غیر فعال'}</button>
              )
            },
          }}
          columns={[
            {title:'نام',field:'row.firstname',search:true,minWidth:110},
            {title:'نام خانوادگی',field:'row.lastname',search:true,width:110},
            {title:'کد مشتری',field:'row.code',search:true,width:80},
            {title:'شماره تلفن',field:'row.mobile',search:true,width:110},
            {title:'دفعات شرکت در گردونه',field:'row.tryCount',width:160},
            {title:'دفعات برنده شده',field:'row.winCount',search:true,width:120},
            {
              type:'text',title:'وضعیت گردونه',field:'row.gardooneStatus',group:true,width:140,justify:true,
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
        {text:'تاریخچه جوایز برنده شده',value:'0'},
        {text:'اطلاعات کاربر',value:'1'},
      ],
      activeTabId:'0'
    }
  }
  componentDidMount(){
    let history = [
      {date:'1401/4/5 12:20',award:'جایزه 1'},
      {date:'1401/4/5 12:20',award:'جایزه 1'},
      {date:'1401/4/5 12:20',award:'جایزه 1'},
      {date:'1401/4/5 12:20',award:'جایزه 1'},
      {date:'1401/4/5 12:20',award:'جایزه 1'},
      {date:'1401/4/5 12:20',award:'جایزه 1'},
      {date:'1401/4/5 12:20',award:'جایزه 1'},
      {date:'1401/4/5 12:20',award:'جایزه 1'},
      {date:'1401/4/5 12:20',award:'جایزه 1'},
      {date:'1401/4/5 12:20',award:'جایزه 1'}
    ]
    this.setState({history})
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
  tarikhcheJavayezeBarandeShode_table(){
    let {history} = this.state;
    return (
      <Table
        rowHeight={30} headerHeight={30} striped={true} model={history}
        columns={[
          {title:'تاریخ',field:'row.date'},
          {title:'جایزه',field:'row.award'}
        ]}
      />
    )
  }
  tab0_layout(){
    let {activeTabId,history} = this.state;
    if(activeTabId !== '0'){return false}
    if(!history){return {flex:1,html:'در حال بارگزاری',align:'vh'}}
    if(!history.length){return {flex:1,html:'موردی موجود نیست',align:'vh'}}
    return {flex:1,html:this.tarikhcheJavayezeBarandeShode_table()}
  }
  tab1_layout(){
    let {activeTabId} = this.state;
    let {model} = this.props;
    if(activeTabId !== '1'){return false}
    return {flex:1,html:<UserForm user={model}/>}
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
  changeActivity(){

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