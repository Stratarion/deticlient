import React, { useEffect } from 'react';


import { useDispatch } from 'react-redux';
import { getUsersList } from 'actions/auth';
import { MainLayout } from "layouts";

function UsersList() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersList(1));
  }, [dispatch]);

  return (
    <MainLayout>
      Список пользователей
    </MainLayout>
  )
};

export default UsersList;