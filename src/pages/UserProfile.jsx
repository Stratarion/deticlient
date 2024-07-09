import React, { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Input } from "uikit";
import { MainLayout } from "layouts";
import { OrganisationProfile } from "components/OrganisationProfile";
import { MyOrgList } from "components/OrganisationProfile/MyOrgList";
import { uploadImage, updateUser } from "api";
import { EditOutlined } from "@ant-design/icons";
import { getBase64 } from "utils/base64";
import { Upload, Button, Image, Row, Col, Spin, Flex, Typography } from "antd";

const ProfileStyled = styled.div`
`;

const { Text, Title } = Typography;

const StyledRow = styled(Row)({
  display: "flex",
  padding: "10px 0"
});

const StyledEdit = styled(EditOutlined)({
  position: "absolute",
  top: "10px",
  right: "15px"
});

const StyledImage = styled(Image)({
  maxHeight: "300px"
});

const UserProfilePage = () => {
  const { authData } =  useSelector(state => state.auth);
  const [userAvatar, setUserAvatar] = useState(null);
  const [settingsMod, setSettingsMod] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleClickSettings = useCallback(() => {
    setSettingsMod(!settingsMod);
  }, [settingsMod]);

  useEffect(() => {
    if (authData) {
      setName(authData.name);
      setEmail(authData.email);
    }
  }, [authData, email])

  const sendFile = async () => {
    const avatrInfo = await uploadImage(userAvatar);
    updateUser({
      id: authData.id,
      avatar_url: avatrInfo.data.Location,
    });
  }

  const handleChangeAvatar = async (info) => {
    console.log(info)
    const lastIndex = info.fileList.length - 1
    if (!info.fileList[lastIndex].url && !info.fileList[lastIndex].preview) {
      info.fileList[lastIndex].preview = await getBase64(info.fileList[lastIndex].originFileObj);
    }
    setUserAvatar(info.fileList[lastIndex])
  }
  console.log(userAvatar)
  return (
    <MainLayout>
      <ProfileStyled>
        {authData ? <>
          <StyledRow gutter={[16, 16]}>
            <Col span={6}>
              <StyledRow>
                <Col span={24}>
                  <StyledImage src={ userAvatar?.url || userAvatar?.preview || authData.avatar_url} />
                </Col>
              </StyledRow>
              <StyledRow>
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
              </StyledRow>
            </Col>
            <Col span={18}>
              <StyledRow gutter={[16, 16]}>
                <Col span={12}>
                  <Title level={4}>Имя пользователя</Title>
                  {
                    settingsMod
                      ? <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                      : <Text>{authData.name}</Text>
                  }
                  {settingsMod}
                </Col>
                <Col span={12}>
                
                  <Title level={4}>Почта</Title>
                  <Text>{authData.email}</Text>
                </Col>
                <StyledEdit onClick={handleClickSettings} />
                <Col span={24}>
                  <Title level={4}>Адрес</Title>
                  <Text>{authData.address}</Text>
                </Col>
                <Col span={24}>
                  <Title level={4}>Телефон</Title>
                  <Text>{authData.phone || "Не указан"}</Text>
                </Col>
              </StyledRow>
            </Col>
          </StyledRow>
          { authData.isOrganisation &&
            <Row gutter={[16, 16]}>
              <OrganisationProfile />
            </Row>
          }
          { authData.isOrganisation &&
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <MyOrgList />
              </Col>
            </Row>
          }
        </> : <Spin />}
      </ProfileStyled>
    </MainLayout>
  );
};

export default UserProfilePage;