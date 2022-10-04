
import React,{Component} from 'react';
import RVD from 'react-virtual-dom';
import AppContext from './../../app-context';
import getSvg from './../../getSvg';
export default class PageHeader extends Component{
  static contextType = AppContext;
  render(){
    let {title} = this.props;
    let {user} = this.context;
    return (
      <RVD
        layout={{
          style:{height:72,flex:'none',width:'100%',background:'#fff'},
          align:'v',
          className:'padding-0-24',
          row:[
            {html:title,className:'size20 color323130 bold'},
            {flex:1},
            {html:getSvg('profile')},
            {size:6},
            {html:user.name,className:'size16 color605E5C'}
          ]
        }}
      />
    )
  }
}