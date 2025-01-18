import { useEffect, useState } from "react";
import { Http } from "../../../../helpers/api";
import { BASE_URL } from "../../../../helpers/constans";

interface IFollowing {
  id: string;
  name: string;
  surname: string;
  picture: string;
}

interface IFollowingResponse {
  payload: IFollowing[];
}

export const Following = () => {
  const [data, setData] = useState<IFollowing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await Http.get<IFollowingResponse>("/following");
      setData(res.data.payload);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full bg-gray-900 min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center py-12 bg-gray-800 rounded-lg shadow-lg">
            <div className="animate-pulse text-gray-400 text-lg font-medium">
              Loading...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">Following</h1>
          <div className="text-sm text-gray-400">
            <span className="text-blue-400 font-semibold">{data.length}</span> people
          </div>
        </div>

        {data.length > 0 ? (
          <div className="space-y-4">
            {data.map((user) => (
              <div 
                key={user.id}
                className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-all duration-300 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full border-2 border-indigo-600 overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={user.picture ? BASE_URL + user.picture : "https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_User-Avatar-Profile-Photo-01-512.png"}
                        alt={`${user.name}'s profile`}
                      />
                    </div>
                    <div>
                      <h2 className="text-white font-semibold text-lg">
                        {user.name} {user.surname}
                      </h2>
                    </div>
                  </div>

                  <button 
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 
                             transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
                  >
                    Following
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-800 rounded-lg shadow-lg">
            <div className="text-gray-400 text-lg font-medium">
              Not following anyone yet
            </div>
            <p className="text-gray-500 mt-2">
              When you follow someone, they'll appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};