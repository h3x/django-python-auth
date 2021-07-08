import React, {useState, useEffect, Fragment} from "react";
import {isElementOfType} from "react-dom/test-utils";

const Dashboard = () => {
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                   setUserEmail(data.email);
                   setLoading(false);
               });
       }
    }, []);

    return (
        <div>
            {loading === false && (
                <Fragment>
                    <h1>My Dashboard</h1>
                    <h2>Hello {userEmail}</h2>
                </Fragment>
            )}
        </div>
    )
}

export default Dashboard;