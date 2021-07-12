import React, {useState, useEffect, Fragment} from "react";

const Settings = () => {

        useEffect(() => {
            if (localStorage.getItem('token') === null) {
                window.location.replace('https://synapse-test-demo4.herokuapp.com/login');
            }
        }, [])

    return (
        <div>
            <h1>Settings Page</h1>
        </div>
    )
}

export default Settings