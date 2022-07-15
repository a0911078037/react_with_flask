import './App.css';
import React, {Component} from 'react'

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      percent:"30%"
    }
    this.changePercent=this.changePercent.bind(this); //綁定changePercent
  }
  componentDidMount(){
    const data = {
      changed : true,
      msg: "success"
    }
    fetch('http://127.0.0.1:8000/api/tests', {
      method: "post",
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .then(data => {
          console.log(data);
    })
    .catch(e => {
        console.log(e);
    })
  }
  changePercent(){ //加入changePercent函式
    this.setState({percent:"70%"})
    
   
    
  }


    render(){
        return(
          <div>
            <div className="progress-back" style={{backgroundColor:"rgba(0,0,0,0.2)",width:"200px",height:"7px",borderRadius:"10px"}}>
              <div className="progress-bar" style={{backgroundColor:"#fe5196",width:this.state.percent,height:"100%",borderRadius:"10px"}}></div>
            </div>
            <button onClick={this.changePercent}>轉換百分比 </button>
          </div>
        );
    }
}

// function App(props) {
//   return (
//     <button onClick={props.handleClick}>{props.name}</button>
//   );
// }

export default App;
