import "./Global.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

<<<<<<< HEAD
import LandindPage from "./Pages/LandingPage/LandingPage";
=======
import LandindPage from "./Pages/LandingPage/LandingPage"
import Mentoria from "./Pages/Mentoria/Mentoria"
>>>>>>> 9a9bc1020d53224660165c78f0979dfe2328870d
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Cadastro from "./Pages/Cadastro/Cadastro";
import Recuperar from "./Pages/Recuperar/Recuperar";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Usuarios from "./pages/Usuarios/Usuarios";
import Perguntas from "./pages/Perguntas/Perguntas";
import Mentorias from "./pages/Mentorias/Mentorias";
import Assuntos from "./pages/Assuntos/Assuntos";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandindPage />,
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
