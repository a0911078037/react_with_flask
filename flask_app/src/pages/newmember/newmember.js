import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

function showmsg(msg) {
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
}

function showerror(msg) {
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


const theme = createTheme();

export default function SignUp() {
    var nav = useNavigate();
    var loc = useLocation();
    const [name_focus, setName_focus] = React.useState(false);
    const [pws_focus, setPws_focus] = React.useState(false);
    const [acc_focus, setAcc_focus] = React.useState(false);
    const [name, setName] = React.useState('');
    const [acc, setAcc] = React.useState('');
    React.useEffect(() => {
        if (loc.state && loc.state.update) {
            delete loc.state.update;
            fetch(`http://${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_BACKEND_PORT}/api/user/${sessionStorage.getItem("user")}`, {
                method: "GET",
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                }),
            })
                .then(res => res.json())
                .then(data => {
                    setName(data['result']['Name']);
                    setAcc(data['result']['Account']);
                    delete loc.state;
                })
                .catch(e => { console.log(e) });
        }
    });
    function checkinput() {
        var check_input = true;
        if (document.getElementById('password').value === '') {
            setPws_focus(true);
            check_input = false;
        }
        if (document.getElementById('account').value === '') {
            setAcc_focus(true);
            check_input = false;
        }
        if (document.getElementById('name').value === '') {
            setName_focus(true);
            check_input = false;
        }
        return check_input;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!checkinput()) {
            return;
        }
        var encode = require('sha.js');
        var data = {
            'name': document.getElementById('name').value,
            'acc': document.getElementById('account').value,
            'pws': encode('sha256').update(document.getElementById('password').value).digest('hex')
        }
        fetch(`http://${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_BACKEND_PORT}/api/user`, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => {
                if (data['status'] === true) {
                    nav('/', { state: { newmember: true } });
                }
                else {
                    console.log((data['msg']));
                    showerror(data['msg']);
                }
            }).catch(e => {
                console.log(e);
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        註冊
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="姓名"
                                    name="name"
                                    autoComplete="name"
                                    error={name_focus}
                                    onFocus={() => setName_focus(false)}
                                    defaultValue={name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="account"
                                    label="帳號"
                                    name="account"
                                    autoComplete="username"
                                    error={acc_focus}
                                    onFocus={() => setAcc_focus(false)}
                                    defaultValue={acc}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="密碼"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    error={pws_focus}
                                    onFocus={() => setPws_focus(false)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            申請
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    已經有帳號了?登入
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 5 }} /> */}
            </Container>
        </ThemeProvider>
    );
}