import React, { useState } from "react";

import Header from "components/Header";

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signin } from "actions/auth";
import { InputWithLabel } from "uikit";
import { Button } from "uikit";


export default function AuthPage () {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
    
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    const form = {
      email,
      password,
    };

    dispatch(signin(form, navigate));
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className="auth">
      <Header />
      <div>Авторизация</div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <InputWithLabel
          label="Почта"
          type="text"
          value={email}
          onChange={(e) =>setEmail(e.target.value)}
        />
        <InputWithLabel
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) =>setPassword(e.target.value)}
        />
        <Button
          type="submit"
        >Подтвердить</Button>
      </form>
    </div>
  )
}