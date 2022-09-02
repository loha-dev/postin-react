import SignIn from "./pages/shared/auth/sign-in";
import SignUp from "./pages/shared/auth/sign-up";
import ForgotPassword from "./pages/shared/auth/forgot-password";
export const routes = [
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
  {
    path: "/",
  },
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
];
