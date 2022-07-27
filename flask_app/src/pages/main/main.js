import React from 'react';
import './main.css'
import { toast } from 'react-toastify';
import './main.css';
import { useLocation, useNavigate } from 'react-router-dom';


function showmsg(msg) {
    toast.success(msg,
        {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 'tests'
        }
    )
}

function send() {
    fetch(`http://${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_BACKEND_PORT}/api/user`, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data['status']) {
            showmsg('伺服器回應正常');
        }
    });
}

const Main = () => {
    let loc = useLocation();
    let nav = useNavigate();
    function Logout() {
        sessionStorage.clear();
        localStorage.setItem('logout', true);
        nav('/');
    }
    if (loc.state.logined === true) {
        showmsg('登入成功');
        loc.state.logined = null;
    }
    return (
        <>
            <center>
                <div id='main_area'>
                    <h2>你好，{loc.state.user}</h2>
                    <input type="button" onClick={send} value='伺服器測試' className='main_btn'></input>
                    <input type="button" value='修改資料' className='main_btn'></input>
                    <input type="button" onClick={Logout} value='登出' className='main_btn'></input>
                </div>
            </center>
        </>
    );
};

export default Main;