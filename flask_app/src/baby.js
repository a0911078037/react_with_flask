import React, { Component } from 'react';
class Baby extends Component{
  constructor(props) {
    super(props);
    this.state={
        isRightDad: true,
        isGetData: false,
        Mom: ""
    }
    this.ajaxSimulator=this.ajaxSimulator.bind(this)
  }

    ajaxSimulator(){
        setTimeout(()=>{this.setState({isGetData:true, Mom:"小美"})},3000)
    }

  static getDerivedStateFromProps(props,state){
      if(props.dad!=="Chang")
        return {isRightDad:false}
  }

    componentDidMount(){
        this.ajaxSimulator();
    }

    render(){
        if(this.state.isRightDad===false)
            return(
                <div id="msg">你不是我爸</div>
            );
        else if(this.state.isGetData===false)
            return(
                <div id="msg">讀取中</div>
            );        
        else
            return(
                <div id="msg">他的媽媽是{this.state.Mom}</div>
            );                
    }
}
export default Baby;