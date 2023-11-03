import { useState, useEffect } from 'react';
import './app.scss';
import { Container } from "../container/Container";
import { Header } from '../header/Header';
import { Routes, Route } from 'react-router-dom';

import { Main } from '../../pages/main/Main';
import { Login } from '../../pages/login/Login';
import { Register } from '../../pages/register/Register';

import { getMe } from '../../redux/auth/authSlice';
import { getCurrency, getOilCost } from '../../redux/parser/parserSlice';

import { useDispatch } from 'react-redux';

import bgImg from '../../assets/img/bg.jpg';


function App() {

	const dispatch = useDispatch();

	useEffect(() => {
		// dispatch(getMe());
		dispatch(getCurrency());
		dispatch(getOilCost());
	}, [])





	return (
		<div className="app">
			<img src={bgImg} alt="background" />
			<Container>
				<Header />
				<Routes>
					<Route path='/auth/register' element={<Register />} />
					<Route path='/auth/login' element={<Login />} />
					<Route path='/' element={<Main />} />
				</Routes>
			</Container>
		</div>
	);
}

export default App;
