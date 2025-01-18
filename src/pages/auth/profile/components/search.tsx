import { useEffect, useState } from "react";
import { useHttpQuery } from "../../../../helpers/useHttp";
import { IResponse, IUser } from "../../../../helpers/types";
import { BASE_URL } from "../../../../helpers/constans";
import { Link } from "react-router-dom";
import { useDebounce } from "../../../../helpers/useDebounce";

export const Search = () => {
  const [text, setText] = useState("");
  const query = useDebounce<string>(text, 500);
  const { data, loading, setData, error, refetch } = useHttpQuery<IResponse>(
    "/search/" + text,
    false
  );

  const users: IUser[] | null = data ? (data.payload as IUser[]) : null;

  useEffect(() => {
    if (!query) return setData({ status: "", payload: [] } as IResponse);
    refetch();
  }, [query]);

  return (
    <div className="p-4 bg-gray-900 rounded-lg">
      <h3 className="text-xl font-semibold text-gray-200 mb-4">
        Search for friends
      </h3>
      <div className="relative mb-6">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Search for friend"
          className="w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
        />
      </div>
      <div>
        {loading && <p className="text-gray-400">Loading...</p>}
        {error && <p className="text-red-400">{error}</p>}
        {users && users.length > 0 && (
          <p className="text-gray-400 mb-3 text-sm">Results</p>
        )}
        <div className="space-y-3">
          {users?.map((user) => (
            <Link
              to={`/profile/${user.id}`}
              key={user.id}
              className="block hover:no-underline"
            >
              <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors duration-200">
                <img
                  src={
                    user.picture
                      ? BASE_URL + user.picture
                      : "https://cdn0.iconfinder.com/data/icons/complete-common-version-2-4/1024/user4-2-512.png"
                  }
                  alt={`${user.name}'s profile`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="text-gray-200 text-sm">
                  {user.name} {user.surname}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
