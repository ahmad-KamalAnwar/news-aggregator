import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/authAction';

const LoginForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <div className="form-row">
                <div className="form-group col-sm-6">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={handleEmailChange} className="form-control" />
                </div>
                <div className="form-group col-sm-6">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={handlePasswordChange} className="form-control" />
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2">Login</button>
        </form>
    );
};

export default LoginForm;
