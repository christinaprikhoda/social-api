import { useOutletContext } from "react-router-dom";
import { IContext } from "../../../helpers/types";
import { ProfileHeader } from "./components/profile-header";
import { Feed } from "./components/feed";
import { Search } from "./components/search";
export const Profile = () => {
  const { user } = useOutletContext<IContext>();
  return (
    user && (
      <>
        <ProfileHeader />
        <Search />
        <Feed />
      </>
    )
  );
};
