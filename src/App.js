import "./App.css";
import HomePage from "./Pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import { useSelector, useDispatch } from "react-redux";
import { loadUserAccessToken, loadUser } from "../src/redux_folder/authSlice";
import { useEffect } from "react";
import FriendsPage from "./Pages/FriendsPage";
import Group from "./Pages/Group";
import Notifications from "./Pages/Notifications";
import { jwtDecode } from "jwt-decode";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <HomePage />
      </div>
    ),
  },
  {
    path: "/register",
    element: (
      <div>
        <RegisterPage />
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <LoginPage />
      </div>
    ),
  },
  {
    path: "/friends",
    element: (
      <div>
        <FriendsPage />
      </div>
    ),
  },
  {
    path: "/group",
    element: (
      <div>
        <Group />
      </div>
    ),
  },
  {
    path: "/notifications",
    element: (
      <div>
        <Notifications />
      </div>
    ),
  },
]);

function App() {
  const isAuth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  var userdata = {};

  useEffect(() => {
    const refresh = JSON.parse(localStorage.getItem("token"));
    const getLoadUserAccessToken = async () => {
      const url = "http://127.0.0.1:8000/account/token/refresh/";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ refresh: refresh }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        dispatch(loadUserAccessToken(data));
        userdata["userdata"] = jwtDecode(data.access);
        dispatch(loadUser(userdata));
      }
    };
    getLoadUserAccessToken();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth.isAuthenticated]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
