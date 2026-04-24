import React, { useState, useEffect } from "react";
import { Heart, UserCircle, SendHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { useComment } from "../contexts/commentContext";
import toast from "react-hot-toast";
import { usePosts } from "../contexts/postContext";
import ModalDetailsPost from "./ModalDetailsPost";

const PostCard = ({ post, title, body, initialLikes = 0 }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [content, setContent] = useState("");
  const { likePosts } = usePosts();

  const handleLike = async () => {
    try {
      const res = await likePosts(post);
      setLikes(res.likesCount);
      setLiked(res.liked);
    } catch (error) {
      console.log(error);
    }
  };

  const { addComments } = useComment();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Veuillez saisir un commentaire.");
      return;
    }

    try {
      const res = await addComments({ content, post });
      toast.success("Commentaire ajouté");
      console.log(res);
      setContent("");
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de l'envoi");
    }
  };
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && post.likes?.includes(user.id)) {
      setLiked(true);
    }
  }, [post]);

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-full">
        {/* ... le reste de ton JSX ... */}
      </div>
      <ModalDetailsPost postId={post} modalId={`my_modal_${post}`} />
    </>
  );
};

export default PostCard;