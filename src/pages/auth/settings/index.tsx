import { Link, Outlet } from "react-router-dom";

export const Settings = () => {
  return (
    <div className="h-full flex">
      <nav className="pt-4 pl-4">
        <div className="flex flex-col gap-3">
          <Link to="updatelogin" className="text-pink-300">
            Update Login
          </Link>
          <Link to="updatepassword" className="text-pink-300">
            Update Password
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};