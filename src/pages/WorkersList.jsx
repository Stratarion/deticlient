import React, { useCallback, useEffect } from "react";
import { Flex, Button, Modal, Form, Input, Table } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addWorker, getWorkersByOrgId } from "actions/worker";

const columnsWorkers = [
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

export const WorkersListPage = () => {
  const params = useParams();
  const { workers } = useSelector((state) => state.workers);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isModalAddWorkerOpen, setIsModalAddWorkerOpen] = React.useState(false);
  
  useEffect(() => {
    dispatch(getWorkersByOrgId(params.id));
  }, [dispatch, params.id]);
  
  const heandleClickCreateWorker = useCallback(() => {
    setIsModalAddWorkerOpen(true);
  }, []);

  const handleAddWorkerOk = useCallback((values) => {
    setIsModalAddWorkerOpen(false);
    const worker = {
      name: values.name,
      description: values.description,
      org_id: params.id
    }
    dispatch(addWorker(worker));
    
  }, [dispatch, params.id]);

  const handleAddWorkerCancel = useCallback(() => {
    setIsModalAddWorkerOpen(false);
  }, []);

  return (
    <Flex vertical>
      <Button style={{ width: "200px" }} onClick={heandleClickCreateWorker} variant="primary">Добавить работника</Button>
      <Modal
        title="Добавить работника"
        open={isModalAddWorkerOpen}
        footer={[]}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleAddWorkerOk}
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
              <Button onClick={handleAddWorkerCancel}>Отмена</Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columnsWorkers} dataSource={workers} />
    </Flex>
  );
};