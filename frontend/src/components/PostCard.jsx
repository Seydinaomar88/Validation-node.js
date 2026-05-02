import React, { useState, useEffect } from "react";
import { Heart, UserCircle, SendHorizontal } from "lucide-react";
import { useComment } from "../contexts/commentContext";
import toast from "react-hot-toast";
import { usePosts } from "../contexts/postContext";
import ModalDetailsPost from "./ModalDetailsPost";

const PostCard = ({ post, title, body, initialLikes = 0, comments }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [content, setContent] = useState("");
  const { likePosts } = usePosts();
  const { addComments } = useComment();

  // post ici est juste un _id (string), donc on ne peut pas faire post.likes
  // L'état liked est géré via la réponse de l'API uniquement
  const handleLike = async () => {
    try {
      const res = await likePosts(post);
      setLikes(res.likesCount);
      setLiked(res.liked);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Veuillez saisir un commentaire.");
      return;
    }
    try {
      await addComments({ content, post });
      toast.success("Commentaire ajouté");
      setContent("");
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de l'envoi");
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-full">
        {/* Header */}
        <div className="p-5 flex-1">
          <div className="flex items-center gap-2 mb-3">
            <UserCircle size={32} className="text-gray-400" />
            <span className="text-sm text-gray-500">Auteur</span>
          </div>

          <h2 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
            {title}
          </h2>
          <p className="text-gray-600 text-sm line-clamp-3">{body}</p>
        </div>

        {/* Footer actions */}
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
          {/* Like */}
          <button
            onClick={handleLike}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            <Heart
              size={18}
              className={liked ? "fill-red-500 text-red-500" : ""}
            />
            <span>{likes}</span>
          </button>

          {/* Commentaires + voir détails */}
          <button
            onClick={() =>
              document.getElementById(`my_modal_${post}`).showModal()
            }
            className="text-sm text-blue-600 hover:underline"
          >
            Voir le post
          </button>
        </div>

        {/* Formulaire commentaire */}
        <form
          onSubmit={handleSubmit}
          className="px-5 py-3 border-t border-gray-100 flex gap-2"
        >
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Ajouter un commentaire..."
            className="flex-1 text-sm px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
          />
          <button
            type="submit"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <SendHorizontal size={18} />
          </button>
        </form>
      </div>

      <ModalDetailsPost postId={post} modalId={`my_modal_${post}`} />
    </>
  );
};

export default PostCard;