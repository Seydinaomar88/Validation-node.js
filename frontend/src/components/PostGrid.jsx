/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import Pagination from "./Pagination";
import { usePosts } from "../contexts/postContext";

const PostGrid = () => {
  const { posts, currentPage, totalPages, fetchPosts, changePage } = usePosts();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await fetchPosts();
      } catch (error) {
        console.error("Erreur lors du chargement des posts", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handlePageChange = (newPage) => {
    changePage(newPage);
  };

  return (
    <div className="bg-bgGray px-10 mt-20 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">
        Explorez les publications récentes
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-xl text-gray-500 animate-pulse">
            Chargement des posts...
          </p>
        </div>
      ) : posts && posts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500 text-lg">
            Aucune publication pour le moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post) => (
            <PostCard
              key={post._id}
              post={post._id} // l'id pour les actions API et le modal
              title={post.title}
              body={post.content}
              initialLikes={post.likes?.length || 0}
              comments={post.comments}
            />
          ))}
        </div>
      )}

      {!isLoading && posts && posts.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default PostGrid;
