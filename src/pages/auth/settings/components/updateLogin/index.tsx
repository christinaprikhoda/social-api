import { SubmitHandler, useForm } from "react-hook-form";
import { METHODS, useHttpMutation } from "../../../../../helpers/useHttp";
import { useNavigate } from "react-router-dom";

interface ILoginUpdate {
  password: string;
  login: string;
}

export const UpdateLogin = () => {

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginUpdate>();

  const [postNewLogin] = useHttpMutation<ILoginUpdate>(() => navigate("/profile"));

  const onSubmit: SubmitHandler<ILoginUpdate> = (data) => {
    postNewLogin("/update/login", METHODS.PATCH, data);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-white text-center">
          Update Login
        </h2>
        <p className="text-gray-400 text-center mt-2">
          Please enter your old and new login
        </p>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          {errors.password && (
            <p className="text-red-400">{errors.password.message}</p>
          )}

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errors.login && (
            <p className="text-red-400">{errors.login.message}</p>
          )}
          <div className="mb-6">
            <label
              htmlFor="login"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              New Login
            </label>
            <input
              type="text"
              id="login"
              placeholder="Enter your new login"
              {...register("login", {
                required: "New login is required",
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
