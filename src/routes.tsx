import SignIn from "./pages/shared/auth/sign-in";
import SignUp from "./pages/shared/auth/sign-up";
import ForgotPassword from "./pages/shared/auth/forgot-password";
import MainLayout from "./pages/shared/layout/z-layout";
import Facebook from "./pages/shared/social-network/facebook";
import Planning from "./pages/shared/planning/planning";
import Dashboard from "./pages/shared/home/dashboard";
import Feeds from "./pages/shared/feeds/z-feed";
import { Navigate } from "@tanstack/react-location";
import Create from "./pages/shared/create/create";
import Linkedin from "./pages/shared/social-network/linkedin";
import Tasks from './pages/shared/Tasks/App'
export const routes = [
  {
    path: "auth",
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "social",
        children: [
          {
            path: "facebook",
            element: <Facebook />,
          },
          {
            path: "linkedin",
            element: <Linkedin />,
          },
        ],
      },
      {
        path: "planning",
        element: <Planning />,
      },
      {
        path: "feeds",
        element: <Feeds />,
      },
      {
        path: "create",
        element: <Create />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "notifications",
      },
      {
        path: "notes",
      },
      {
        path: "reception",
      },
      {
        path: "conversation",
      },
      {
        path: "stats",
      },
      {
        path: "comptes",
      },
      {
        path: "team",
      },
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
    ],
  },
];
