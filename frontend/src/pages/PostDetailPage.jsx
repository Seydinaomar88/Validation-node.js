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
import toast from "react-hot-toast";

const PostDetailPage = () => {
  const [content, setContentInput] = useState("");

  const { id } = useParams();

  const { comments, fetchComments, addComments } = useComment();
  console.log(comments);

  useEffect(() => {
    fetchComments(id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Veuillez saisir un commentaire.");
      return;
    }

    try {
      const res = await await addComments({ content, post: id });

      toast.success("Commentaire ajouté");
      fetchComments(id);
      console.log(res);
      setContentInput("");
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de l'envoi");
    }
  };

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

          <form className="flex gap-4 items-start">
            <UserCircle size={40} className="text-gray-300 shrink-0 mt-1" />
            <div className="grow relative">
              <textarea
                value={content}
                onChange={(e) => setContentInput(e.target.value)}
                placeholder="Ajouter un commentaire constructif..."
                rows="3"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-gray-800 outline-none transition-all resize-none placeholder:text-gray-400"
                required
              ></textarea>
              <button
                onClick={handleSubmit}
                type="submit"
                className="absolute bottom-4 right-4 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center shadow-sm disabled:opacity-50"
                disabled={!content.trim()}
              >
                <SendHorizontal size={20} />
              </button>
            </div>
          </form>

          <div className="space-y-8">
            {comments.map((comment) => (
              <div key={comment._id} className="flex items-start gap-4">
                <div className="grow bg-gray-50 flex justify-between rounded-2xl p-5 border border-gray-100">
                  <div className="flex items-center justify-between gap-5 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-200 shadow-sm mt-1">
                      <User size={20} />
                    </div>
                    <div>
                      <span className="font-bold text-gray-800 text-lg">
                        {comment.author?.name || "Anonyme"}
                      </span>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                  <span className="text-md text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
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
