import React from "react";
import { useNavigate } from "react-router-dom";
import * as auth from '../utils/auth.js';

function Login({ handleLogin }) {
  const [formValue, setFormValue] = React.useState({
    password: '',
    email: '',
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = formValue;
    auth.authorize(password, email)
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem('jwt', data.jwt);
          handleLogin();
          navigate('/', {replace: true});
        }
      })
      .catch(err => console.log(err));
    }

  return (
    <section className="content-autorize">
        <h1 className="autorize__title">Вход</h1>
        <form onSubmit={handleSubmit}>
            <label className="field">
                <input
                  className="autorize__input"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required=""
                  autoComplete="off"
                  value={formValue.email}
                  onChange={handleChange}
                />
                <span className="popup__input-error" />
            </label>
            <label className="field">
                <input
                  className="autorize__input"
                  name="password"
                  type="password"
                  placeholder="Пароль"
                  required=""
                  autoComplete="off"
                  value={formValue.password}
                  onChange={handleChange}
                />
                <span className="popup__input-error popup__input-error_autorize" />
            </label>
            <button className="autorize__button link-hover" type="submit" aria-label="Сохранить">Войти</button>
        </form>
    </section>
  )
}

export default Login;
