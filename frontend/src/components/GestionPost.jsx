import React, { useEffect, useState } from "react";
import { Trash2, Eye, Heart, MessageSquare, Search } from "lucide-react";
import apiClient from "../services/apiClient";

const GestionPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [search, setSearch] = useState("");

  // FETCH POSTS
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get("/posts"); // ✅ corrigé
        setPosts(res.data);
      } catch (error) {
        console.log("Erreur fetch posts :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // DELETE POST
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce post ?"
    );

    if (!confirmDelete) return;

    try {
      await apiClient.delete(`/posts/${id}`); // ✅ corrigé
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (error) {
      console.log("Erreur delete :", error);
    }
  };

  // FILTER SEARCH
  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Gestion des Posts
        </h1>

        {/* SEARCH */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Rechercher un post..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Chargement...
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full text-left text-sm text-gray-600">

              <thead className="bg-gray-50 text-gray-500 border-b">
                <tr>
                  <th className="px-6 py-4">Auteur</th>
                  <th className="px-6 py-4">Titre</th>
                  <th className="px-6 py-4 text-center">Likes</th>
                  <th className="px-6 py-4 text-center">Commentaires</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredPosts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50">

                    {/* AUTHOR */}
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-xs">
                        {post.author?.name?.charAt(0) || "?"}
                      </div>
                      <span className="font-medium text-gray-800">
                        {post.author?.name || "Inconnu"}
                      </span>
                    </td>

                    {/* TITLE */}
                    <td className="px-6 py-4">
                      <p className="font-medium truncate max-w-[200px]">
                        {post.title}
                      </p>
                    </td>

                    {/* LIKES */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Heart size={16} className="text-pink-500" />
                        <span>{post.likes?.length || 0}</span>
                      </div>
                    </td>

                    {/* COMMENTS */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <MessageSquare size={16} className="text-blue-500" />
                        <span>{post.comments?.length || 0}</span>
                      </div>
                    </td>

                    {/* DATE */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">

                        {/* VIEW */}
                        <button
                          onClick={() => setSelectedPost(post)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Eye size={18} />
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>

            {filteredPosts.length === 0 && (
              <div className="p-10 text-center text-gray-500">
                Aucun post trouvé
              </div>
            )}

          </div>
        )}
      </div>

      {/* MODAL DETAILS POST */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-2xl rounded-xl p-6 space-y-4">

            <h2 className="text-xl font-bold">{selectedPost.title}</h2>

            <p className="text-gray-600">{selectedPost.content}</p>

            {/* LIKES */}
            <div className="flex items-center gap-2">
              <Heart className="text-pink-500" />
              <span>{selectedPost.likes?.length || 0} likes</span>
            </div>

            {/* COMMENTS */}
            <div>
              <h3 className="font-semibold mb-2">Commentaires</h3>

              {selectedPost.comments?.length > 0 ? (
                selectedPost.comments.map((c) => (
                  <div key={c._id} className="border-b py-2">
                    <p className="text-sm">{c.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Aucun commentaire</p>
              )}
            </div>

            {/* CLOSE */}
            <button
              onClick={() => setSelectedPost(null)}
              className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg"
            >
              Fermer
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default GestionPost;