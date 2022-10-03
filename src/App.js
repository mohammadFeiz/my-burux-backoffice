import React, { Component } from 'react';
import RVD from 'react-virtual-dom';
import getSvg from './getSvg';
import AppContext from './app-context';
import Karbaran from './pages/karbaran/karbaran';
import DarkhasteBardasht from './pages/darkhaste-bardasht/darkhaste-bardasht';
import TarikhcheGardoone from './pages/tarikhche-gardoone/tarikhche-gardoone';
import SefareshateBazargah from './pages/sefareshate-bazargah/sefareshate-bazargah';
import Services from './services';
import './style.css';
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      services:Services(()=>this.state),
      sideActiveIndex:4,
      activityStatuses:{'0':'در انتظار تایید','1':'تایید شده','2':'رد شده'},
      darkhasteBardashtStatuses:{'0':'در انتظار تایید','1':'در انتظار پرداخت','2':'پرداخت شده','3':'رد شده'},
      bazargahStatuses:{
        '0':'اخذ شده',
        '1':'در انتظار ارسال',
        '2':'در انتظار اخذ',
        '3':'در حال تحویل پیک',
        '4':'تحویل شده'
      },
      gardooneStatuses:{
        '0':'فعال',
        '1':'غیر فعال'
      },
      user:{
        name:'کیانا کاوه'
      },
      users:[]
    }
  }
  async componentDidMount(){
    let {services} = this.state;
    let users = await services({type:'users'})
    this.setState({users})
  }
  splitNumber(price,count = 3,splitter = ','){
    if(!price){return price}
    let str = price.toString()
    let dotIndex = str.indexOf('.');
    if(dotIndex !== -1){
        str = str.slice(0,dotIndex)
    }
    let res = ''
    let index = 0;
    for(let i = str.length - 1; i >= 0; i--){
        res = str[i] + res;
        if(index === count - 1){
            index = 0;
            if(i > 0){res = splitter + res;}
        }
        else{index++}
    }
    return res
  }
  getContext() {
    return {
      ...this.state,
      SetState:(obj)=>this.setState(obj),
      splitNumber:this.splitNumber.bind(this)
    }
  }
  side_layout() {
    return { size: 240, html: <Side /> };
  }
  page_layout(){
    let {sideActiveIndex} = this.state;
    if(sideActiveIndex === 0){
      return {flex:1,html:<Karbaran/>}
    }
    if(sideActiveIndex === 1){
      return {flex:1,html:<DarkhasteBardasht/>}
    }
    if(sideActiveIndex === 2){
      return {flex:1,html:<TarikhcheGardoone/>}
    }
    if(sideActiveIndex === 4){
      return {flex:1,html:<SefareshateBazargah/>}
    }
  }
  
  render() {
    return (
      <AppContext.Provider value={this.getContext()}>
        <RVD
          layout={{
            className: 'full-screen',
            row: [
              this.side_layout(),
              this.page_layout()
            ],
          }}
        />
      </AppContext.Provider>
    );
  }
}

class Side extends Component {
  static contextType = AppContext;
  constructor(props){
    super(props);
    this.state = {
      items:[
        {icon:'karbaran',text:'کاربران'},
        {icon:'darkhaste_bardasht',text:'درخواست برداشت'},
        {icon:'tarikhche_gardoone',text:'تاریخچه گردونه'},
        {icon:'javayeze_gardoone',text:'جوایز گردونه'},
        {icon:'sefareshate_bazargah',text:'سفارشات بازارگاه'},
        {icon:'tanzimate_bazargah',text:'تنظیمات بازارگاه'}
      ]
    }
  }
  header_layout() {
    return {
      size: 140,
      align: 'vh',
      row: [
        { html: getSvg('logo') },
        { size: 12 },
        {
          column: [
            { flex: 1 },
            { html: 'بروکس من', className: 'colorFFF bold size20' },
            { html: 'مدیریت و پشتیبانی', className: 'colorFFF size14' },
            { flex: 1 },
          ],
        },
      ],
    };
  }
  items_layout(){
    let {items} = this.state;
    return {
      gap:12,
      column:items.map(({icon,text},i)=>{
        let {SetState,sideActiveIndex} = this.context;
        let active = i === sideActiveIndex;
        let className = 'margin-0-12 round-6';
        if(active){className += ' color005478 bgDEF1F9'}
        else{className += ' colorFFF'}
        return {
          size:36,className,attrs:{onClick:()=>SetState({sideActiveIndex:i})},
          row:[
            {size:48,html:getSvg(icon,{fill:active?'#005478':'#fff'}),align:'vh'},
            {html:text,align:'v',className:'size20 bold'}
          ]
        }
      })
    }
  }
  render() {
    return (
      <RVD
        layout={{
          className: 'bg0094D4',
          column: [
            this.header_layout(),
            this.items_layout()
          ],
        }}
      />
    );
  }
}

