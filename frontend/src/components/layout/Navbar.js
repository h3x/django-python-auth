import React, {useState, useEffect, Fragment} from "react";

import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import SettingsIcon from '@material-ui/icons/Settings';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useSnackbar } from 'notistack';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));


const Navbar = () => {
    const [isAuth, setIsAuth] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setIsAuth(true);
        }
    }, [])

    const downloadData = () => {
        const loading = enqueueSnackbar('Preparing your data for download.', {variant:"success"});
        fetch('/api/v1/synapse/download_data/')
            .then(res => {
                debugger;
                res.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'dataset.csv';
                    debugger;
                    a.click();
                    closeSnackbar(loading)
                })
            })
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Collage-Q
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar}/>
                <Divider/>
                {isAuth === true ? (
                    <List>
                        <ListItem button component="a" href="/dashboard">
                            <ListItemIcon><DashboardIcon/></ListItemIcon>
                            <ListItemText>Dashboard </ListItemText>
                        </ListItem>
                        <ListItem button component="a" href="/settings">
                            <ListItemIcon><SettingsIcon/></ListItemIcon>
                            <ListItemText>Settings </ListItemText>
                        </ListItem>
                        <ListItem button component="a" href="/logout">
                            <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                            <ListItemText>Logout </ListItemText>
                        </ListItem>

                        <Divider />
                        <ListItem button component="a" onClick={downloadData}>
                            <ListItemIcon><GetAppIcon/></ListItemIcon>
                            <ListItemText>Download Dataset </ListItemText>
                        </ListItem>

                    </List>) : (
                    <Fragment>
                        <ListItem button component="a" href="/login">
                            <ListItemIcon><PersonIcon/></ListItemIcon>
                            <ListItemText>Login </ListItemText>
                        </ListItem>
                        <ListItem button component="a" href="/signup">
                            <ListItemIcon><PresentToAllIcon/></ListItemIcon>
                            <ListItemText>Signup </ListItemText>
                        </ListItem>
                    </Fragment>

                )}
                <Divider/>
            </Drawer>
            <main className={classes.content}>
            <div className={classes.toolbar} />
            </main>

        </div>
    );
};

export default Navbar;