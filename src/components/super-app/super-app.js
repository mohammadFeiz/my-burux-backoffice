import React,{Component} from 'react';
import {Icon} from '@mdi/react';
import {mdiAccount} from '@mdi/js';
import RVD from 'react-virtual-dom';
import './index.css';
export default class SuperApp extends Component {
    constructor(props){
      super(props);
      this.state = {activeSideIndex:0}
    }
    side_layout() {
      let {sideMenuItems,logo,title,subtitle,classNames} = this.props;
      let {activeSideIndex} = this.state;
      return {
        size: 240,
        html: (
          <Side 
            classNames={classNames} items={sideMenuItems} logo={logo} title={title} subtitle={subtitle} activeIndex={activeSideIndex} 
            onChange={(activeSideIndex)=>this.setState({activeSideIndex})}
          />
        )
      };
    }
    page_layout(){
        let {activeSideIndex} = this.state;
        let {getContent} = this.props;
        return {
            flex:1,
            column:[
                this.header_layout(),
                {flex:1,html:getContent(activeSideIndex)}
            ]
        } 
    }
    header_layout(){
        let {sideMenuItems,userName} = this.props;
        let {activeSideIndex} = this.state;
        return {html:<PageHeader title={sideMenuItems[activeSideIndex].text} userName={userName}/>}
    }
    render() {
      return (
        <>
          <RVD
            layout={{
              className: 'full-screen round-page',
              row: [this.side_layout(),this.page_layout()],
            }}
          />
          <Loading />
        </>
      );
    }
  }
  class Side extends Component {
    header_layout() {
      let {logo,title,subtitle,classNames} = this.props;
      return {
        align: 'vh',gap:12,
        row: [
          { html: logo,show:!!logo },
          {
            column: [
              { flex: 1 },
              { html: title, className: classNames.sideMenuTitle },
              { html: subtitle,show:!!subtitle, className: classNames.sideMenuSubtitle },
              { flex: 1 },
            ],
          },
        ],
      };
    }
    items_layout(){
      let {items,onChange,activeIndex,classNames} = this.props;
      return {
        gap:12,
        column:items.map(({icon,text},i)=>{
          let active = i === activeIndex;
          let className = 'margin-0-12 round-6';
          if(active){className += ' color005478 bgDEF1F9'}
          else{className += ' colorFFF'}
          return {
            size:36,className,attrs:{onClick:()=>onChange(i)},
            row:[
              {size:48,html:icon(active),align:'vh'},
              {html:text,align:'v',className:classNames.sideMenuItem}
            ]
          }
        })
      }
    }
    render() {
      return (<RVD layout={{className: 'bg0094D4',column: [{size:24},this.header_layout(),{size:24},this.items_layout()]}}/>);
    }
  }

  class Loading extends Component{
    cubes2(obj = {}){
      var {count = 5,thickness = [5,16],delay = 0.1,borderRadius = 0,colors = ['dodgerblue'],duration = 1,gap = 3} = obj;
      let Thickness = Array.isArray(thickness)?thickness:[thickness,thickness];
      let getStyle1 = (i)=>{
        return {
          width:Thickness[0],height:Thickness[1],background:colors[i % colors.length],margin:`0 ${gap/2}px`,
          animation: `${duration}s loadingScaleY infinite ease-in-out ${i * delay + 1}s`,
          borderRadius:borderRadius + 'px'
        }
      }
      let chars = ['B','U','R','U','X']
      let items = [];
      for(var i = 0; i < count; i++){
        items.push(<div key={i} className='cube' style={getStyle1(i)}>{chars[i]}</div>)
      }
      return (
        <div className="rect" style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',background:'transparent'}}>
          {items}
        </div>
      )
    }
    
    render(){
      return (
        <div className='loading'>
          {this.cubes2({thickness:[12,60],colors:['transparent']})}
        </div>
      );
    }
  }
  export function splitNumber(price,count = 3,splitter = ','){
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

  class PageHeader extends Component{
    render(){
      let {title,userName} = this.props;
      return (
        <RVD
          layout={{
            style:{height:72,flex:'none',width:'100%',background:'#fff'},
            align:'v',
            className:'padding-0-24',
            row:[
              {html:title,className:'size20 color323130 bold'},
              {flex:1},
              {html:<Icon path={mdiAccount} size={1}/>},
              {size:6},
              {html:userName,className:'size16 color605E5C'}
            ]
          }}
        />
      )
    }
  }