import React, { useState, useRef, useMemo, useCallback } from "react";
import { geoSuggest } from 'utils/geoSuggest';
import { debounce } from "lodash";
import { createOrganisation } from "actions/organisations";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Form,
  Input,
  Radio,
  AutoComplete,
  Spin,
  Select,
} from 'antd';

const typesOrganisation = ["Сад", "Школа", "Секция", "Репетитор"];
const themeOrganisation = [
  {
    label: "спорт",
    value: "sport",
  },
  {
    label: "творчество",
    value: "creative",
  },
  {
    label: "развитие",
    value: "development",
  },
];

const schoolTypes = ["Частная", "Государственная"];
const repetitionTypes = [
  "Математика",
  "Русский язык",
  "История",
  "Физика",
  "Химия",
  "Биолгария",
  "Английский язык",
  "История",
  "География",
  "Литература",
  "Обществознание",
  "Информатика",
  "Физкультура",
  "Музыка",
];
export const AddOrganisationForm = () => {
  const { authData } = useSelector(state => state.auth);
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const [typeOrganisation, setTypeOrganisation] = useState(typesOrganisation[0]);

  const [form] = Form.useForm();
  const fetchRef = useRef(0);
  const dispath = useDispatch();
  const navigate = useNavigate();

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

  const onChangeOrgType = useCallback((value) => {
    setTypeOrganisation(value.target.value);
  }, []);

  const getOpionsFromArray = useCallback((array) => {
    return array.map((item) => ({
      label: item,
      value: item,
    }));
  }, []);

  const handleSubmit = useCallback((values) => {
    console.log("Received values of form: ", values);
    dispath(createOrganisation({ creater_id: authData?.id, ...values }, navigate));
  }, [dispath, authData?.id, navigate]);
  return (
    <Form
      layout={"vertical"}
      form={form}
      onFinish={handleSubmit}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        label="Название организации"
        name="name"
        rules={[
          {
            required: true,
            message: "Введите название организации",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Почта"
        name="email"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Введите Email',
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        label="Адрес"
        name="address"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Введите Email',
          },
        ]}
      >
        <AutoComplete
          onSearch={debounceFetcher}
          notFoundContent={fetching ? <Spin size="small" /> : null}
          placeholder="Введите адрес"
          options={options}
        />
      </Form.Item>
      <Form.Item
        label="Описание организации"
        name="description"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Введите описание',
          },
        ]}
      >
        <Input.TextArea rows={4} placeholder="Описание организации" />
      </Form.Item>
      
      <Form.Item>
        <Radio.Group onChange={onChangeOrgType} defaultValue={typesOrganisation[0]}>
          {typesOrganisation.map((item, index) => (
            <Radio.Button key={index} value={item}>
              {item}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
      {(typeOrganisation === typesOrganisation[0] || typeOrganisation === typesOrganisation[1]) && (
        <Form.Item
          name="schoolType"
          label="Тип организации"
        >
          <Select
            allowClear
            style={{ width: '100%' }}
            options={getOpionsFromArray(schoolTypes)}
          />
        </Form.Item>
      )}
      {typeOrganisation === typesOrganisation[2] && (
        <Form.Item
          name="kindClass"
          label="Вид занятий"
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            options={themeOrganisation}
          />
        </Form.Item>
      )}
      {typeOrganisation === typesOrganisation[3] && (
        <Form.Item
          name="lessons"
          label="Предметы"
        >
          <Select
            allowClear
            mode='multiple'
            style={{ width: '100%' }}
            options={getOpionsFromArray(repetitionTypes)}
          />
        </Form.Item>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
};