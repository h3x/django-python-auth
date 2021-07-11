import React, {useState, useEffect, Fragment} from "react";

const Settings = () => {

        useEffect(() => {
            if (localStorage.getItem('token') === null) {
                window.location.replace('http://localhost:8000/login');
            }
        }, [])

    return (
        <div>
            <h1>Settings Page</h1>
        </div>
    )
}

export default Settings