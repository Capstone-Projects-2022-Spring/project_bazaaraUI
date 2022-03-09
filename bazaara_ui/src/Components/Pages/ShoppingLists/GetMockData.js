import React from 'react';
import './styles.css'

export function GetMockData(props) {
    return (
        <div>
            <h3>{ props.index }</h3>
            <h2>{ props.name }</h2>
            <p>{ props.food }</p>
            <div>{ props.products }</div>
        </div>


    );
}

export default GetMockData;