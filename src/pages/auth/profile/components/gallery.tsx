import { Http } from "../../../../helpers/api";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../../helpers/constans";
import { Post } from "./post";
import { useOutletContext } from "react-router-dom";
import { IContext } from "../../../../helpers/types";

interface IPosts {
  id: string;
  picture: string;
  title: string;
}

interface IPostsResponse extends IPosts {
  payload: IPosts[];
}

export const Gallery = () => {
  const { refetch } = useOutletContext<IContext>();
  const [data, setData] = useState<IPosts[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPosts = async () => {
    const res = await Http.get<IPostsResponse>("/posts");
    setData(res.data.payload.reverse());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  useEffect(() => {
    fetchPosts();
  }, [refetch]);
  const handleDelete = (id: string) => {
    setData(data.filter((post) => post.id !== id));
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

  console.log(data);

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
