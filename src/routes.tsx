import SignIn from "./pages/shared/auth/sign-in"
import SignUp from "./pages/shared/auth/sign-up"
import ForgotPassword from "./pages/shared/auth/forgot-password"
import Facebook from "./pages/shared/facebook/facebook"
import Planning from "./pages/shared/planning/planning"
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
    path: "facebook",
    element: <Facebook />,
  },
  {
    path: "manager",
  },
  {
    path: "Planning",
    element: <Planning />
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
]
