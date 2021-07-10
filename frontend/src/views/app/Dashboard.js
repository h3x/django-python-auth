import React, {useState, useEffect, Fragment} from "react";
import TimeSeries from "../../components/charts/TimeSeries";
import {Grid, makeStyles, Typography, Box} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    timeseries: {
        width: '100%',
    }
}));

const Dashboard = () => {
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(true);
    const [data, setData] = useState(false);

    const classes = useStyles()

    useEffect(() => {
        console.log('starting')
       if(localStorage.getItem('token') === null){
           window.location.replace('http://localhost:8000/login');
       } else {
           fetch('http://localhost:8000/api/v1/users/auth/user/', {
               method: 'GET',
               headers: {
                   'Content-Type': 'application/json',
                   Authorization: `token ${localStorage.getItem('token')}`
               }
           })
               .then(res => res.json())
               .then( data => {
                   setLoading(false);
               });
       }
    }, []);

    useEffect(()=> {
        if(!loading){
            fetch('http://127.0.0.1:8000/api/v1/synapse/data/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

        })
                .then( res => res.json())
                .then( data => {
                    console.log(data)
                    setData(data)
                    setLoadingData(false);
                })
                .catch( err => console.error(err))
        }
    }, [loading])


    return (
        <>
            <Typography variant="h5" component="h5">Time Series Overlay</Typography>
            <Box >
                <Grid container direction="row" item xs={12}>
                    <Grid container item xs={6}>
                        <Grid item className={classes.timeseries}>
                         <TimeSeries chartData={data} />
                    </Grid>
                    </Grid>
                <Grid container item xs={6}>
                    <Grid container>
                        <Grid item>
                        <TimeSeries chartData={data ? {A: data["A"]}: {}}/>
                        </Grid>
                        <Grid item>
                            <TimeSeries chartData={data ? {B: data["B"]} : {}}/>
                        </Grid>
                    </Grid>
                    <Grid container >
                        <Grid item>
                            <TimeSeries chartData={data ? {C: data["C"]}: {}}/>
                        </Grid>
                        <Grid item>
                            <TimeSeries chartData={data ? {D: data["D"]} : {}}/>
                        </Grid>
                    </Grid>

                </Grid>
                    </Grid>
            </Box>

        </>
    )
}

export default Dashboard;