import React, {useState, useEffect, Fragment} from "react";
import TimeSeries from "../../components/charts/TimeSeries";
import TemperateChart from "../../components/charts/TemperateChart";
import {Grid, makeStyles, Typography, Box} from "@material-ui/core";
import { useSnackbar } from 'notistack';

const url = window.location.protocol + '//' + window.location.host

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    timeseries: {
        width: '100%',
    },
    row: {
        marginTop:  theme.spacing(3),
    },
}));

const Dashboard = () => {
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(true);
    const [data, setData] = useState(false);
    const [weatherLoading, setWeatherLoading] = useState(true);
    const [weatherData, setWeatherData] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const classes = useStyles()

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.replace(`${url}/login`);
        } else {
            fetch('/api/v1/users/auth/user/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `token ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    setLoading(false);
                });
        }
    }, []);

    useEffect(() => {
        if (loading) {
            const loadingSnack = enqueueSnackbar('Loading Data...', {variant:"success"});
            fetch('/api/v1/synapse/data/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

            })
                .then(res => res.json())
                .then(data => {
                    setData(data);
                    setLoadingData(false);
                    closeSnackbar(loadingSnack);
                })
                .catch(err => {
                    enqueueSnackbar('Error Retrieving Synapse Data', {variant:"error"});
                    closeSnackbar(loadingSnack);
                })
        }
    }, [loading])

    // Load Weather Data
    useEffect(() => {
        if (weatherLoading) {
            fetch('/api/v1/synapse/weather/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

            })
                .then(res => res.json())
                .then(data => {
                    setWeatherData(data);
                    setWeatherLoading(false)
                })
                .catch(err => enqueueSnackbar('Error Retrieving Weather Data', {variant:"error"}))
        }
    }, [weatherLoading])


    return (
        <>
            <Typography variant="h5" component="h5">Time Series Overlay</Typography>
            <Box>
                <Grid container direction="row" item xs={12}>
                    <Grid container item xs={6}>
                        <Grid item className={classes.timeseries}>
                            <TimeSeries chartData={data}/>
                        </Grid>
                    </Grid>
                    <Grid container item xs={6}>
                        <Grid container>
                            <Grid item>
                                <TimeSeries chartData={data ? {A: data["A"]} : {}}/>
                            </Grid>
                            <Grid item>
                                <TimeSeries chartData={data ? {B: data["B"]} : {}}/>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item>
                                <TimeSeries chartData={data ? {C: data["C"]} : {}}/>
                            </Grid>
                            <Grid item>
                                <TimeSeries chartData={data ? {D: data["D"]} : {}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

            <Box className={classes.row}>
               <Typography variant="h5" component="h5">Temperature Data: 24H - Armidale</Typography>
                <Grid container direction="row" item xs={12}>
                    <Grid container item xs={6}>
                        <Grid item className={classes.timeseries}>
                            <TemperateChart chartData={weatherData} />
                        </Grid>
                    </Grid>
                    <Grid container item xs={6}>
                        <Grid container>
                            <Box className={classes.map} >
                                 <Typography variant="h5" component="h5">Google Map Intergration</Typography>
                            </Box>

                        </Grid>
                    </Grid>

                </Grid>
            </Box>


        </>
    )
}

export default Dashboard;