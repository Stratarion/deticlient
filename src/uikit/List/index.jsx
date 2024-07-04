import React from "react";
import styled from "styled-components";
import { ListItem } from "./ListItem";
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Divider, List as AntList, Space } from 'antd';
import { Stars } from 'components/Stars';
export {
  ListItem,
}


const ListStyled = styled(AntList)`
`;
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ShortInfo = (info) => {
  return (
    <Space split={<Divider type="vertical" />}>
      {info.type}
      {info.costInfo ? `${info.costInfo}₽` : null}
      {info.maxCount ? `Размер группы - ${info.maxCount}` : null}
      {info.address}
    </Space>
  )
} 

export const List = ({ data, handleTitleClick, page, setPage }) => {
  return (
    <ListStyled
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 10,
        current: page,
        onChange: setPage,
      }}
      dataSource={data}
      footer={
        <div>
          <b>Футер</b> Хорошее рекламное место
        </div>
      }
      renderItem={(item) => (
        <ListStyled.Item
          key={item.title}
          actions={[
            <Stars value={item.rate} edit={false} />,
            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <ListStyled.Item.Meta
            // avatar={<Avatar src={item.avatar} />}
            title={<div onClick={() => handleTitleClick(item)} >{item.name}</div>}
            description={ShortInfo(item)}
          />
          {item.description}
        </ListStyled.Item>
      )}
    />
  )
}