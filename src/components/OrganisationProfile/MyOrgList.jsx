import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrganisationsList } from 'actions/organisations';
import { List, Avatar } from 'antd';
import { Link } from'react-router-dom';

export const MyOrgList = () => {
  const [page, setPage] = useState(1);
  const { isLoading, organisations, auth } = useSelector((state) => state.organisations);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoading) {
      return;
    }
    dispatch(getOrganisationsList(page, auth?.authData?.id))
  }, [page, dispatch, isLoading, auth?.authData?.id]);

  return (
    <div>
      <List
        pagination={{ position: "bottom", align: "center" }}
        dataSource={organisations}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
              title={<Link to={`/profile/organisation/${item.id}`}>{item.name}</Link>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  )
}