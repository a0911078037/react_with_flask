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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
    const [openAlert, setOpen] = React.useState(false);
    let loc = useLocation();
    let nav = useNavigate();
    useEffect(() => {
        if (!user) {
            nav('/');
            showerror('請先登入');
        }
        if (loc.pathname !== `/main/${user}`) {
            nav(`/main/${user}`);
        }
        if (loc.state && loc.state.logined === true) {
            showmsg('登入成功');
            delete loc.state;
        }
    }, []);
    const [loading, setLoading] = React.useState(false);
    function Logout() {
        sessionStorage.clear();
        nav('/', { state: { logout: true } });
    }

    function update_user_data(){
        var update = true;
        nav('/newmember', {state:{update}});
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
            }).catch(e=>console.log(e));

        sleep(2000).then(() => {
            setLoading(false);
        });
    }

    function deleteUser() {
        setOpen(false);
        var data = {
            'user': sessionStorage.getItem('user')
        };
        console.log(data);
        fetch(`http://${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_BACKEND_PORT}/api/user/${user}`,{
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                
            }),
            body: JSON.stringify(data)
        })
        .then(res=> res.json())
        .then(data => {
            if (data['status']) {
                sessionStorage.clear();
                nav('/');
                showmsg('刪除成功');
            }
            else {
                showerror(data['msg']);
            }
        }).catch(e=>console.log(e));
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
                        <Button variant="contained" size="small" onClick={update_user_data} sx={{ mx: 4 }}>修改資料</Button>
                        <Button variant="contained" size="small" onClick={Logout} sx={{ mx: 4 }}>登出</Button>
                        <Button variant="contained" size="small" color="error" onClick={()=> setOpen(true)}>刪除使用者</Button>
                    </Box>
                    <Dialog
                        open={openAlert}
                        onClose={()=> setOpen(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"刪除使用者?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                刪除使用者，此行為不能返回!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=> setOpen(false)}>取消</Button>
                            <Button onClick={deleteUser} autoFocus>
                                同意
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </ThemeProvider>
        </>
    );
};

export default Main;