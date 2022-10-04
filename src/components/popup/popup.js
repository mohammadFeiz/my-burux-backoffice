import React,{Component} from 'react';
import {Icon} from '@mdi/react';
import {mdiClose} from '@mdi/js';
import AIOButton from 'aio-button';
import RVD from 'react-virtual-dom';
export default class Popup extends Component{
    constructor(props){
      super(props);
      this.state = {activeTabIndex:0}
    }
    header_layout(){
      let {onClose,title} = this.props;
      return {
        size:48,className:'bgDDD color323130',
        row:[
          {flex:1,html:title,align:'v',className:'padding-0-24 size20'},
          {size:48,html:<Icon path={mdiClose} size={0.8}/>,align:'vh',attrs:{onClick:()=>onClose()}}
        ]
      }
    }
    body_layout(){return {flex:1,column:[this.tabs_layout(),this.content_layout()]}}
    tabs_layout(){
      let {tabs} = this.props;
      if(!tabs){return false}
      let {activeTabIndex} = this.state;
      return {html:(<AIOButton type='tabs' options={tabs.map((o,i)=>{return {text:o,value:i}})} value={activeTabIndex} onChange={(activeTabIndex)=>this.setState({activeTabIndex})}/>)}
    }
    content_layout(){
      let {tabs,getContent} = this.props;
      let content;
      if(tabs){
        let {activeTabIndex} = this.state;
        content = getContent(activeTabIndex)
      }
      else {content = getContent()}
      if(content === 'loading'){return {flex:1,html:'در حال بارگزاری',align:'vh'}}
      if(content === 'empty'){return {flex:1,html:'موردی موجود نیست',align:'vh'}}
      return {flex:1,html:content}
    }
    render(){
      return (  
        <div className='popup full-screen'>
          <RVD layout={{className:'form',style:{flex:'none'},column:[this.header_layout(),this.body_layout()]}}/>  
        </div>
      )
    }
  }