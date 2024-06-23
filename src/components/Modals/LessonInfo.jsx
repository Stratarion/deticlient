import React from "react";

import {
  Modal,
  Flex,
  Row,
  Col,
} from "antd";

export const LessonInfo = ({
  lesson,
  open,
  handleOk,
  handleCancel,
}) => {
  return (
    <Modal
      title={lesson?.lesson}
      onOk={handleOk}
      onCancel={handleCancel}
      open={open}
    >
      <Flex vertical>
        <Row>
          <Col>
            Преподаватель - {lesson.worker}
          </Col>
        </Row>
        <Row>
          <Col>
            Размер группы - {lesson.group_size}
          </Col>
        </Row>
        <Row>
          <Col>
            Дата - {lesson.date_start} - {lesson.date_end}
          </Col>
        </Row>
        <Row>
          <Col>
            Время - {lesson.time_start} - {lesson.time_end}
          </Col>
        </Row>
        <Row>
          <Col>
            Размер группы - {lesson.aproved}
          </Col>
        </Row>
      </Flex>
    </Modal>
  )
}