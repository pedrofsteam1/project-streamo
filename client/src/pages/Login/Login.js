import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';

import LoginWelcome from '../../components/LoginWelcome/LoginWelcome';
import ErrDisplay from '../../components/ErrDisplay/ErrDisplay';
import Auth from '../../modules/Auth/Auth';


export default () => {

    const [email, setEmail] = useState();
    const [pw, setPw] = useState();
    const [errMsg, setErrMsg] = useState('');
    const [errShow, setErrShow] = useState({display: 'none'});
    
    const history = useHistory();


    const signin = async (e) => {
        const res = await Auth.signIn(email, pw);
        if ( res === 'UserNotFound' ) {
            setErrMsg('Email Inválido!');
            setErrShow({display: 'flex'});
        } else
        if ( res === 'PasswordNotFound' ) {
            setErrMsg('Senha Inválida!');
            setErrShow({display: 'flex'});
        } else
        if ( !res ) {
            setErrMsg('Falha ao fazer login!');
            setErrShow({display: 'flex'});
        }
        else { history.push('/main'); }
    }
  
    useEffect(()=>{
        const acc = (new URLSearchParams(window.location.search)).get("acc");
        const fail = (new URLSearchParams(window.location.search)).get("fail");
        if (acc) {
            setErrMsg('Parabens! Sua conta foi ativada.');
            setErrShow({display: 'flex'});
        }
        if (fail) {
            setErrMsg('Email ou senha inválidos!');
            setErrShow({display: 'flex'});
        }
    },[])

    return(
        <section className='login'>
            <div className='login--container'>
                
                <LoginWelcome text={'Faça seu Login.'} />

                <ErrDisplay msg={errMsg} display={errShow} />
                
                <div className='login--email'>
                    Email
                    <input type='text' name='email' onChange={(e) => setEmail(e.target.value)}></input>
                </div>

                <div className='login--password'>
                    Senha
                    <input type='password' name='password' onChange={(e) => setPw(e.target.value)}></input>
                </div>

                <div className='login--forgotten'>
                    Esqueceu a senha? <strong onClick={(e) => console.log('ok')}>Clique Aqui.</strong>
                </div>

                <div className='login--signup'>
                    <button onClick={(e) => signin(e)}>Entrar</button>
                </div>              

                <div className='login--register'>
                    Não possui uma conta? <strong onClick={() => history.push('/register')}>Registre-se</strong>
                </div>

            </div>
        </section>
    )
}

