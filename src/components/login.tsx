import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import styles from './Login.module.css';

function Login() {
  const [name, setName] = useState('');
  const [nomeValido, setNomeValido] = useState(true);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleNome = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setName(target.value);
    setNomeValido(target.value.length < 3);
  };

  const handleClick = () => {
    setClicked(true);
    createUser({ name }).then(() => {
      navigate('/search');
    });
  };

  return (
    <div className={ styles['login-container'] }>
      {!clicked ? (
        <div className={ styles['login-form'] }>
          <img src="/images/logo.png" alt="logo" className={ styles['login-logo'] } />
          <input
            type="text"
            placeholder="Qual seu nome?"
            value={ name }
            onChange={ handleNome }
            className={ styles['login-input'] }
            data-testid="login-name-input"
          />
          <button
            data-testid="login-submit-button"
            disabled={ nomeValido }
            onClick={ handleClick }
            className={ styles['login-button'] }
          >
            Entrar
          </button>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Login;
