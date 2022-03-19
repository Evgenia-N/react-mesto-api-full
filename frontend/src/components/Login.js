import React from "react";
import { useNavigate } from "react-router-dom";
import './styles/Login.css'

export default function Login({onLogin}) {
  const [values, setValues] = React.useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const email=values.email;
    const password=values.password;
    onLogin(email, password);
  };

  return (
    <div className="login">
      <span className="login__enter">Вход</span>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          required
          id="email"
          name="email"
          type="email"
          value={values.email || ''}
          onChange={handleChange}
          className="login__input"
          placeholder="Email"
        />
        <input
          required
          id="password"
          name="password"
          type="password"
          value={values.password || ''}
          onChange={handleChange}
          className="login__input"
          placeholder="Пароль"
        />
        <button
            type="submit"
            onSubmit={handleSubmit}
            className="login__link">
        </button>
      </form>
    </div>
  );
}

