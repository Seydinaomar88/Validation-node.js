import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Heart,
  MessageSquare,
  SendHorizontal,
  UserCircle,
  MoreVertical,
  User,
} from "lucide-react";
import { useComment } from "../contexts/commentContext";
import { useParams } from "react-router-dom";

const PostDetailPage = () => {
  const postData = {
    title: "Comment optimiser React en 2024 ? Les techniques avancées",
    author: {
      name: "Sarah Dev",
      avatar: "S",
      color: "bg-yellow-400 text-white",
    },
    date: "Publié le 15 Octobre 2023 ",
    likes: 145,
    body: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
      at ac erat volutpat, vulputate sollicitudin ligula dictum.
    `,
    comments: [
      {
        id: 1,
        author: "Marc Dubois",
        avatar: "M",
        color: "bg-blue-500 text-white",
        text: "Super article, très clair ! J'ai hâte de tester la nouvelle API.",
        date: "il y a 2h",
      },
      {
        id: 2,
        author: "Sophie Laurent",
        avatar: "S",
        color: "bg-purple-500 text-white",
        text: "Merci pour ces explications détaillées. La partie sur le code splitting est top.",
        date: "il y a 1h",
      },
      {
        id: 3,
        author: "Alexandre",
        avatar: "A",
        color: "bg-green-500 text-white",
        text: "Et pour le Server-Side Rendering, tu conseilles quoi ?",
        date: "il y a 30min",
      },
    ],
  };

  const [likes, setLikes] = useState(postData.likes);
  const [commentInput, setCommentInput] = useState("");
  const [commentss, setComments] = useState(postData.comments);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim()) {
      const newComment = {
        id: commentss.length + 1,
        author: "Vous",
        avatar: (
          <UserCircle size={28} className="text-gray-300 flex-shrink-0" />
        ),
        text: commentInput,
        date: "à l'instant",
      };
      setComments([newComment, ...commentss]);
      setCommentInput("");
    }
  };

  const { id } = useParams();

  const { comments, fetchComments } = useComment();
  console.log("dddd", comments);

  useEffect(() => {
    fetchComments(id);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen ">
      <main className="max-w-6xl mx-auto p-3 space-y-5">
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 space-y-10">
          <div className="flex items-center gap-3">
            <MessageSquare size={26} className="text-gray-400" />
            <h2 className="text-2xl font-bold text-gray-800">
              Commentaires ({comments.length})
            </h2>
          </div>

          <form
            onSubmit={handleCommentSubmit}
            className="flex gap-4 items-start"
          >
            <UserCircle size={40} className="text-gray-300 shrink-0 mt-1" />
            <div className="grow relative">
              <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Ajouter un commentaire constructif..."
                rows="3"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-gray-800 outline-none transition-all resize-none placeholder:text-gray-400"
                required
              ></textarea>
              <button
                type="submit"
                className="absolute bottom-4 right-4 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center shadow-sm disabled:opacity-50"
                disabled={!commentInput.trim()}
              >
                <SendHorizontal size={20} />
              </button>
            </div>
          </form>

          <div className="space-y-8">
            {comments.map((comment, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="grow bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-gray-800 text-sm">
                      {comment.author.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {comment.createdAt}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PostDetailPage;
