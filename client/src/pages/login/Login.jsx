import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/auth/authSlice';
import './login.scss';

export const Login = () => {

    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');

    const dispatch = useDispatch();
    const nav = useNavigate();

    const msgRef = useRef(null);

    const message = useSelector(state => state.authSlice.message);

    const loginSubmit = (e) => {
        try {
            e.preventDefault();
            dispatch(login({ username, pwd }))
                .then(res => {
                    if (!res.payload.user) {
                        msgRef.current.style.color = 'red';
                        switch (res.payload.error) {
                            case 'name': setUsername(''); setPwd(''); break;
                            case 'pwd': setPwd(''); break;
                            default: setUsername(''); setPwd(''); break;
                        }
                    } else {
                        setUsername('');
                        setPwd('');
                        nav('/');
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='login'>
            <h1 className='login__title'>Log in</h1>
            <form
                onSubmit={(e) => loginSubmit(e)}
                className="login__form">

                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder='Enter out name'
                    className='login__input' />


                <input
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    type="password"
                    placeholder='Enter your password'
                    className='login__input' />

                <button
                    className="login__submit"
                    type='submit'>
                    Login
                </button>
                <div ref={msgRef} className='login-message'>{message}</div>
            </form>
        </div>
    )
}

