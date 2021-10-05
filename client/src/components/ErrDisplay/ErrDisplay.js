import React, { useState } from 'react';
import './ErrDisplay.css';


export default ({msg, display}) => {


    return (
        <div className='login-err' style={display}>
            {msg}
        </div>
    )
}