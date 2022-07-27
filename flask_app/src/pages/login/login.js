import React, { Component } from 'react'
import './login.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Navigate} from 'react-router-dom';


class Login extends Component {
  constructor(props) {
    super(props);
    this.sendForm = this.sendForm.bind(this);
    this.state = {
      logined: false
    };
    console.log(localStorage.getItem('logout'));
    if(localStorage.getItem('newmember')){
      this.showmsg('新增成功，請登入');
    }
    if(localStorage.getItem('logout')){
      this.showmsg('登出成功');
    }
  }
  sendForm() {
    var acc = document.getElementById('acc').value;
    var pws = document.getElementById('pws').value;
    if(acc==='' || pws===''){
      this.showerror("請填入數值");
      return;
    }
    var encode = require('sha.js');
    pws = encode('sha256').update(pws).digest('hex');
    var data = {
      'acc': acc,
      'pws': pws
    }
    fetch(`http://${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_BACKEND_PORT}/api/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .then(res => res.json())
      .then(data => {
        if (data['status'] === true) {
          sessionStorage.setItem('token', data['result']['token']);
          this.setState({
            logined: true,
            user: data['result']['user']
          });
        }
        else {
          this.showerror(data['msg']);
        }
      }).catch(
        e => console.log(e)
      )

  }
  showmsg = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: 'tests'
    });
    localStorage.removeItem('newmember');
  }

  showerror = (msg) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored'
    });
  }

  render() {
    return (
      <>
        <div id='login'>
          <div id='area'>
            <center><h2>登入</h2></center>
            帳號:<input type="text" id='acc'></input>
            <br></br><hr></hr>
            密碼:<input type="text" id='pws'></input>
            <br></br><hr></hr>
            <input id='send' type='submit' value="送出" onClick={this.sendForm}></input>
            <a href="/newmember" id='new_member_href'>加入會員</a>
          </div>
        </div>
       {this.state.logined && <Navigate to='/main' state={this.state}/>}
      </>
    );
  }
}

export default Login