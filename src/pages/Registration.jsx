import React from "react";

import { MainLayout } from "layouts";
import {  Typography  } from 'antd';
import { RegistrationForm } from "components/Forms/Registration";

const { Title } = Typography;

export default function RegistrationPage () {
  return (
    <MainLayout className="registration">
      <Title level={2}>Регистрация</Title>
      <RegistrationForm />
    </MainLayout>
  )
}