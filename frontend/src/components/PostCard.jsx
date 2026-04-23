import React, { useState } from "react";
import { Heart, UserCircle, SendHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

const PostCard = ({ title, body, initialLikes = 0 }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-full">
      <div className="p-6 pb-0 grow">
        <div className="flex justify-between items-start">
          <h1 className="text-xl line-clamp-1 font-bold text-gray-800 leading-tight">
            {title}
          </h1>
          <button
            onClick={handleLike}
            className="flex items-center gap-1.5 p-2 bg-pink-50 rounded-full text-pink-500 hover:bg-pink-100 transition-colors"
          >
            <Heart
              size={20}
              className={`${likes > 0 ? "fill-pink-500" : ""}`}
            />
            <span className="font-semibold text-sm">{likes}</span>
          </button>
        </div>
        <p className="mt-3 text-gray-600 leading-relaxed line-clamp-2">
          {body}
        </p>
      </div>

      <hr className="my-5 border-gray-100" />

      <div className="px-6 pb-6 mt-auto">
        <form className="relative mb-5 flex items-center gap-3">
          <div className="grow relative">
            <input
              type="text"
              placeholder="Ajouter un commentaire..."
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-200 text-sm placeholder:text-gray-400"
            />
          </div>
          <button
            type="submit"
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center aspect-square"
          >
            <SendHorizontal size={20} />
          </button>
        </form>

        <div className="space-y-4">
          <Link to={"/pageDetails"}>
            <button className="text-sm cursor-pointer text-blue-600 hover:text-blue-800 transition-colors font-medium">
              Voir les commentaires
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
