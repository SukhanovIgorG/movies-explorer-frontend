import headerLogo from '../../image/header-logo.svg';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {register, login} from '../../utils/MainApi';
import {apiErrorController} from '../../utils/errorController';
import {REG_EMAIL, REG_NAME} from '../../constants/constans';

function Register({onLogin}) {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorApi, setErrorApi] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [submitActive, setSubmitActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (errorApi || errorName || errorEmail || errorPassword) {
      setSubmitActive(false);
    } else {
      setSubmitActive(true);
    }
  }, []);
  useEffect(() => {
    if (errorApi || errorName || errorEmail || errorPassword) {
      setSubmitActive(false);
    } else {
      setSubmitActive(true);
    }
  }, [errorApi, errorEmail, errorName, errorPassword]);

  const validationEmail = (value) => {
    if (!REG_EMAIL.test(value)) {
      setErrorEmail(`${value} не является электронной почтой`);
    } else {
      setErrorEmail('');
    }
  };

  const validationName = (value) => {
    if (value.length < 2) {
      setErrorName(
        `Имя не может быть меньше 2 символов, сейчас символов ${value.length}`
      );
    } else if (!REG_NAME.test(value)) {
      setErrorName(`недопустимые символы`);
    } else if (value.length > 30) {
      setErrorName(
        `Имя не может быть длиннее 30 символов, сейчас символов ${value.length}`
      );
    } else {
      setErrorName('');
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

  useEffect(() => {
    setErrorApi('');
  }, [email, name, password]);

  function handleInputName(e) {
    setName(e.target.value);
    validationName(e.target.value);
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
    console.log('сабмит');
    e.preventDefault();
    if (submitActive) {
      setIsLoading(true);
      register({name, email, password})
        .then((user) => {
          setIsLoading(false);
          localStorage.setItem('JWT', user.accessToken);
          handleLogin(user.uid);
          setName('');
          setEmail('');
          setPassword('');
          navigate('/movies');
        })
        .catch((error) => {
          setIsLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          apiErrorController(error);
          console.log('errorMessage :>> ', errorCode, errorMessage);
        });
    } else {
      setErrorApi('Заполните все поля корректными данными');
    }
  }

  return (
    <div className="dialog">
      <div className="dialog__container dialog__container_type_auth">
        <img
          className="header__logo header__logo_type_signin"
          src={headerLogo}
          alt="логотип"
          onClick={() => navigate('/')}
        />
        <h2 className="dialog__header dialog__header_type_auth">
          Добро пожаловать!
        </h2>
        <form onSubmit={handleSubmit}>
          <span className="dialog__input-span dialog__input-span_type_signin">
            Имя
          </span>
          <input
            type="name"
            value={name ? name : ''}
            onChange={handleInputName}
            className={
              errorName
                ? 'dialog__input dialog__input_type_signin dialog__input_type_error'
                : 'dialog__input dialog__input_type_signin'
            }
            disabled={isLoading}
            placeholder="Имя"
          ></input>
          <span className="dialog__input-error">{errorName}</span>
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
            placeholder="E-mail"
            disabled={isLoading}
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
            placeholder="пароль"
            disabled={isLoading}
          ></input>
          <span className="dialog__input-error">{errorPassword}</span>
          <span className="dialog__input-error">{errorApi}</span>
          <button
            className={
              submitActive
                ? 'dialog__button dialog__button_type_log dialog__button_type_log-reg'
                : 'dialog__button dialog__button_type_log-reg dialog__button_type_log-inactive '
            }
            onClick={handleSubmit}
          >
            Зарегистрироваться
          </button>
          <div className="dialog__button dialog__button_type_reg">
            Уже зарегистрированы?
            <button
              className="dialog__button-link"
              onClick={() => navigate('/signin')}
            >
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
