import React, { useState } from "react";
import { Trash2, Eye, Heart, MessageSquare, Search } from "lucide-react";

const GestionPost = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: "Sarah Dev",
        avatar: "S",
        color: "bg-yellow-400 text-white",
      },
      title: "Comment optimiser React en 2024 ?",
      likes: 145,
      comments: 32,
      date: "Aujourd'hui, 10:30",
    },
    {
      id: 2,
      author: {
        name: "Marc Dubois",
        avatar: "M",
        color: "bg-blue-500 text-white",
      },
      title: "Mon premier voyage solo au Japon",
      likes: 89,
      comments: 15,
      date: "Hier, 14:15",
    },
    {
      id: 3,
      author: {
        name: "Sophie Laurent",
        avatar: "S",
        color: "bg-purple-500 text-white",
      },
      title: "Les meilleures applications de productivité",
      likes: 210,
      comments: 45,
      date: "12 Oct 2023",
    },
    {
      id: 4,
      author: {
        name: "Alexandre",
        avatar: "A",
        color: "bg-green-500 text-white",
      },
      title: "Recette Facile : Crêpes Moelleuses",
      likes: 12,
      comments: 3,
      date: "10 Oct 2023",
    },
  ]);

  const handleDelete = (idToRemove) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce post ?",
    );
    if (confirmDelete) {
      setPosts(posts.filter((post) => post.id !== idToRemove));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Posts</h1>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Rechercher un post..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all text-sm"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Auteur</th>
                <th className="px-6 py-4">Titre du post</th>
                <th className="px-6 py-4 text-center">Likes</th>
                <th className="px-6 py-4 text-center">Commentaires</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${post.author.color}`}
                    >
                      {post.author.avatar}
                    </div>
                    <span className="font-medium text-gray-800">
                      {post.author.name}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800 truncate max-w-[200px] lg:max-w-xs">
                      {post.title}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1.5 text-gray-600">
                      <Heart size={16} className="text-pink-500" />
                      <span className="font-medium">{post.likes}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1.5 text-gray-600">
                      <MessageSquare size={16} className="text-blue-500" />
                      <span className="font-medium">{post.comments}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">{post.date}</td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Voir le post"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer le post"
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
              Aucun post n'a été trouvé.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GestionPost;
