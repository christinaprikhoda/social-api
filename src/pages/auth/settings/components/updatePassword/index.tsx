import { SubmitHandler, useForm } from "react-hook-form";
import { METHODS, useHttpMutation } from "../../../../../helpers/useHttp";
import { IResponse } from "../../../../../helpers/types";
import { useNavigate } from "react-router-dom";

interface IPasswordUpdate {
  old: string;
  newpwd: string;
}

export const UpdatePassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IPasswordUpdate>();

  const [postNewPassword] = useHttpMutation<IResponse, null>(() =>
    navigate("/profile")
  );

  const onSubmit: SubmitHandler<IPasswordUpdate> = (data) => {
    postNewPassword("/update/password", METHODS.PATCH, data);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-white text-center">
          Update Password
        </h2>
        <p className="text-gray-400 text-center mt-2">
          Please enter your old and new passwords
        </p>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          {errors.old && <p className="text-red-400">{errors.old.message}</p>}

          <div className="mb-4">
            <label
              htmlFor="old-password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Old Password
            </label>
            <input
              type="password"
              id="old"
              placeholder="Enter your old password"
              {...register("old", {
                required: "Old password is required",
              })}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errors.newpwd && (
            <p className="text-red-400">{errors.newpwd.message}</p>
          )}
          <div className="mb-6">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              placeholder="Enter your new password"
              {...register("newpwd", {
                required: "New password is required",
              })}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
