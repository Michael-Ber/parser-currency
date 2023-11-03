import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/auth/authSlice';
import './register.scss';

export const Register = () => {

    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const [chkPwd, setChkPwd] = useState('');

    const dispatch = useDispatch();
    const nav = useNavigate();

    const registerSubmit = (e) => {
        try {
            e.preventDefault();
            dispatch(register({ username, pwd }));
            setUsername('');
            setPwd('');
            setChkPwd('');
            nav("/");
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='register'>
            <h1 className='register__title'>Registration</h1>
            <form
                onSubmit={(e) => registerSubmit(e)}
                className="register__form">

                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder='Enter out name'
                    className='register__input' />


                <input
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    type="password"
                    placeholder='Enter your password'
                    className='register__input' />
                <input
                    value={chkPwd}
                    onChange={(e) => setChkPwd(e.target.value)}
                    type="password"
                    placeholder='Repeat your password'
                    className='register__input' />
                <button
                    className="register__submit"
                    disabled={pwd !== chkPwd ? true : false}
                    type='submit'>
                    Register
                </button>
            </form>
        </div>
    )
}
