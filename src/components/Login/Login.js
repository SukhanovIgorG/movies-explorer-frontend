import headerLogo from '../../image/header-logo.svg';

import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {login} from '../../utils/MainApi';
import {apiErrorController} from '../../utils/errorController';
import {REG_EMAIL} from '../../constants/constans';

function Login({onLogin, setCurrentUser}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorApi, setErrorApi] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [submitActive, setSubmitActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (errorEmail || errorPassword) {
      setSubmitActive(false);
    } else {
      setSubmitActive(true);
    }
  }, [errorApi, errorEmail, errorPassword]);

  useEffect(() => {
    if (errorEmail || errorPassword) {
      setSubmitActive(false);
    } else {
      setSubmitActive(true);
    }
  }, []);

  useEffect(() => {
    setErrorApi('');
  }, [email, password]);

  const validationEmail = (value) => {
    if (!REG_EMAIL.test(value)) {
      setErrorEmail(`${value} не является электронной почтой`);
    } else {
      setErrorEmail('');
    }
  };

  const validationPassword = (value) => {
    if (value.length < 1) {
      setErrorPassword(`Пароль не может быть пустым`);
    } else {
      setErrorPassword('');
    }
  };

  function handleLogin(status) {
    onLogin(status);
  }

  function handleInputEmail(e) {
    setEmail(e.target.value);
    validationEmail(e.target.value);
  }
  function handleInputPassword(e) {
    setPassword(e.target.value);
    validationPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (submitActive) {
      setIsLoading(true);
      login({email, password})
        // signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log('userCredential :>> ', userCredential);
          const user = userCredential.user;
          setCurrentUser(user);
          localStorage.setItem('JWT', user.accessToken);
          handleLogin(user.uid);
          setEmail('');
          setPassword('');
          navigate('/movies');
          setIsLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('errorMessage :>> ', errorCode, errorMessage);
          setErrorApi(apiErrorController(error));
          setIsLoading(false);
        });
    } else {
      setErrorApi('Заполните все поля корректными данными');
    }
  }

  return (
    <div className="dialog">
      <div className="dialog__container dialog__container_type_auth">
        <img
          className="header__logo heder__logo_type_signin"
          src={headerLogo}
          alt="логотип"
          onClick={() => navigate('/')}
        />
        <h2 className="dialog__header dialog__header_type_auth">
          Рады видеть!
        </h2>
        <form onSubmit={handleSubmit}>
          <span className="dialog__input-span dialog__input-span_type_signin">
            email
          </span>
          <input
            type="email"
            value={email ? email : ''}
            onChange={handleInputEmail}
            className={
              errorEmail
                ? 'dialog__input dialog__input_type_signin dialog__input_type_error'
                : 'dialog__input dialog__input_type_signin'
            }
            disabled={isLoading}
            placeholder=""
          ></input>
          <span className="dialog__input-error">{errorEmail}</span>
          <span className="dialog__input-span dialog__input-span_type_signin">
            пароль
          </span>
          <input
            type="password"
            value={password ? password : ''}
            onChange={handleInputPassword}
            className={
              errorPassword
                ? 'dialog__input dialog__input_type_signin dialog__input_type_error'
                : 'dialog__input dialog__input_type_signin'
            }
            disabled={isLoading}
            placeholder=""
          ></input>
          <span className="dialog__input-error">{errorPassword}</span>
          <span className="dialog__input-error">{errorApi}</span>

          <button
            className={
              submitActive
                ? 'dialog__button dialog__button_type_log'
                : 'dialog__button dialog__button_type_log dialog__button_type_log-inactive'
            }
          >
            Войти
          </button>
          <div className="dialog__button dialog__button_type_reg">
            Еще не зарегистрированы?
            <button
              className="dialog__button-link"
              onClick={() => navigate('/signup')}
            >
              Регистрация
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
