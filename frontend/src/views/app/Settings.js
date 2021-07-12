import React, {useState, useEffect, Fragment} from "react";

const url = window.location.protocol + '//' + window.location.host

const Settings = () => {

        useEffect(() => {
            if (localStorage.getItem('token') === null) {
                window.location.replace(`${url}/login`);
            }
        }, [])

    return (
        <div>
            <h1>Settings Page</h1>
        </div>
    )
}

export default Settings