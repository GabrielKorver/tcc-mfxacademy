import "./Global.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandindPage from "./Pages/LandingPage/LandingPage"
import Mentoria from "./Pages/Mentoria/Mentoria"
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Cadastro from "./Pages/Cadastro/Cadastro";
import Recuperar from "./Pages/Recuperar/Recuperar";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandindPage />
  },
  {
    path: "/Mentoria",
    element: <Mentoria />
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/Cadastro",
    element: <Cadastro />,
  },
  {
    path: "/Recuperar",
    element: <Recuperar />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
