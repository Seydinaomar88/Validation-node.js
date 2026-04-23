import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { usePosts } from "../contexts/postContext";
import toast from "react-hot-toast";

const ModalPost = () => {
  const [error, setError] = useState("");
  const [postData, setPostData] = useState({ title: "", content: "" });

  const { addPosts } = usePosts();

  const handlePosts = async (e) => {
    e.preventDefault();

    if (!postData.title.trim() || !postData.content.trim()) {
      setError("Tous les champs sont requis");
      return;
    }

    try {
      setError("");

      const res = await addPosts(postData);
      console.log("Post ajouté avec succès :", res);
      setPostData({ title: "", content: "" });
      await document.getElementById("my_modal_2").close();
      toast.success("post ajouté avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      setError(error.response?.data?.message || "Une erreur est survenue");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  return (
    <dialog id="my_modal_2" className="modal bg-black/20 backdrop-blur-sm">
      <div className="modal-box bg-white rounded-2xl shadow-xl max-w-lg p-0">
        <div className="flex justify-between items-center border-b border-gray-100 px-6 py-4">
          <h3 className="font-bold text-xl text-gray-800">
            Créer un nouveau post
          </h3>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <form method="dialog">
            <button className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors focus:outline-none">
              <X size={20} />
            </button>
          </form>
        </div>

        <form onSubmit={handlePosts} className="p-6 flex flex-col gap-5">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Titre du post
            </label>
            <input
              id="title"
              type="text"
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
              placeholder="Ex: Mon premier atelier Node.js"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-gray-800 outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Contenu
            </label>
            <textarea
              id="content"
              value={postData.content}
              onChange={(e) =>
                setPostData({ ...postData, content: e.target.value })
              }
              placeholder="De quoi voulez-vous discuter ?"
              rows="5"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-gray-800 outline-none transition-all resize-none placeholder:text-gray-400"
            ></textarea>
          </div>

          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => document.getElementById("my_modal_2").close()}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md transition-all"
            >
              Publier
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button className="cursor-default">close</button>
      </form>
    </dialog>
  );
};

export default ModalPost;
