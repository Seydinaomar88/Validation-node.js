import React, { useState } from "react";
import { Search, Trash2, Ban, CheckCircle, User } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Sarah Dev",
      email: "sarah.devn@gmail.com",
      role: "Admin",
      status: "Actif",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      id: 2,
      name: "Marc Dubois",
      email: "marc@marcdubois.com",
      role: "Utilisateur",
      status: "Actif",
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: 3,
      name: "Sophie Laurent",
      email: "sophielaurent@gmail.com",
      role: "Modérateur",
      status: "Inactif",
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: 4,
      name: "Sophie Laurent",
      email: "sophielaurent@gmail.com",
      role: "Modérateur",
      status: "Inactif",
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: 5,
      name: "Sophie Laurent",
      email: "sophielaurent@gmail.com",
      role: "Modérateur",
      status: "Inactif",
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: 6,
      name: "Sophie Laurent",
      email: "sophielaurent@gmail.com",
      role: "Modérateur",
      status: "Inactif",
      color: "bg-purple-100 text-purple-700",
    },
  ]);

  const handleDelete = (userId) => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer cet utilisateur définitivement ?",
      )
    ) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers((users) =>
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user,
      ),
    );
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec titre et recherche */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Gestion des Utilisateurs
        </h1>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
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
                <th className="px-6 py-4">Utilisateur</th>
                <th className="px-6 py-4">Rôle</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${user.color}`}
                      >
                        <User size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800 text-base">
                          {user.name}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <select
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }
                      value={user.role}
                      defaultValue="Color scheme"
                      className={`text-sm select w-30 select-accent font-medium rounded-md px-2 py-1.5 border border-transparent hover:border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-100 outline-none cursor-pointer transition-all ${
                        user.role === "Admin"
                          ? "text-red-600 bg-red-50"
                          : user.role === "Modérateur"
                            ? "text-purple-600 bg-purple-50"
                            : "text-blue-600 bg-blue-50"
                      }`}
                    >
                      <option>Utilisateur</option>
                      <option>Admin</option>
                    </select>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        user.status === "Actif"
                          ? "bg-green-50 text-green-600 border-green-200"
                          : "bg-gray-100 text-gray-500 border-gray-200"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className={`p-2 rounded-lg transition-colors ${
                          user.status === "Actif"
                            ? "text-orange-400 hover:text-orange-600 hover:bg-orange-50"
                            : "text-green-500 hover:text-green-700 hover:bg-green-50"
                        }`}
                        title={
                          user.status === "Actif"
                            ? "Désactiver le compte"
                            : "Réactiver le compte"
                        }
                      >
                        {user.status === "Actif" ? (
                          <Ban size={18} />
                        ) : (
                          <CheckCircle size={18} />
                        )}
                      </button>

                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer l'utilisateur"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              Aucun utilisateur trouvé.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
