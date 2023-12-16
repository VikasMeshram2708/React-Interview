import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const BASE_URI = "https://jsonplaceholder.typicode.com/posts";
const POST_PER_PAGE = 10;

const Posts = () => {
  const [fetching, setFetching] = useState(true);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const fetcPosts = async () => {
      const response = await fetch(BASE_URI);
      const result = await response.json();
      setPosts(result);
      setFetching(false);
    };
    fetcPosts();

    setDisabled(page <= 1);
  }, [page]);

  const subSet = () => {
    const startIndex = (page - 1) * POST_PER_PAGE;
    const endIndex = startIndex + POST_PER_PAGE;
    return posts?.slice(startIndex, endIndex);
  };

  const loadNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const loadPrevious = () => {
    console.log("prev clicked");
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  // console.log(subSet());

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-semibold text-white mb-8">
        Latest Posts
      </h1>

      {fetching && <Loader />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subSet()?.map((post) => (
          <div key={post?.id} className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">{post?.id}</h2>
            <Link to={`/post/${post?.id}`}>
              <h2 className="text-xl font-semibold mb-4">{post?.title}</h2>
            </Link>
            <p className="text-gray-700">{post?.body}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-5">
        <button
          onClick={loadPrevious}
          type="button"
          disabled={disabled}
          className={`bg-red-500 text-white font-semibold rounded-md px-4 py-2 ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Previous
        </button>
        <button
          onClick={loadNext}
          type="button"
          className="bg-green-500 text-white font-semibold rounded-md px-4 py-2 "
        >
          Load Next
        </button>
      </div>
    </div>
  );
};

export default Posts;
