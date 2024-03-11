import React from "react";
import styled from "styled-components";
import { ListItem } from "./ListItem";
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
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

export const List = ({ page, data, handleTitleClick }) => {
  // return <ListStyled $mtop={mtop}>{children}</ListStyled>;
  return (
    <ListStyled
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={data}
      footer={
        <div>
          <b>ant design</b> footer part
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
            title={<a onClick={() => handleTitleClick(item)} >{item.name}</a>}
            description={ShortInfo(item)}
          />
          {item.description}
        </ListStyled.Item>
      )}
    />
  )
}