import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import Container from '@mui/material/Container';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function showerror(msg) {
    toast.error(msg, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        toastId: 'main_toast_error'
    });
}

function showmsg(msg) {
    toast.success(msg,
        {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
        }
    )
}

const theme = createTheme();

const Main = () => {
    var user = sessionStorage.getItem('user');
    useEffect(() => {
        if (!user) {
            showerror('請先登入');
            nav('/');
        }
    }, []);
    let loc = useLocation();
    let nav = useNavigate();
    const [loading, setLoading] = React.useState(false);
    function Logout() {
        sessionStorage.clear();
        nav('/', { state: { logout: true } });
    }

    if (loc.state && loc.state.logined === true) {
        showmsg('登入成功');
        delete loc.state;
    }

    function send() {
        setLoading(true);
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
                else {
                    showerror(data['msg']);
                }
            });

        sleep(2000).then(() => {
            setLoading(false);
        });
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container maxWidth="sm">
                    <CssBaseline />
                    <Box sx={{
                        marginTop: 8,
                        display: 'box',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: '1px solid black',
                        height: 300,
                        textAlign: 'center',
                        pt: 10,
                    }}>
                        <h2>你好，{user}</h2>
                        <LoadingButton
                            size="small"
                            onClick={send}
                            endIcon={<SendIcon />}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                        >
                            伺服器測試
                        </LoadingButton>
                        <Button variant="contained" size="small" sx={{ mx: 4 }}>修改資料</Button>
                        <Button variant="contained" size="small" onClick={Logout}>登出</Button>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
};

export default Main;