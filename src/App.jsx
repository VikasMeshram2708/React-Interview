import React from "react";
import Posts from "./utils/Posts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from "./utils/Post";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<h1 className="text-center text-3xl py-24">Sorry Requestion URL Not Found!</h1>} />
        <Route path="/" element={<Posts />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
