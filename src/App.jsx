import "App.css";
import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "pages/Home";
import Kindergarten from "pages/Kindergarten";
import Sections from "pages/Sections";
import GartenById from "pages/GartenById";
import AuthPage from "pages/Auth";
import RegistrationPage from "pages/Registration";
import AddGartenPage from "pages/AddKinderGarten";
import AddSectionPage from "pages/AddSection";
import UsersList from "pages/UsersList";
import UserProfilePage from "pages/UserProfile";
import OrganisationProfilePage from "pages/OrganisationProfilePage";
import { useDispatch } from "react-redux";
import { authUser } from "actions/auth";
import { AddOrganisationPage } from "pages/AddOrganisation";
import { ShedulleListPage } from "pages/ShedulleList";
import { LessonsListPage } from "pages/LessonsList";
import { YMaps } from '@pbe/react-yandex-maps';
import { WorkersListPage } from "pages/WorkersList";
import { OrganisationInfoPage } from "pages/OrganisationInfo";

import { YA_KEY_API } from 'constants';

import moment from 'moment';
// Set moment to FR
moment().locale('ru');

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "auth",
    Component: AuthPage,
  },
  {
    path: "registration",
    Component: RegistrationPage,
  },
  {
    path: "kindergarten",
    Component: Kindergarten,
  },
  {
    path: "kindergarten/:id",
    Component: GartenById,
  },
  {
    path: "kindergarten/create",
    Component: AddGartenPage,
  },
  {
    path: "sections",
    Component: Sections,
  },
  {
    path: "sections/:id",
    Component: GartenById,
  },
  {
    path: "sections/create",
    Component: AddSectionPage,
  },
  {
    path: "userslist",
    Component: UsersList,
  },
  {
    path: "profile",
    Component: UserProfilePage,

  },
  {
    path: "profile/organisation/:id",
    Component: OrganisationProfilePage,
    children: [
      {
        path: "shedulle",
        Component: ShedulleListPage,
      },
      {
        path: "lessons",
        Component: LessonsListPage,
      },
      {
        path: "workers",
        Component: WorkersListPage,
      },
      {
        path: "info",
        Component: OrganisationInfoPage,
      }
    ]
  },
  {
    path: "profile/organisation/add",
    Component: AddOrganisationPage,
  },
])

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(authUser());
    }
  }, [dispatch])
  return (
    <div className="container">
      <YMaps
        query={{
          apikey: YA_KEY_API
        }}
      >
        <RouterProvider router={router} />
      </YMaps>
    </div>
  );
}

export default App;