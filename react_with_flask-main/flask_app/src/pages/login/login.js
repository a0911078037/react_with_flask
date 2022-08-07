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



const theme = createTheme();

function showmsg(msg) {
  toast.success(msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    toastId: 'login_toast'
  });
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
    toastId: 'login_toast_error'
  });
}

export default function SignIn() {
  var nav = useNavigate();
  var loc = useLocation();
  if(loc.state && loc.state.logout){
    showmsg('登出成功');
    window.history.replaceState({}, document.title);
  }
  if(loc.state && loc.state.newmember){
    showmsg('註冊成功，請登入');
    window.history.replaceState({}, document.title);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    var encode = require('sha.js');
    var data = {
      'acc': document.getElementById('account').value,
      'pws': encode('sha256').update(document.getElementById('password').value).digest('hex')
    }
    fetch(`http://${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_BACKEND_PORT}/api/login`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(data => {
        if (data['status'] === true) {
          sessionStorage.setItem('token', data['result']['token']);
          sessionStorage.setItem('user', data['result']['user']);
          nav(`/main/${data['result']['user']}`, {state:{logined: true}});
        }
        else{
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
            登入系統
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="account"
              label="帳號"
              name="account"
              autoComplete="account"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="密碼"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              登入
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/newmember" variant="body2">
                  {"加入會員"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}


