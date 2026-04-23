import React, { useState } from "react";
import {
  ArrowLeft,
  Heart,
  MessageSquare,
  SendHorizontal,
  UserCircle,
  MoreVertical,
} from "lucide-react";

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
  const [comments, setComments] = useState(postData.comments);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim()) {
      const newComment = {
        id: comments.length + 1,
        author: "Vous",
        avatar: (
          <UserCircle size={28} className="text-gray-300 flex-shrink-0" />
        ),
        text: commentInput,
        date: "à l'instant",
      };
      setComments([newComment, ...comments]);
      setCommentInput("");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen ">
      <main className="max-w-6xl mx-auto p-3 space-y-5">
        <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <header className="space-y-6">
            <h1 className="text-xl lg:text-3xl font-extrabold text-gray-900 leading-tight">
              {postData.title}
            </h1>
            <div className="flex items-center justify-between gap-4 border-y border-gray-100 py-6">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${postData.author.color}`}
                >
                  {postData.author.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-800">
                    {postData.author.name}
                  </p>
                  <p className="text-sm text-gray-500">{postData.date}</p>
                </div>
              </div>
            </div>
          </header>

          <div className="mt-5 prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
            <p className="text-xl font-medium text-gray-800 leading-relaxed">
              {postData.body.split("\n")[1]}
            </p>
            {postData.body
              .split("\n\n")
              .slice(1)
              .map((paragraph, index) => (
                <p key={index}>{paragraph.trim()}</p>
              ))}
          </div>

          <footer className="mt-7 pt-5 border-t border-gray-100 flex items-center gap-6">
            <button
              onClick={handleLike}
              className="group flex items-center gap-2.5 px-3 py-2 bg-pink-50 text-pink-600 rounded-full hover:bg-pink-100 transition-colors"
            >
              <Heart
                size={20}
                className={`transition-transform group-hover:scale-110 ${likes > postData.likes ? "fill-pink-600" : ""}`}
              />
              <span className="font-bold text-md">{likes}</span>
              <span className="text-sm">J'aime</span>
            </button>
            <div className="flex items-center gap-2.5 text-gray-600">
              <MessageSquare size={22} />
              <span className="font-bold text-lg">{comments.length}</span>
              <span className="text-sm">Commentaires</span>
            </div>
          </footer>
        </article>

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
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-4">
                {typeof comment.avatar === "string" ? (
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${comment.color}`}
                  >
                    {comment.avatar}
                  </div>
                ) : (
                  comment.avatar
                )}
                <div className="grow bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-gray-800 text-sm">
                      {comment.author}
                    </span>
                    <span className="text-xs text-gray-400">
                      {comment.date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {comment.text}
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
