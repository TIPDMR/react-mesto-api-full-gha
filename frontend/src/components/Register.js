import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import useValidation from '../hooks/useValidation';

const Register = ({isLoading, loggedIn, onRegister}) => {
  const [formValid, setFormValid] = useState(false);
  const classError = `auth-registration-block__input-error ${
    !formValid ? 'auth-registration-block__error_visible' : ''
  }`;
  const email = useValidation();
  const password = useValidation();

  useEffect(() => {
    if (loggedIn) return;
    email.setValue('');
    password.setValue('');
    return () => {
      email.setValue('');
      email.setInputError('');
      password.setValue('');
      password.setInputError('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  useEffect(
    (e) => {
      if (loggedIn) return;
      if (email.inputValid && password.inputValid) {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    },
    [email.inputValid, password.inputValid, loggedIn]
  );

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email.value, password.value);
  }

  return (
    <section className="auth-registration-block page__auth-registration-block">
      <h2 className="auth-registration-block__title">Регистрация</h2>
      <form className="auth-registration-block__form" onSubmit={handleSubmit} action="#">
        <input
          className="auth-registration-block__input"
          placeholder="Email"
          type="email"
          value={email.value}
          onChange={email.handleChange}
          required
        />
        <span className={classError}>{email.inputError}</span>
        <input
          className="auth-registration-block__input"
          placeholder="Пароль"
          type="password"
          minLength="2"
          maxLength="40"
          pattern="^((?!\s{2}).)*$"
          value={password.value}
          onChange={password.handleChange}
          required
        />
        <span className={classError}>{password.inputError}</span>
        <button
          disabled={isLoading || !formValid}
          type="submit"
          className={`auth-registration-block__button ${
            !loggedIn && (isLoading || !formValid) ? 'auth-registration-block__button_disabled' : ''
          }`}>
          Зарегистрироваться
        </button>
      </form>
      <NavLink className="auth-registration-block__link" to="/sign-in">
        Уже зарегистрированы? Войти
      </NavLink>
    </section>
  );
};

export default Register;
