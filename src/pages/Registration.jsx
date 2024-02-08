import React, { useState } from "react";

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from "components/Header";

import { signup } from 'actions/auth';
import { Button } from "uikit";
import { InputWithLabel } from "uikit";


export default function RegistrationPage () {
  const [nameValue, setNameValue] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isOrganisation, setIsOrganisation] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    const form = {
      name: nameValue,
      email: email,
      password: password,
      isOrganisation: isOrganisation,
    };

    dispatch(signup(form, navigate));
    
    e.preventDefault();
    navigate('/');
  }
  return (
    <div className="registration">
      <Header />
      <div>Регистрация</div>
      <form className="registration-form" onSubmit={handleSubmit}>
        <InputWithLabel
          label="Имя"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
        />
        <InputWithLabel
          label="Почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputWithLabel
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>
          Организация:
          <input type="checkbox" value={isOrganisation} onChange={(e) =>setIsOrganisation(e.target.value)} />
        </label>
        <Button type="submit">Подтвердить</Button>
      </form>
    </div>
  )
}