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
import UsersList from "pages/UsersList";
import { useDispatch } from "react-redux";
import { AUTH } from "constants/actionTypes";

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
    path: "userslist",
    Component: UsersList,
  }
])

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('profile')) {
      dispatch({ type: AUTH, data: JSON.parse(localStorage.getItem('profile'))})
    }
  }, [dispatch])
  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;