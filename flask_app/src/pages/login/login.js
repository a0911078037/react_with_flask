import React, { Component } from 'react'
import './login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.sendForm = this.sendForm.bind(this);
    if(!localStorage.getItem('newmember')){
      this.showmsg('新增會員成功，請登入');
      localStorage.clear();
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
    fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .then(res => res.json())
      .then(data => {
        if (data['status'] === true) {
          this.setState({
            logined: true,
            success: true
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
    });
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
        <ToastContainer />
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
      </>
    );
  }
}

export default Login