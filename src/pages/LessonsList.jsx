import React, { useCallback, useEffect } from "react";
import { Flex, Button, Modal, Form, Input, Table } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addLesson } from "actions/lesson";
import { getLessonsByOrgId } from "actions/lesson";
import { getTableDataWithKey } from "utils";

const columnsLessons = [
  {
    title: "Имя",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Описание",
    dataIndex: "description",
    key: "description"
  }
]

export const LessonsListPage = () => {
  const params = useParams();
  const { lessons } = useSelector((state) => state.lessons);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isModalAddLessonOpen, setIsModalAddLessonOpen] = React.useState(false);
  
  useEffect(() => {

    dispatch(getLessonsByOrgId(params.id));
  }, [dispatch, params.id]);
  
  const heandleClickCreateLesson = useCallback(() => {
    setIsModalAddLessonOpen(true);
  }, []);

  const handleAddLessonOk = useCallback((values) => {
    setIsModalAddLessonOpen(false);
    const lesson = {
      name: values.name,
      description: values.description,
      org_id: params.id
    }
    dispatch(addLesson(lesson));
    
  }, [dispatch, params.id]);

  const handleAddLessonCancel = useCallback(() => {
    setIsModalAddLessonOpen(false);
  }, []);

  return (
    <Flex vertical>
      <Button style={{ width: "200px" }} onClick={heandleClickCreateLesson} variant="primary">Добавить занятие</Button>
      <Modal
        title="Добавить занятие"
        open={isModalAddLessonOpen}
        footer={[]}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleAddLessonOk}
        >
          <Form.Item name="name" label="Имя">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Описание">
            <Input />
          </Form.Item>
          <Form.Item>
            <Flex gap={"10px"}>
              <Button htmlType="submit" type="primary">Подтвердить</Button>
              <Button onClick={handleAddLessonCancel}>Отмена</Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columnsLessons} dataSource={getTableDataWithKey({ data: lessons, keyName: "id"})} rowKey={"id"} />
    </Flex>
  );
};