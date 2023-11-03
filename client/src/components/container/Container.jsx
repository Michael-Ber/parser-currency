import React from 'react';
import "./container.scss";

export const Container = (props) => {
    return (
        <div className='container'>
            {props.children}
        </div>
    )
}
