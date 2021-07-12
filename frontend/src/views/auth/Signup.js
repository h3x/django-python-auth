import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper, Typography, Box, Button} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import {useSnackbar} from "notistack";

const url = window.location.protocol + '//' + window.location.host

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
const Signup = () => {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const classes = useStyles();

    useEffect(() => {
        if (localStorage.getItem('token') !== null){
            window.location.replace(`${url}/dashboard`);
        } else {
            setLoading(false);
        }
    }, []);

    const onSubmit = ev => {
        ev.preventDefault();

        const user = {
            email: email,
            password1: password1,
            password2: password2,
        };

        fetch(`/api/v1/users/auth/register/`, {
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
                    window.location.replace(`${url}/dashboard`);
                } else {
                    enqueueSnackbar('Cannot Sign up with provided credentials.', {variant:"error"});
                    setEmail('');
                    setPassword1('');
                    setPassword2('');
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
              Signup
            </Typography>}
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
                            name='password1'
                            onChange={ev => setPassword1(ev.target.value)}
                            required
                            value={password1}
                            label="Password"
                            variant="outlined" />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box mb={2}>
                        <TextField
                            id="outlined-basic"
                            type='password'
                            name='password2'
                            onChange={ev => setPassword2(ev.target.value)}
                            required
                            value={password2}
                            label="Confirm"
                            variant="outlined" />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box mb={2}>
                            <Button type='submit' variant="outlined" color="primary">
                              <SendIcon /> Signup
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                </form>
                </Paper>
        </div>
    );
};

export default Signup