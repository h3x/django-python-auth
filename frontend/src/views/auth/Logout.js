import React, {useState, useEffect, Fragment} from "react";
import {makeStyles} from '@material-ui/core/styles';
import {Grid, Paper, Typography, Box, Button} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(5, 5),
    },
    paper: {
        maxWidth: 400,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(5),
    },
}));

const Logout = () => {
    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    useEffect(() => {
        if (localStorage.getItem('token') == null){
            window.location.replace('http://localhost:8000/login');
        } else {
            setLoading(false);
        }
    }, []);

    const handleLogout = ev => {
        ev.preventDefault();

        fetch('http://127.0.0.1:8000/api/v1/users/auth/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        })
            .then( res => res.json())
            .then(data => {
                localStorage.clear();
                window.location.replace('http://localhost:8000/login');
            });
    };

    return (
        <div>
            {loading === false && (
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                     <Grid item xs>
                        <Grid item>
                            <Box mb={2}>
                            <Typography variant="h4" component="h2">
                              Are you sure you want to logout?
                            </Typography>
                            </Box>
                        </Grid>
                         <Grid item>
                        <Box mb={2}>
                         <Button type='submit' variant="outlined" onClick={handleLogout} color="secondary">
                              <ExitToAppIcon /> Logout
                            </Button>

                        </Box>
                         </Grid>
                     </Grid>
                    </Paper>
                </div>
            )}
        </div>
    );
};

export default Logout