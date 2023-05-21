import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';

const Menu = ({ onExit, userEmail }) => (
  <>
    <Routes>
      <Route
        exact
        path="/sign-up"
        element={
          <Link className="header__menu-link" to="/sign-in" replace={true}>
              Войти
          </Link>
        }
      />
      <Route
        exact
        path="/sign-in"
        element={
          <Link className="header__menu-link" to="/sign-up" replace={true}>
              Регистрация
          </Link>
        }
      />
      <Route
        exact
        path="/"
        element={
          <div>
            <span className="header__menu-user-email">{userEmail}</span>
            <button className="header__menu-button" onClick={onExit}>
                Выход
            </button>
          </div>
        }
      />
    </Routes>
  </>
);

export default Menu;
