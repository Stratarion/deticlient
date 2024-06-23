import React, { useEffect, useState } from "react";
import { Form, InputNumber, Modal, Button, Space, Select, DatePicker, TimePicker  } from "antd";
import { getInfoSheduller } from "api";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createEvent } from "actions/sheduller";


const { RangePicker } = DatePicker;
const { RangePicker: TimeRangePiker } = TimePicker;

export const AddEventOrgModal = ({ open, handleCancel }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const [lessonsOptions, setLessonsOptions] = useState([]);
  const [workersOptions, setWorkersOptions] = useState([]);

  const getOptionsFromData = (data) => {
    return data.map((item) => ({
      label: item.name,
      value: item.name,
    })
  )}
  
  useEffect(() => {
    getInfoSheduller(params.id).then(({ data}) => {
      setLessonsOptions(getOptionsFromData(data.lessons));
      setWorkersOptions(getOptionsFromData(data.workers));
    });
  }, [params.id]);

  const onFinish = (values) => {
    console.log("Received values of form: ", values, values.time[0].format("HH:mm"));
    const newEvent = {
      lesson: values.lesson,
      worker: values.worker,
      date_start: values.date[0].format("YYYY-MM-DD"),
      date_end: values.date[1].format("YYYY-MM-DD"),
      time_start: values.time[0].format("HH:mm"),
      time_end: values.time[1].format("HH:mm"),
      group_size: values.group_size,
      org_id: params.id,
    };
    dispatch(createEvent(newEvent));
    handleCancel();
  };

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(0, 6),
  });

  return (
    <Modal
      open={open}
      handleCancel={handleCancel}
      title="Добавить событие"
      footer={null}
      onCancel={handleCancel}
    >
      <Form
        layout={"vertical"}
        onFinish={onFinish}
      >
        <Form.Item name="lesson" label="Выберите занятие">
          <Select
            options={lessonsOptions}
          />
        </Form.Item>
        <Form.Item name="worker" label="Выберите работника">
          <Select
            options={workersOptions}
          />
        </Form.Item>
        <Form.Item name="date" label="Выберите дату">
          <RangePicker />
        </Form.Item>
        <Form.Item name="time" label="Время">
          <TimeRangePiker format="HH:mm" minuteStep={30} disabledTime={disabledDateTime} />
        </Form.Item>
        <Form.Item name="group_size" label="Размер группы">
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button onClick={handleCancel} >Отмена</Button>
            <Button type="primary" htmlType="submit">Подтвердить</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};
