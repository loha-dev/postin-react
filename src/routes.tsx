import SignIn from "./pages/shared/auth/sign-in"
import SignUp from "./pages/shared/auth/sign-up"
import ForgotPassword from "./pages/shared/auth/forgot-password"
import MainLayout from "./pages/shared/layout/z-layout"
import Facebook from "./pages/shared/facebook/facebook"
import Planning from "./pages/shared/planning/planning"
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
        element: <div>'🫠'</div>,
      },
      {
        path: "facebook",
        element: <Facebook />,
      },
      {
        path: "planning",
        element: <Planning />
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
]
