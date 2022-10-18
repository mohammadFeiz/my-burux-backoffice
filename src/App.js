import React, { Component } from 'react';
import getSvg from './getSvg';
import AppContext from './app-context';
import SuperApp from 'react-super-app';
import Karbaran from './pages/karbaran/karbaran';
import DarkhasteBardasht from './pages/darkhaste-bardasht/darkhaste-bardasht';
import TarikhcheGardoone from './pages/tarikhche-gardoone/tarikhche-gardoone';
import SefareshateBazargah from './pages/sefareshate-bazargah/sefareshate-bazargah';
import AIOService from 'aio-service';
import services from './services';
import Form from 'aio-form-react';
import './style.css';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {model:{username:'',password:''}}
  }
  render(){
    let {model} = this.state;
    return (
      <div className='landing'>
        <Form
          model={model}
          style={{width:400,flex:'none'}}
          inputs={[
            {type:'text',label:'نام کاربری',field:'model.username'},
            {type:'text',label:'پسوورد',field:'model.password'},
          ]}
          onChange={(model)=>this.setState({model})}
          onSubmit={()=>{

          }}
          submitText='ورود'
        />
      </div>
    )
  }
}
class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      services:AIOService({
        getState:()=>this.state,
        apis:services
      }),
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
  getContext() {
    return {
      ...this.state,
      SetState:(obj)=>this.setState(obj),
    }
  }
  render() {
    let {user} = this.state;
    return (
      <AppContext.Provider value={this.getContext()}>
        <SuperApp
          userName={user.name}
          getContent={(sideIndex)=>{
            if(sideIndex === 0){return <Karbaran/>}
            if(sideIndex === 1){return <DarkhasteBardasht/>}
            if(sideIndex === 2){return <TarikhcheGardoone/>}
            if(sideIndex === 4){return <SefareshateBazargah/>}
          }}
          logo={getSvg('logo')}
          title={'بروکس من'}
          subtitle={'مدیریت و پشتیبانی'} 
          sideMenuItems={[
            {icon:(active)=>getSvg('karbaran',{fill:active?'#005478':'#fff'}),text:'کاربران'},
            {icon:(active)=>getSvg('darkhaste_bardasht',{fill:active?'#005478':'#fff'}),text:'درخواست برداشت'},
            {icon:(active)=>getSvg('tarikhche_gardoone',{fill:active?'#005478':'#fff'}),text:'تاریخچه گردونه'},
            {icon:(active)=>getSvg('javayeze_gardoone',{fill:active?'#005478':'#fff'}),text:'جوایز گردونه'},
            {icon:(active)=>getSvg('sefareshate_bazargah',{fill:active?'#005478':'#fff'}),text:'سفارشات بازارگاه'},
            {icon:(active)=>getSvg('tanzimate_bazargah',{fill:active?'#005478':'#fff'}),text:'تنظیمات بازارگاه'}
          ]}
        />
      </AppContext.Provider>
    );
  }
}


