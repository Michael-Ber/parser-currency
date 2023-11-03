import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../logo/Logo';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/authSlice';
import "./header.scss";

export const Header = () => {

    const username = useSelector(state => {
        if (state.authSlice.user) {
            return state.authSlice.user.username
        }
        return null
    });
    const { token } = useSelector(state => state.authSlice);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
        window.localStorage.removeItem('token');
    }


    const user = token ?
        <div className="header__user user-header">
            <span className='user-header__name'>{username}</span>
            <span onClick={logoutHandler} className='user-header__logout'>logout</span>
        </div> :
        <div className="header__auth">
            <Link to='/auth/login' className='auth-login reglink'>Log in</Link>
            <Link to='/auth/register' className='auth-signin reglink'>Sign in</Link>
        </div>

    return (
        <header className='header'>
            <div className="header__wrapper">
                <Logo />
                <nav className="header__nav">
                    <ul className="header__list">
                        <li className="header__item"><Link to="#" className='header__navlink'>Item 1</Link></li>
                        <li className="header__item"><Link to="#" className='header__navlink'>Item 2</Link></li>
                        <li className="header__item"><Link to="#" className='header__navlink'>Item 3</Link></li>
                        <li className="header__item"><Link to="#" className='header__navlink'>Item 4</Link></li>
                    </ul>
                </nav>
                {user}
            </div>
        </header>
    )
}
