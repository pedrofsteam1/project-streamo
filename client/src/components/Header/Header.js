import React, { useEffect, useState } from 'react';
import './Header.css';

import Auth from '../../modules/Auth/Auth';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const Header = () => {

    const [backHeader, setBackHeader] = useState({'background': 'rgba(255, 136, 0, 1)'});

    const history = useHistory();

    /*useEffect(()=>{
        const scrollListener = () => {
            if (window.scrollY > 10) {
                setBackHeader({'background': '#111'});
            }
            else {
                setBackHeader({'background': 'transparent'});
            }
        }

        window.addEventListener('scroll', scrollListener, false);

        return () => {
            window.removeEventListener('scroll', scrollListener, false);
        }
    },[])*/

    return(
        <header className='black' style={backHeader}>
            <div className='header--logo'>
                <a href='/'>
                    STREAMO
                </a>
            </div>

            <div className='header--navMenu'>
                <div className='header--live'>
                    <a href='/'>
                        Live
                    </a>
                </div>

                <div className='header--series'>
                    <a href='/'>
                        Series
                    </a>
                </div>

                <div className='header--movies'>
                    <a href='/'>
                        Filmes
                    </a>
                </div>
            </div>

            <div className='header--user'>
                <a onClick={(e) => Auth.logOut() ? history.push('/login') : e.preventDefault()}>
                    Sair
                </a>
            </div>
            
        </header>
    )
}


export default Header;