import { useContext } from "react";
import { AccountContext } from "../context";
import { METHODS, useHttpMutation } from "../../../../helpers/useHttp";
import { IResponse } from "../../../../helpers/types";

export const ActionButton: React.FC = () => {
  const context = useContext(AccountContext);

  if (!context) throw new Error("Out of provider");

  const { account, refetch } = context;
  const { following, followsMe, requested } = account.connection;

  const [makeRequest, error] = useHttpMutation<IResponse>(refetch);

  const handleRequest = () => {
    if (following) {
      makeRequest("/account/unfollow/" + account.id, METHODS.POST);
    } else {
      makeRequest("/account/follow/" + account.id, METHODS.POST);
    }
  };

  return (
    <>
      <button onClick={handleRequest} className="p-2 bg-indigo-500">
        {following
          ? "unfollow"
          : followsMe
          ? "follow back"
          : requested
          ? "cancel"
          : "follow"}
      </button>
    </>
  );
};
