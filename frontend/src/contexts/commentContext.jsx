/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import apiClient from "../services/apiClient";

export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const addComments = async (comData) => {
    try {
      const response = await apiClient.post("/comments/", comData);
      setComments((prevComments) => [response.data, ...prevComments]);
      return response.data;
    } catch (error) {
      console.log("Erreur lors de l'ajout du comment :", error);
      throw error;
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await apiClient.get(`/comments/post/${postId}`);
      setComments(response.data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Erreur fetch posts :", error);
      throw error;
    }
  };

  return (
    <CommentContext.Provider value={{ addComments, comments, fetchComments }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useComment = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useComment doit être utilisé dans CommentProvider");
  }
  return context;
};
