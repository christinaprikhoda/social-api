import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login";
import { Signup } from "../pages/signup";
import { Layout } from "../pages/auth/layout";
import { Profile } from "../pages/auth/profile";
import { Settings } from "../pages/auth/settings";
import { UpdateLogin } from "../pages/auth/settings/components/updateLogin";
import { UpdatePassword } from "../pages/auth/settings/components/updatePassword";
import { AccountPrivacy } from "../pages/auth/settings/components/accountPrivacy";
import { Account } from "../pages/auth/account";
import { Following } from "../pages/auth/profile/components/following";
import { Followers } from "../pages/auth/profile/components/followers";
import { Requests } from "../pages/auth/settings/components/requests";
export const routes = createBrowserRouter([
  { path: "", element: <Login /> },
  { path: "signup", element: <Signup /> },
  {
    path: "profile",
    element: <Layout />,
    children: [
      { path: "", element: <Profile /> },
      { path: "following", element: <Following /> },
      { path: "followers", element: <Followers /> },
      {path: "requests", element: <Requests />},
      {
        path: "settings",
        element: <Settings />,
        children: [
          { path: "updatelogin", element: <UpdateLogin /> },
          { path: "updatepassword", element: <UpdatePassword /> },
          { path: "accountprivacy", element: <AccountPrivacy /> },
        ],
      },
      { path: ":id", element: <Account /> },
    ],
  },
]);
