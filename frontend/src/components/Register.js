import React from "react";
import { Link } from "react-router-dom";
import "./styles/Register.css"

export default function Register({onRegister}) {
  const [values, setValues] = React.useState({
    email:'',
    password:'',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email=values.email;
    const password=values.password;
    onRegister(email, password);
    }

    return (
      <div className="register">
        <p className="register__enter">Регистрация</p>
        <form onSubmit={handleSubmit} className="register__form">
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className="register__input"
            placeholder="Email"
          />
          <input
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            className="register__input"
            placeholder="Пароль"
          />
            <button
              type="submit"
              onSubmit={handleSubmit}
              className="register__link">
            </button>
        </form>
  
        <div className="register-login">
          <p className="register-login__text">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="register-login__link">
            Войти
          </Link>
        </div>
      </div>
    );
}
