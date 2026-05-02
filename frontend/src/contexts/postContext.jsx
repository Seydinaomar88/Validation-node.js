/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import apiClient from "../services/apiClient";

export const PostContext = createContext();

const POSTS_PER_PAGE = 9;

export const PostProvider = ({ children }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const paginate = (allData, page) => {
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    setPosts(allData.slice(start, end));
    setCurrentPage(page);
  };

const fetchPosts = async () => {
  try {
    const response = await apiClient.get("/posts/");
    console.log("response.data :", response.data); // ← vérifiez ici
    
    const allData = Array.isArray(response.data)
      ? response.data
      : response.data.posts ?? [];

    setAllPosts(allData);
    setTotalPages(Math.ceil(allData.length / POSTS_PER_PAGE));
    paginate(allData, 1);
    return allData;
  } catch (error) {
    console.log("Erreur fetch posts :", error);
    throw error;
  }
};

  const changePage = (page) => {
    paginate(allPosts, page);
  };

  const addPosts = async (postData) => {
    try {
      const response = await apiClient.post("/posts/", postData);
      const newPost = response.data;
      const updatedAll = [newPost, ...allPosts];
      setAllPosts(updatedAll);
      setTotalPages(Math.ceil(updatedAll.length / POSTS_PER_PAGE));
      paginate(updatedAll, currentPage);

      return newPost;
    } catch (error) {
      console.log("Erreur lors de l'ajout du post :", error);
      throw error;
    }
  };

  // Version fusionnée de likePosts (garde la mise à jour locale de HEAD)
  const likePosts = async (postId) => {
    try {
      const response = await apiClient.post(`/posts/${postId}/like`);

      // Mise à jour locale propre (de HEAD)
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p._id === postId
            ? {
                ...p,
                likes: response.data.likesCount 
                  ? Array(response.data.likesCount).fill(0)
                  : p.likes,
                liked: response.data.liked
              }
            : p
        )
      );

      // Aussi mettre à jour allPosts
      setAllPosts((prevAll) =>
        prevAll.map((p) =>
          p._id === postId
            ? {
                ...p,
                likes: response.data.likesCount 
                  ? Array(response.data.likesCount).fill(0)
                  : p.likes,
                liked: response.data.liked
              }
            : p
        )
      );

      return response.data;
    } catch (error) {
      console.log("Erreur like :", error);
      throw error;
    }
  };

  // Fonctions de la branche entrante (à garder)
  const fetchPostById = async (postId) => {
    try {
      const response = await apiClient.get(`/posts/${postId}`);
      console.log("lll", response.data);
      return response.data;
    } catch (error) {
      console.log("Erreur fetch post by id :", error);
      throw error;
    }
  };

  const updatePosts = async ({ data, id }) => {
    try {
      const response = await apiClient.put(`/posts/${id}`, data);
      const updatedPost = response.data;

      const updatedAll = allPosts.map((p) =>
        p._id === id ? { ...p, ...updatedPost } : p,
      );
      setAllPosts(updatedAll);

      paginate(updatedAll, currentPage);

      return updatedPost;
    } catch (error) {
      console.log("Erreur sur updatePosts :", error);
      throw error;
    }
  };

  const deletePosts = async (id) => {
    try {
      await apiClient.delete(`/posts/${id}`);

      const updatedAll = allPosts.filter((p) => p._id !== id);
      setAllPosts(updatedAll);
      setTotalPages(Math.ceil(updatedAll.length / POSTS_PER_PAGE));

      paginate(updatedAll, currentPage);

      return true;
    } catch (error) {
      console.log("Erreur sur deletePosts :", error);
      throw error;
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        allPosts,
        currentPage,
        totalPages,
        fetchPosts,
        changePage,
        addPosts,
        likePosts,
        fetchPostById,
        updatePosts,
        deletePosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePosts doit être utilisé dans PostContext");
  }
  return context;
};