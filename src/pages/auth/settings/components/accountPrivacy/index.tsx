import { useEffect, useState } from "react";
import { Http } from "../../../../../helpers/api";

interface IUserResponse {
  user: {
    isPrivate: number
  }
}

export const AccountPrivacy = () => {
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  useEffect(() => {

    const fetPrivacyStatus = async () => {
      const res = await Http.get<IUserResponse>("/verify")
      console.log(res)
      setIsPrivate(Boolean(res.data.user.isPrivate))
    }

    fetPrivacyStatus()
  }, [])

  const handlePrivacy =  async() => {
    await Http.patch("/account/set", {isPrivate: !isPrivate ? 1 : 0})
    setIsPrivate(!isPrivate)
  }

  return (
    <div className="w-full bg-gray-900 p-6 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-gray-100">Account Privacy</h3>
          <p className="text-sm text-gray-400">
            Make your account private or public
          </p>
        </div>

        {/* Switch Button */}
        <button
          onClick={handlePrivacy}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full 
            transition-colors duration-300 focus:outline-none
            ${isPrivate ? "bg-blue-600" : "bg-gray-700"}
          `}
        >
          <span className="sr-only">Toggle privacy</span>
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white 
              transition-transform duration-300 ease-in-out
              ${isPrivate ? "translate-x-6" : "translate-x-1"}
            `}
          />
        </button>
      </div>

      {/* Status Text */}
      <p className="mt-2 text-sm text-gray-500">
        Status: {isPrivate ? "Private Account" : "Public Account"}
      </p>
    </div>
  );
};
