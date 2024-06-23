import React from "react";
import {
  Modal,
  List,
} from "antd";

export const LessonsListModal = ({
  setShowModalLessons,
  showModalLessons,
  lessonsInModal,
  handleLessonInfoClick,
}) => {
  return (
    <Modal
      title="Список занятий"
      onOk={() => setShowModalLessons(false)}
      onCancel={() => setShowModalLessons(false)}
      open={showModalLessons}
    >
      <List
        itemLayout="horizontal"
        dataSource={lessonsInModal}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<div onClick={() => handleLessonInfoClick(item)}>{item.lesson}</div>}
              description={`Преподаватель - ${item.worker}, размер группы - ${item.group_size}`}
            />
          </List.Item>
        )}
      />
    </Modal>
  )
}