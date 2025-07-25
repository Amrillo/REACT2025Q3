import { createBrowserRouter } from "react-router";
import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";
import { App } from "../App";

 
export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, element: <HomePage /> },        // renders at / inside <Outlet />
      { path: 'about', element: <AboutPage /> },     // renders at /about inside <Outlet />
    ],
  },
]);