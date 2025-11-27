import "./Global.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandindPage from "./Pages/LandingPage/LandingPage";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Cadastro from "./Pages/Cadastro/Cadastro";
import Recuperar from "./Pages/Recuperar/Recuperar";
import Mentoria from "./Pages/Mentoria/Mentoria";
import Layout from "./components/Layout/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Usuarios from "./Pages/Usuarios/Usuarios";
import Perguntas from "./Pages/Perguntas/Perguntas";
import Mentorias from "./Pages/Mentorias/Mentorias";
import Assuntos from "./Pages/Assuntos/Assuntos";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandindPage />,
  },
  {
    path: "/Mentoria",
    element: <Mentoria />,
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
  {
    path: "/painel",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "usuarios",
        element: <Usuarios />,
      },
      {
        path: "perguntas",
        element: <Perguntas />,
      },
      {
        path: "mentorias",
        element: <Mentorias />,
      },
      {
        path: "assuntos",
        element: <Assuntos />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
