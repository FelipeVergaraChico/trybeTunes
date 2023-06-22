import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

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

    <div>
      {
        (!clicked)
          ? (
            <div>
              <img src="./images/logo.png" alt="logo" />
              <input
                type="text"
                placeholder="Qual seu nome?"
                value={ name }
                onChange={ handleNome }
                data-testid="login-name-input"
              />
              <button
                data-testid="login-submit-button"
                disabled={ nomeValido }
                onClick={ handleClick }
              >
                Entrar
              </button>
            </div>
          )
          : (<Loading />)
      }
    </div>
  );
}

export default Login;
