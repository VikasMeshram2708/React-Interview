import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const BASE_URI = "https://jsonplaceholder.typicode.com/posts";
const POST_PER_PAGE = 10;

const Posts = () => {
  const [fetching, setFetching] = useState(true);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetcPosts = async () => {
      const response = await fetch(BASE_URI);
      const result = await response.json();
      setPosts(result);
      setFetching(false);
    };

    fetcPosts();
  }, []);

  const subSet = () => {
    const startIndex = (page - 1) * POST_PER_PAGE;
    const endIndex = startIndex + POST_PER_PAGE;
    return posts?.slice(startIndex, endIndex);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // console.log(subSet());

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-semibold text-gray-800 mb-8">
        Latest Posts
      </h1>

      {fetching && <Loader />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subSet()?.map((post) => (
          <div key={post?.id} className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">{post?.title}</h2>
            <p className="text-gray-700">{post?.body}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={loadMore}
          type="button"
          className="bg-blue-500 text-white font-semibold rounded-md px-4 py-2 "
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Posts;
