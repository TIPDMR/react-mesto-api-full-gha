import React, { useEffect, useState } from 'react';
import useValidation from '../hooks/useValidation';

const Login = ({ isLoading, loggedIn, onLogin }) => {
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
    onLogin(email.value, password.value);
    // onLogin(email.value, password.value);
  }
  return (
    <section className="auth-registration-block page__auth-registration-block">
      <h2 className="auth-registration-block__title">Вход</h2>
      <form className="auth-registration-block__form" onSubmit={handleSubmit} action="#">
        <input
          name="auth-registration-email"
          id="auth-registration-email"
          className="auth-registration-block__input"
          placeholder="email@mail.com"
          type="email"
          value={email.value}
          onChange={email.handleChange}
          required
        />
        <span className={classError}>{email.inputError}</span>
        <input
          name="auth-registration-password"
          id="auth-registration-password"
          className="auth-registration-block__input"
          placeholder="Пароль"
          type="password"
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
          Войти
        </button>
      </form>
    </section>
  );
};

export default Login;
