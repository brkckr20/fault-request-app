import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Giris from "./pages/Giris";
import Panel from "./pages/Panel";
import BekleyenTalepler from "./pages/BekleyenTalepler";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Giris />,
  },
  {
    path: "/panel/:slug",
    element: <Panel />,
  }, {
    path: "/panel/:slug/bekleyentalepler",
    element: <BekleyenTalepler />,
  },
]);
