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
import InboxIcon from '@material-ui/icons/MoveToInbox';


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

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setIsAuth(true);
        }
    }, [])

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
                            <ListItemIcon><InboxIcon/></ListItemIcon>
                            <ListItemText>Dashboard </ListItemText>
                        </ListItem>
                        <ListItem button component="a" href="/logout">
                            <ListItemIcon><InboxIcon/></ListItemIcon>
                            <ListItemText>Logout </ListItemText>
                        </ListItem>
                    </List>) : (
                    <Fragment>
                        <ListItem button component="a" href="/login">
                            <ListItemIcon><InboxIcon/></ListItemIcon>
                            <ListItemText>Login </ListItemText>
                        </ListItem>
                        <ListItem button component="a" href="/signup">
                            <ListItemIcon><InboxIcon/></ListItemIcon>
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