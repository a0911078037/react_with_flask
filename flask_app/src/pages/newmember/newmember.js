import React, { Component } from 'react';
import './newmember.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Navigate} from 'react-router-dom';

class Newmember extends Component {
    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
        this.state = {
            'success': false
        };
    }
    send() {
        var acc = document.getElementById('acc').value;
        var pws = document.getElementById('pws').value;
        var name = document.getElementById('name').value;
        var encode = require('sha.js');
        pws = encode('sha256').update(pws).digest('hex');
        var data = {
            'acc': acc,
            'pws': pws,
            'name': name
        }
        fetch('http://127.0.0.1:8000/api/user', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data['status'] === true) {
                    localStorage.setItem('newmember', true);
                    this.setState({success: true});
                }
                else {
                    this.showerror(data['msg']);
                }
            }).catch(
                e => console.log(e)
            )
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
                        <center><h2>加入會員</h2></center>
                        <div className='input_area'>帳號:<input type="text" id='acc'></input></div>
                        <div className='input_area'>密碼:<input type="text" id='pws'></input></div>
                        <div className='input_area'>姓名:<input type="text" id='name'></input></div>
                        <br></br>
                        <center><input type="submit" onClick={this.send} id='send'></input></center>
                    </div>
                </div>
                {this.state.newmember && <Navigate to='/'/>}
            </>
        )
    }

}
export default Newmember;