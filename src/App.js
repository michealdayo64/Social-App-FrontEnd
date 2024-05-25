import "./App.css";
import HomePage from "./Pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../src/redux_folder/authSlice";
import { useEffect } from "react";


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
]);

function App() {
  const isAuth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const refresh = JSON.parse(
      typeof window !== "undefined" && window.localStorage.getItem("token")
    );
    if (refresh) {
      const getLoadUser = async () => {
        const url = "http://127.0.0.1:8000/account/token/refresh/";
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({ refresh: refresh?.refresh }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.status === 200) {
          dispatch(loadUser(data));
        }
      };
      getLoadUser();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth.isAuthenticated]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
