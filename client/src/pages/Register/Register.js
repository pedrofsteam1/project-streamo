import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Register.css';

import LoginWelcome from '../../components/LoginWelcome/LoginWelcome';
import ErrDisplay from '../../components/ErrDisplay/ErrDisplay';
import User from '../../modules/User/User';


export default () => {

    const history = useHistory();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [pw, setPw] = useState();
    const [pw2, setPw2] = useState();
    const [errMsg, setErrMsg] = useState('');
    const [errShow, setErrShow] = useState({display: 'none'});

    const signUp = async (e) => {

        if (await User.checkEmail(email)) {
            const sign = await User.registerUser(name, email, pw);

            if (sign === true) {
                setErrMsg('Enviamos email para o seu email cadastrado com link para ativação da sua conta.');
                setErrShow({display: 'flex'});
            }
            else if (sign === 'email') {
                setErrMsg('Email já cadastrado!');
                setErrShow({display: 'flex'});
            }
            else if (sign === 'invalidEmail') {
                setErrMsg('Falha ao enviar o email de ativação verifique se o email cadastrado está correto!');
                setErrShow({display: 'flex'});
            }
            else {
                setErrMsg('Erro no banco de dados!');
                setErrShow({display: 'flex'});
            }
        }
        else {
            setErrMsg('Email invalido!');
            setErrShow({display: 'flex'});
        }
        
    }
    

    return (
        <section className='register'>
            <div className='register--container'>

                <LoginWelcome text={'Vamos criar sua conta.'} />

                <ErrDisplay msg={errMsg} display={errShow} />
            
                <div className='register--input'>
                    Nome
                    <input type='text' name='name' onChange={(e) => setName(e.target.value)} ></input>
                </div>

                <div className='register--input'>
                    Email
                    <input type='text' name='email' onChange={(e) => setEmail(e.target.value)} ></input>
                </div>

                <div className='register--input'>
                    Senha
                    <input type='password' name='password' onChange={(e) => setPw(e.target.value)} ></input>
                </div>

                <div className='register--input'>
                    Confirme sua senha
                    <input type='password' onChange={(e) => setPw2(e.target.value)} ></input>
                </div>

                <div className='register--signup'>
                    <button onClick={(e) => signUp(e) }>Registrar</button>
                </div>                    

                <div className='register--login'>
                    Já possui uma conta? <strong onClick={() => history.push('/login')}>Clique Aqui!</strong>
                </div>
            </div>
        </section>
    )
}