import React, { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid } from "uikit";
import { GridItem } from "uikit";
import styled from "styled-components";
import { fileReaderHealper } from "utils/fileReader";
import { FlexBox, Image } from "uikit";
import settings from "images/settings.svg";
import { Input } from "uikit";
import { MainLayout } from "layouts";
import { OrganisationProfile } from "components/OrganisationProfile";
import { MyOrgList } from "components/OrganisationProfile/MyOrgList";


const ProfileStyled = styled.div`
`;
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
      console.log(authData, email);
      setName(authData.name);
      setEmail(authData.email);
    }
  }, [authData, email])


  return (
    <MainLayout>
      <ProfileStyled>
        {authData ? <Grid rows="repeat(6, 1fr)">
          <GridItem columns="1/3" rows="1/7">
            <FlexBox direction="column">
              <Image src={userAvatar} height="100%" />
              {settingsMod && <input type="file" onChange={(e) => fileReaderHealper(e, setUserAvatar)} />}

            </FlexBox>
          </GridItem>
          <GridItem columns="3/5">
            <h5>Имя пользователя</h5>
            {
              settingsMod
                ? <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                : <p>{authData.name}</p>
            }
            
            {settingsMod}
          </GridItem>
          <GridItem columns="5/7">
            <h5>Почта</h5>
            <p>{authData.email}</p>
          </GridItem>
          <GridItem columns="12/13">
            <FlexBox justify="flex-end">
              <Image onClick={handleClickSettings} src={settings} width="20px" height="auto" />
            </FlexBox>
          </GridItem>
          { authData.isOrganisation &&
            <GridItem columns="1/13">
              <OrganisationProfile />
            </GridItem>
          }
          { authData.isOrganisation &&
            <GridItem columns="1/13">
              <MyOrgList />
            </GridItem>
          }
          <GridItem></GridItem>
          <GridItem></GridItem>
          <GridItem></GridItem>
          <GridItem></GridItem>
          <GridItem></GridItem>
          <GridItem></GridItem>
          <GridItem></GridItem>
          <GridItem></GridItem>
          <GridItem></GridItem>
          <GridItem></GridItem>
          <GridItem></GridItem>
        </Grid> : <div>Загрузка</div>}

      </ProfileStyled>
    </MainLayout>
  );
};

export default UserProfilePage;