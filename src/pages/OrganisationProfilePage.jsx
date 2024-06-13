import React, { useEffect } from "react";
import { MainLayout } from "layouts";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrganisationById } from "actions/organisations";
import { Typography, Layout, Menu } from "antd";

const { Title } = Typography;
const { Sider, Content, Header } = Layout;

const OrganisationProfilePage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { currentOrganisation } = useSelector((state) => state.organisations);
  const params = useParams();
  useEffect(() => {
    params.id && dispatch(getOrganisationById(params.id));
  }, [params.id, dispatch]);
  const handleMenuItemClick = ({ key }) => {
    navigation(key);
  };
  return (
    <MainLayout>
        <Layout>
          <Header style={{ backgroundColor: "transparent"}} ><Title >{currentOrganisation?.name}</Title></Header>
          <Layout>
            <Sider width="25%">
              <Menu
                theme="light"
                style={{ height: "100%" }}
                mode="inline" 
                defaultSelectedKeys={['workers']}
                onClick={handleMenuItemClick}
                items={[
                  {
                    key: 'workers',
                    label: 'Сотрудники',
                  },
                  {
                    key: 'lessons',
                    label: 'Занятия',
                  },
                  {
                    key: 'shedulle',
                    label: 'Расписание',
                  },
                ]}
              />
            </Sider>
            <Content><Outlet /></Content>
          </Layout>
        </Layout>
    </MainLayout>
  );
};
export default OrganisationProfilePage;