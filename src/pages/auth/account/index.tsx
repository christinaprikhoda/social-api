import { Navigate, useParams } from "react-router-dom";
import { useHttpQuery } from "../../../helpers/useHttp";
import { IAccount, IResponse } from "../../../helpers/types";
import { AccountHeader } from "./components/account-header";
import { AccountContext } from "./context";
import { Gallery } from "../profile/components/gallery";

export const Account = () => {
  const { id } = useParams();
  const { data, loading, error, refetch } = useHttpQuery<IResponse>("/account/" + id);

  if (loading) {
    return (
      <div className="w-full bg-gray-900 min-h-screen p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-48 bg-gray-800 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <Navigate to="/profile" />;
  }

  const account: IAccount | null = data.payload ? (data.payload as IAccount) : null;
  if (!account) return null;

  const canViewContent = !account.isPrivate || account.connection?.following;

  return (
    <div className="w-full bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <AccountContext.Provider value={{ account, refetch }}>
          <AccountHeader />
          
          {!canViewContent ? (
            <div className="mt-6 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-8 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                    <svg 
                      className="w-8 h-8 text-gray-400" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 15v2m0 0v2m0-2h2m-2 0H8m4-6V4" 
                      />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">
                      This Account is Private
                    </h3>
                    <p className="text-gray-400">
                      Follow this account to see their photos and videos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Gallery />
          )}
        </AccountContext.Provider>
      </div>
    </div>
  );
};