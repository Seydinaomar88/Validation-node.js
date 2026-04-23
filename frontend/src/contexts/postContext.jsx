/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import apiClient from "../services/apiClient";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const addPosts = async () => {
    try {
      const response = await apiClient.post("/posts/");
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PostContext.Provider value={{ user, addPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePosts doit être utilise dans PostContext");
  }
  return context;
};
