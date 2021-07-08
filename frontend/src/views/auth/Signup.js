import React, {useState, useEffect} from "react";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);

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
            password1: password1,
            password2: password2,
        };

        fetch('http://127.0.0.1:8000/api/v1/users/auth/register/', {
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
                    setPassword1('');
                    setPassword2('');
                    localStorage.clear();
                    setErrors(true);
                }
            });
    };

    return (
        <div>
            {loading === false && <h1>Signup</h1>}
            {errors === true && <h2>Cannot Sign up with provided credentials</h2>}
                <form onSubmit={onSubmit}>
                    <label htmlFor='email'>Email Address:</label><br />
                    <input
                        name='email'
                        type='email'
                        value={email}
                        required
                        onChange={ev => setEmail(ev.target.value)}
                        />{' '}<br />
                    <label htmlFor='password'>Password:</label><br />
                    <input
                        name='password'
                        type='password'
                        value={password1}
                        required
                        onChange={ev => setPassword1(ev.target.value)}
                        />{' '}<br />
                    <label htmlFor='password'>Confirm Password:</label><br />
                    <input
                        name='password'
                        type='password'
                        value={password2}
                        required
                        onChange={ev => setPassword2(ev.target.value)}
                        />{' '}<br />
                    <input type='submit' value='Signup'/>
                </form>
        </div>
    );
};

export default Signup