import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import Container from '@mui/material/Container';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AppBar from '@mui/material/AppBar';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';

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


const Main = () => {
    var user = sessionStorage.getItem('user');
    const [openAlert, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [addData, setAddData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    let loc = useLocation();
    let nav = useNavigate();



    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const columns = [
        { field: 'id', headerName: 'ID', width: 70, editable: true},
        { field: 'product', headerName: '商品', width: 190, editable: true },
        {
            field: 'type',
            headerName: '類別',
            width: 150,
            editable: true
        },
        {
            field: 'price',
            headerName: '價格',
            type: 'number',
            width: 90,
            editable: true
        },
        {
            field: 'description',
            headerName: '說明',
            width: 450,
            editable: true
        }
    ];

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
        if (loc.state && loc.state.update === true) {
            showmsg('更新成功');
            delete loc.state;
        }
        fetch(`http://${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_BACKEND_PORT}/api/product/${user}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            })
        }).then(res => res.json())
            .then(data => {
                setRows(data.result);
            }).catch(e => console.log(e));
        

    }, []);

    function update_product(product) {
        product['user'] = sessionStorage.getItem('user');
        fetch(`http://${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_BACKEND_PORT}/api/product`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }),
            body: JSON.stringify(product)
        }).then(res => res.json())
            .then(data => {
                if(data['status'] === true){
                    showmsg('更新成功');
                }else{
                    showerror('更新失敗');
                }
            }).catch(e => console.log(e));
        
    }

    function Get_product() {
        fetch(`http://${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_BACKEND_PORT}/api/product/${user}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            })
        }).then(res => res.json())
            .then(data => {
                setRows(data.result);
            }).catch(e => console.log(e));
    };

    function Insert_product() {
        var data = {
            'ID': document.getElementById('id').value,
            'product': document.getElementById('product').value,
            'type': document.getElementById('type').value,
            'price': document.getElementById('price').value,
            'description': document.getElementById('description').value,
            'user': user
        }
        for (var key in data) {
            if (data[key] === '') {
                showerror('請正確地輸入數值');
                return;
            }
        }
        setAddData(false);
        new Promise(() => {
            fetch(`http://${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_BACKEND_PORT}/api/product`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }),
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(data => {
                    if (data.status === true) {
                        showmsg('新增成功');
                    }
                    else {
                        showerror(data.msg);
                    }
                }).then(() => {
                    Get_product();
                })
        });

    }

    function DeleteProduct() {
        setAddData(false);
        new Promise(() => {
            var data = { ID_list: selectedRows.map(a => a.id), user: user };
            if (data.ID_list.length === 0) {
                showerror('請選擇產品');
                return;
            }
            fetch(`http://${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_BACKEND_PORT}/api/product`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }),
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(data => {
                    if (data.status === true) {
                        showmsg('刪除成功');
                    }
                    else {
                        showerror(data.msg);
                    }
                }).then(() => {
                    Get_product();
                });
        });

    }

    function Logout() {
        sessionStorage.clear();
        nav('/', { state: { logout: true } });
    }

    function update_user_data() {
        nav('/newmember', { state: { update: true } });
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
            }).catch(e => console.log(e));

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
        fetch(`http://${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_BACKEND_PORT}/api/user/${user}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),

            }),
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data['status']) {
                    sessionStorage.clear();
                    nav('/');
                    showmsg('刪除成功');
                }
                else {
                    showerror(data['msg']);
                }
            }).catch(e => console.log(e));
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >

                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            商品管理系統
                        </Typography>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <LoadingButton
                                size="small"
                                onClick={send}
                                endIcon={<SendIcon />}
                                loading={loading}
                                loadingPosition="end"
                                variant="outlined"
                                color="inherit"
                            >
                                伺服器測試
                            </LoadingButton>

                        </Box>

                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={update_user_data}>更改密碼</MenuItem>
                                <MenuItem onClick={Logout}>登出</MenuItem>
                                <MenuItem onClick={() => setOpen(true)}>刪除使用者</MenuItem>
                            </Menu>
                        </div>

                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed sx={{ paddingTop: "20px" }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-start"
                    sx={{ paddingBottom: "10px" }}
                >
                    <ButtonGroup variant="outlined" aria-label="outlined button group" size="large">
                        <Button onClick={() => setAddData(true)}>新增</Button>
                        <Button onClick={DeleteProduct}>刪除</Button>
                    </ButtonGroup>
                </Grid>
                <Box sx={{ height: 400, width: '90%', paddingTop: "20px" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        autoHeight={true}
                        disableSelectionOnClick
                        onCellEditCommit={update_product}
                        onSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selectedRows = rows.filter((row) =>
                                selectedIDs.has(row.id),
                            );

                            setSelectedRows(selectedRows);
                        }}
                    />
                </Box>
            </Container>
            <Dialog
                open={openAlert}
                onClose={() => setOpen(false)}
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
                    <Button onClick={() => setOpen(false)}>取消</Button>
                    <Button onClick={deleteUser} autoFocus>
                        同意
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={addData} onClose={() => setAddData(false)}>
                <DialogTitle>新增資料</DialogTitle>
                <DialogContent>
                    <center><DialogContentText>
                        商品資訊
                    </DialogContentText></center>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="id"
                        label="ID"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="product"
                        label="商品"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="type"
                        label="類別"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        label="價格"
                        type="number"
                        fullWidth
                        variant="standard"
                        InputProps={{ inputProps: { min: 0, max: 10000 } }}
                        onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12)
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="說明"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddData(false)}>取消</Button>
                    <Button onClick={Insert_product}>新增</Button>
                </DialogActions>
            </Dialog>

        </>
    );
};

export default Main;