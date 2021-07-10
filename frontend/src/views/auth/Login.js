import React, {useState, useEffect} from "react";
import {makeStyles} from '@material-ui/core/styles';
import {Grid, Paper, Typography, Box, Button} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';

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

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);

    const classes = useStyles();

    useEffect(() => {
        if (localStorage.getItem('token') !== null){
            window.location.replace('http://localhost:8000/dashboard');
        } else {
            setLoading(false);
        }
    }, []);

    const onSubmit = ev => {
        ev.preventDefault();

        const user = {
            email: email,
            password: password
        };

        fetch('http://127.0.0.1:8000/api/v1/users/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then( res => res.json())
            .then(data => {
                if(data.key) {
                    localStorage.clear();
                    localStorage.setItem('token', data.key);
                    window.location.replace('http://localhost:8000/dashboard');
                } else {
                    setEmail('');
                    setPassword('');
                    localStorage.clear();
                    setErrors(true);
                }
            });
    };

    return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
            {loading === false &&
            <Typography variant="h4" component="h2">
              Login
            </Typography>}
            {errors === true && <h2>Cannot log in with provided credentials</h2>}
            {loading === false && (

                <form className={classes.root} onSubmit={onSubmit} noValidate autoComplete="off">
                <Grid item xs>
                    <Grid item>
                        <Box mb={2}>
                            <TextField
                            id="outlined-basic"
                            type='email'
                            name='email'
                            onChange={ev => setEmail(ev.target.value)}
                            required
                            value={email}
                            label="Email"
                            variant="outlined" />
                        </Box>

                    </Grid>
                    <Grid item>
                        <Box mb={2}>
                        <TextField
                            id="outlined-basic"
                            type='password'
                            name='password'
                            onChange={ev => setPassword(ev.target.value)}
                            required
                            value={password}
                            label="password"
                            variant="outlined" />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box mb={2}>
                            <Button type='submit' variant="outlined" color="primary">
                              <SendIcon /> Login
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                </form>
            )}
      </Paper>
        </div>
    );
};

export default Login