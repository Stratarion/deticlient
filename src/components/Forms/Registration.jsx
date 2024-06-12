import React, { useState, useRef, useMemo } from 'react';
import {
  Button,
  Form,
  Input,
  AutoComplete,
  Spin,
  Flex,
  Checkbox,
} from 'antd';
import { geoSuggest } from 'utils/geoSuggest';
import { debounce } from "lodash";
import { signup } from 'actions/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from'react-router-dom';

export const RegistrationForm = () => {
  const [form] = Form.useForm();

  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      geoSuggest(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, 800);
  }, []);

  const handleSubmit = (values) => {

    const user = {
      name: values.name,
      email: values.email,
      password:  values.password,
      isOrganisation: values.isOrganisation,
      address: values.address,
    }
    dispatch(signup(user, navigate));
  };

  return (
    <Flex gap="middle" vertical>
      <Form
        layout={"vertical"}
        form={form}
        onFinish={handleSubmit}
        style={{
          maxWidth: 600,
        }}
      >
        
        <Form.Item
          label="Имя"
          name="name"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Введите имя',
              
            },
          ]}
        >
          <Input placeholder="Ваше имя" />
        </Form.Item>
        <Form.Item
          label="Почта"
          name="email"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Введите почту',
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="address" label="Адрес">
          <AutoComplete
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            placeholder="Введите адрес"
            options={options}
          />
        </Form.Item>
        <Form.Item name="isOrganisation" valuePropName="checked">
          <Checkbox>Представитель организации (директор, репетитор, тренер)</Checkbox>
        </Form.Item>
        
        <Form.Item
          label="Пароль"
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Введите пароль',
            },
          ]}
        >
          <Input.Password placeholder="Введите пароль" />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="confirm"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Введите пароль',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают!'));
              },
            }),
          ]}
          label="Подтвердите пароль"
        >
          <Input.Password placeholder="Подтвердите пароль" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">Подтвердить</Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};