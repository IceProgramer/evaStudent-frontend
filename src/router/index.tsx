import { RouteObject } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import App from "../App";
import CoursePage from "../pages/CoursePage";
import TargetPage from "../pages/TargetPage";

export const routes: Array<RouteObject> = [
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/eva",
    element: <App />,
    children: [
      {
        path: "/eva",
        element: <HomePage />,
      },
      {
        path: "/eva/course/:id/:teacherIndex",
        element: <CoursePage />,
      },
      {
        path: "/eva/target/:courseId/:teacherId/:targetId",
        element: <TargetPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
