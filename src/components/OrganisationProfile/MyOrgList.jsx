import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrganisationsList } from 'actions/organisations';
import { List, Avatar } from 'antd';
import { Link } from'react-router-dom';

export const MyOrgList = () => {
  const [page, setPage] = useState(1);
  const { organisations, auth } = useSelector((state) => state.organisations);
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(getOrganisationsList(page, auth?.authData?.id))
  }, [page, dispatch, auth?.authData?.id]);

  return (
    <div>
      <List
        pagination={{ position: "bottom", align: "center", current: page, onChange: setPage }}
        dataSource={organisations}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar_url} />}
              title={<Link to={`/profile/organisation/${item.id}/info`}>{item.name}</Link>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  )
}