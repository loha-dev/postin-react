import SignIn from "./pages/shared/auth/sign-in";
import SignUp from "./pages/shared/auth/sign-up";
import ForgotPassword from "./pages/shared/auth/forgot-password";
import MainLayout from "./pages/shared/layout/z-layout";
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
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
      },
      {
        path: "super-admin",
      },
      {
        path: "admin",
      },
      {
        path: "client",
      },
      {
        path: "manager",
      },
    ],
  },
];
