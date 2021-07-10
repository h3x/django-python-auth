import React from "react";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Login from "./views/auth/Login";
import Signup from "./views/auth/Signup";
import Logout from "./views/auth/Logout";
import Dashboard from "./views/app/Dashboard";
import "./App.scss"

function App() {
    return (
        <div className="app">
            <Navbar />
            <div className="appContent">
            <Router>
                <Switch>
                    <Route path='/login' component={Login} exact />
                    <Route path='/signup' component={Signup} exact />
                    <Route path='/logout' component={Logout} exact />
                    <Route path='/dashboard' component={Dashboard} exact />
                </Switch>
            </Router>
                </div>
        </div>
    )
}
export default App
