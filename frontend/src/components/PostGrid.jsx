import React, { useEffect } from "react";
import PostCard from "./PostCard";
import Pagination from "./Pagination";
import { usePosts } from "../contexts/postContext";

const PostGrid = () => {
  const { posts, fetchPosts } = usePosts();
  console.log(posts);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="bg-bgGray px-10 mt-33 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">
        Explorez les publications récents
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {posts.map((post, index) => (
          <PostCard
            key={index}
            title={post.title}
            body={post.content}
            initialLikes={post.likes.length}
            comments={post.comments}
            post={post._id}
          />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default PostGrid;
