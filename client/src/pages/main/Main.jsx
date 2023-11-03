import React from 'react';
import { useSelector } from 'react-redux';
import './main.scss';

export const Main = () => {

    const { currency } = useSelector(state => state.parserSlice);
    const { oil } = useSelector(state => state.parserSlice);

    return (
        <div className='main'>
            <h1 className="main__title">
                Курсы основных валют:
            </h1>
            <ul className="main__list">
                {currency && currency.map((item, i) => {
                    return (
                        <li key={i} className="main__item item-main">
                            <p className="item-main__name">{item.title}</p>
                            <p className="item-main__value">{item.value}</p>
                        </li>
                    )
                })}
            </ul>
            <h2 className="main__title-oil">{oil.title}:</h2>
            <p className='main__value-oil'>{oil.value} $</p>
        </div>
    )
}
