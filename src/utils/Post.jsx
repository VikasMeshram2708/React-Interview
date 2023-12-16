import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Loader from "./Loader";

const BASE_URI = "https://jsonplaceholder.typicode.com/posts";

const Post = () => {
  const [post, setPost] = useState("");
  const [fetchPost, setFetchingPost] = useState(true);
  const urlParams = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(BASE_URI + `/${urlParams?.id}`);

      const result = await response.json();
      console.log(result);
      setPost(result);
      setFetchingPost(false);
      //   if (result) {
      //   }
    };
    fetchPost();
  }, []);

  return (
    <div>
      {/* BreadCrumps */}
      <div className="text-sm breadcrumbs">
  <ul>
    <li><a href="/">Home</a></li> 
    <li><a href="">{post?.title}</a></li> 
  </ul>
</div>

      <div className="hero min-h-screen bg-base-200">
        {fetchPost ? (
          <Loader />
        ) : (
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div>
              <h1 className="text-5xl font-bold">{post?.title}</h1>
              <p className="py-6">{post?.body}</p>
              <Link to="/">
                <button className="btn btn-primary">Get Back</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
