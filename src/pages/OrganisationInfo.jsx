import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Typography, Flex, Upload, Button, Image } from 'antd';
import { getBase64 } from "utils/base64";
import styled from "styled-components";
import { updateOrganisation, uploadImage } from "api";

const { Text, Title } = Typography;

const StyledImage = styled(Image)({
  maxHeight: "300px"
});
export const OrganisationInfoPage = () => {
  const { currentOrganisation } = useSelector(store => store.organisations);
  
  const [orgAvatar, setOrgAvatar] = useState(null);

  const handleChangeAvatar = async (info) => {
    const lastIndex = info.fileList.length - 1
    if (!info.fileList[lastIndex].url && !info.fileList[lastIndex].preview) {
      info.fileList[lastIndex].preview = await getBase64(info.fileList[lastIndex].originFileObj);
    }
    setOrgAvatar(info.fileList[lastIndex])
  }

  const sendFile = async () => {
    const avatrInfo = await uploadImage(orgAvatar);
    updateOrganisation({
      id: currentOrganisation.id,
      avatar_url: avatrInfo.data.Location,
    });
  }
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <StyledImage src={ orgAvatar?.url || orgAvatar?.preview || currentOrganisation?.avatar_url} />
        </Col>
        <Col span={24}>
        
          <Flex gap={10} >
            <Upload
              onChange={(info) => {
                handleChangeAvatar(info)
              }}
              showUploadList={false}
              beforeUpload={(file) => {
                return new Promise ((resolve, reject) => {
                  if (file.size > 20) {
                    reject("to fat")
                  } else {
                    resolve("Success")
                  }
                })
              }}
            >
              <Button>Загрузить</Button>
            </Upload>
            <Button onClick={sendFile}>Сохранить</Button>
          </Flex>
        </Col>
        <Col span={24}>
          <Title level={4}>Адрес</Title>
          <Text>{currentOrganisation?.address}</Text>
        </Col>
        <Col span={24}>
          <Title level={4}>Телефон</Title>
          <Text>{currentOrganisation?.phone || "Не указан"}</Text>
        </Col>
        <Col span={24}>
          <Title level={4}>Почта</Title>
          <Text>{currentOrganisation?.email}</Text>
        </Col>
        <Col span={24}>
          <Title level={4}>Описание</Title>
          <Text>{currentOrganisation?.description}</Text>
        </Col>
      </Row>
    </>
  )
}