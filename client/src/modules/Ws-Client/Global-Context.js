import React from 'react';
import axios from 'axios';
import {setCookie, showCookie, getCookie} from '../cookie/cookie';


export var global = {
    user: '',
    auth: '',
    controller: '',
    modulo: 'Bem Vindo ao SGV!',
    slcRow: '',
    player: 'p',
    map: 'm',
};


export const GlobalContext = React.createContext();