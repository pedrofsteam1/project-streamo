import React from 'react';
import './LoginWelcome.css';


export default ({ text }) => {


    return(
        <div>
            <div className='login--logo'>
                STREAMO
            </div>

            <div className='login--welcome'>
                SEJA BEM VINDO!<br/><br/>
                {text}
            </div>
        </div>
    )
}