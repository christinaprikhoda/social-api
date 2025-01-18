import { useContext } from "react";
import { AccountContext } from "../context";
import { BASE_URL } from "../../../../helpers/constans";
import { ActionButton } from "./action-button";

export const AccountHeader = () => {
 const context = useContext(AccountContext);
 if (!context) throw new Error("Out of provider");

 const { account } = context;

 return (
   <div className="w-full bg-gray-900 p-6 rounded-lg shadow-lg">
     <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
       <div className="relative">
         {account.picture ? (
           <img 
             src={BASE_URL + account.picture}
             className="w-32 h-32 rounded-full border-4 border-indigo-600 object-cover shadow-xl"
             alt={`${account.name}'s profile`}
           />
         ) : (
           <div className="w-32 h-32 rounded-full bg-gray-800 border-4 border-indigo-600 flex items-center justify-center shadow-xl">
             <span className="text-gray-400 text-2xl">
               {account.name[0]}{account.surname[0]}
             </span>
           </div>
         )}
       </div>

       <div className="flex-1 text-center md:text-left">
         {/* Name */}
         <h1 className="text-2xl font-bold text-white mb-4">
           {account.name} {account.surname}
         </h1>

         {/* Stats */}
         <div className="flex items-center justify-center md:justify-start gap-8 mb-6">
           <div className="flex flex-col items-center md:items-start">
             <span className="text-indigo-400 font-semibold">
               {account.followers?.length || 0}
             </span>
             <span className="text-gray-400 text-sm">Followers</span>
           </div>
           <div className="flex flex-col items-center md:items-start">
             <span className="text-indigo-400 font-semibold">
               {account.following?.length || 0}
             </span>
             <span className="text-gray-400 text-sm">Following</span>
           </div>
           <div className="flex flex-col items-center md:items-start">
             <span className="text-indigo-400 font-semibold">
               { 0}
             </span>
             <span className="text-gray-400 text-sm">Posts</span>
           </div>
         </div>

         {/* Action Button */}
         <ActionButton />
       </div>
     </div>
   </div>
 );
};