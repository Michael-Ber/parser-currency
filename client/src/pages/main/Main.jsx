import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrency, getOilCost } from '../../redux/parser/parserSlice';
import './main.scss';

import updateImg from '../../assets/img/update.png';

export const Main = () => {

    const currencyCurrent = useSelector(state => state.parserSlice.currency.current);
    const oilCurrent = useSelector(state => state.parserSlice.oil.current);
    const currencyOld = useSelector(state => state.parserSlice.currency.old);
    const oilOld = useSelector(state => state.parserSlice.oil.old);
    const dispatch = useDispatch();

    const updateHandler = () => {
        dispatch(getCurrency());
        dispatch(getOilCost());
    }

    return (
        <div className='main'>
            <h1 className="main__title">
                Курсы основных валют:
            </h1>
            <ul className="main__list">
                {currencyCurrent && currencyCurrent.map((item, i) => {
                    const valueColor = (currencyOld[i].value > item.value) ? {color: 'red'}: (currencyOld[i].value < item.value) ? {color:'green'} : {color: 'white'}
                    return (
                        <li key={i} className="main__item item-main">
                            <p className="item-main__name">{item.title}</p>
                            <p 
                                style={valueColor}
                                className="item-main__value">{item.value}</p>
                        </li>
                    )
                })}
            </ul>

            <div className="main__update">
                <div onClick={updateHandler} className="main__update-img">
                    <img src={updateImg} alt="update" />
                </div>
            </div>
            <h2 className="main__title-oil">{oilCurrent.title}:</h2>
            <p 
                style={(oilOld.value > oilCurrent.value) ? {color: 'green'}: (oilOld.value < oilCurrent.value) ? {color:'red'} : {color: 'white'}}
                className='main__value-oil'>{oilCurrent.value}</p>
        </div>
    )
}
