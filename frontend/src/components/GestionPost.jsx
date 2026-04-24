import React, { useEffect, useState } from "react";
import { Trash2, Eye, Heart, MessageSquare, Search } from "lucide-react";
import apiClient from "../services/apiClient";

const GestionPost = () => {
  const [posts, setPosts] = useState([]);

  // FETCH POSTS ADMIN
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await apiClient.get("/admin/posts");
        setPosts(res.data);
      } catch (error) {
        console.log(error);
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
      await apiClient.delete(`/admin/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Gestion des Posts
        </h1>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Rechercher un post..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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

              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-50">

                  {/* AUTHOR */}
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-xs">
                      {post.author?.name?.charAt(0)}
                    </div>

                    <span className="font-medium text-gray-800">
                      {post.author?.name}
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

                      <button
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Voir"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(post._id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

            </tbody>
          </table>

          {posts.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              Aucun post trouvé
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default GestionPost;