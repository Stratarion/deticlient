import React, { useEffect } from 'react';

import Header from 'components/Header';

import { useDispatch } from 'react-redux';
import { getUsersList } from 'actions/auth';

function UsersList() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersList(1));
  }, [dispatch]);

  return (
    <div>
      <Header />
      Список пользователей
    </div>
  )
};

export default UsersList;