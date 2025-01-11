import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login";
import { Signup } from "../pages/signup";
import { Layout } from "../pages/auth/layout";
import { Profile } from "../pages/auth/profile";
import { Settings } from "../pages/auth/settings";
import { UpdateLogin } from "../pages/auth/settings/components/updateLogin";
import { UpdatePassword } from "../pages/auth/settings/components/updatePassword";
export const routes = createBrowserRouter([
  { path: "", element: <Login /> },
  { path: "signup", element: <Signup /> },
  {
    path: "profile",
    element: <Layout />,
    children: [
      { path: "", element: <Profile /> },
      {
        path: "settings",
        element: <Settings />,
        children: [
          { path: "updatelogin", element: <UpdateLogin /> },
          { path: "updatepassword", element: <UpdatePassword /> },
        ],
      },
    ],
  },
]);
