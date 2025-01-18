import { Http } from "../../../../helpers/api";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../../helpers/constans";
import { Post } from "./post";
import { useOutletContext, useParams } from "react-router-dom";
import { IContext } from "../../../../helpers/types";

interface IPosts {
  id: string;
  picture: string;
  title: string;
}

interface IPostsResponse extends IPosts {
  payload: IPosts[];
}

interface IProfileResponse extends IPosts {
  payload: {
    posts: IPosts[];
  };
}

export const Gallery = () => {
  const { user, refetch } = useOutletContext<IContext>();
  const [data, setData] = useState<IPosts[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();

  const isOwnProfileId = !id || user?.id.toString() === id;

  const endpoint = isOwnProfileId ? "/posts" : `/account/${id}`;
  console.log("Fetching from endpoint:", endpoint);

  const fetchPosts = async () => {
    if(isOwnProfileId){
      const res = await Http.get<IPostsResponse>(endpoint);
      setData([...res.data.payload.reverse()])
    } else {
      const res = await Http.get<IProfileResponse>(endpoint);
      setData([...res.data.payload.posts.reverse()])
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [id, isOwnProfileId]);

  useEffect(() => {
    fetchPosts();
  }, [refetch]);

  const handleDelete = (id: string) => {
    if (isOwnProfileId) {
      setData(data.filter((post) => post.id !== id));
    }
  };

  if (isLoading) {
    return (
      <div className="w-full bg-gray-900 p-8 text-center">
        <div className="animate-pulse flex justify-center">
          <div className="text-gray-400 text-lg font-medium">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-900 py-8">
      <div className="grid grid-cols-1 gap-6 px-8">
        {data?.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            picture={post.picture}
            title={post.title}
            baseUrl={BASE_URL}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};
