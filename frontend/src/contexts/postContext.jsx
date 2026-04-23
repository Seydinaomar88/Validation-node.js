/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import apiClient from "../services/apiClient";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const addPosts = async (postData) => {
    try {
      const response = await apiClient.post("/posts/", postData);
      setPosts(response.data);
      return response.data;
    } catch (error) {
      console.log("Erreur lors de l'ajout du post :", error);
      throw error;
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await apiClient.get("/posts/");
      setPosts(response.data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Erreur fetch posts :", error);
      throw error;
    }
  };

  const likePosts = async (postId) => {
    try {
      const response = await apiClient.post(`/posts/${postId}/like`);
      setPosts(response.data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Erreur fetch posts :", error);
      throw error;
    }
  };

  return (
    <PostContext.Provider value={{ posts, addPosts, fetchPosts, likePosts }}>
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
