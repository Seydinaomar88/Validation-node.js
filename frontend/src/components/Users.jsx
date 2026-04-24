import React, { useEffect, useState } from "react";
import { Search, Trash2, Ban, CheckCircle, User } from "lucide-react";
import apiClient from "../services/apiClient";
import toast from "react-hot-toast";

const SUPER_ADMIN_EMAIL = "admin@test.com";

const Users = () => {
  const [users, setUsers] = useState([]);

  // ================= FETCH USERS =================
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiClient.get("/admin/users");
        setUsers(res.data);
      } catch (error) {
        toast.error("Erreur chargement utilisateurs");
      }
    };

    fetchUsers();
  }, []);

  // ================= SUPER ADMIN PROTECTION =================
  const isSuperAdmin = (user) => user.email === SUPER_ADMIN_EMAIL;

  const blockedToast = () =>
    toast.error("Action impossible sur le super admin");

  // ================= DELETE =================
  const handleDelete = async (user) => {
    if (isSuperAdmin(user)) return blockedToast();

    if (!window.confirm("Êtes-vous sûr ?")) return;

    try {
      await apiClient.delete(`/admin/users/${user._id}`);
      setUsers(users.filter((u) => u._id !== user._id));
      toast.success("Utilisateur supprimé");
    } catch (error) {
      toast.error("Erreur suppression");
    }
  };

  // ================= ROLE =================
  const handleRoleChange = async (user, newRole) => {
    if (isSuperAdmin(user)) return blockedToast();

    try {
      const res = await apiClient.put(
        `/admin/users/${user._id}/role`,
        { role: newRole }
      );

      setUsers(users.map((u) =>
        u._id === user._id ? res.data : u
      ));

      toast.success("Rôle modifié");
    } catch (error) {
      toast.error("Erreur rôle");
    }
  };

  // ================= BLOCK =================
  const handleToggleBlock = async (user) => {
    if (isSuperAdmin(user)) return blockedToast();

    try {
      const res = await apiClient.put(
        `/admin/users/${user._id}/block`
      );

      setUsers(users.map((u) =>
        u._id === user._id ? res.data.user : u
      ));

      toast.success("Statut mis à jour");
    } catch (error) {
      toast.error("Erreur block");
    }
  };

  // ================= PERMISSIONS =================
  const handlePermissionChange = async (user, permission) => {
    if (isSuperAdmin(user)) return blockedToast();

    try {
      let updated = user.permissions || [];

      updated = updated.includes(permission)
        ? updated.filter((p) => p !== permission)
        : [...updated, permission];

      const res = await apiClient.put(
        `/admin/users/${user._id}/permissions`,
        { permissions: updated }
      );

      setUsers(users.map((u) =>
        u._id === user._id ? res.data : u
      ));

    } catch (error) {
      toast.error("Erreur permissions");
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER (IDENTIQUE DESIGN ORIGINAL) */}
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

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">

            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Utilisateur</th>
                <th className="px-6 py-4">Rôle</th>
                <th className="px-6 py-4">Permissions</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">

                  {/* USER */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">

                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-100 text-blue-700">
                        <User size={20} />
                      </div>

                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800 text-base flex items-center gap-2">
                          {user.name}
                          {isSuperAdmin(user) && (
                            <span className="text-xs text-red-500 font-bold">
                              SUPER ADMIN
                            </span>
                          )}
                        </span>

                        <span className="text-gray-500 text-xs">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* ROLE */}
                  <td className="px-6 py-4">
                    <select
                      disabled={isSuperAdmin(user)}
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user, e.target.value)
                      }
                      className="text-sm font-medium rounded-md px-2 py-1.5 border border-gray-200 focus:border-blue-300 outline-none cursor-pointer"
                    >
                      <option value="user">Utilisateur</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>

                  {/* PERMISSIONS */}
                  <td className="px-6 py-4 text-xs">
                    {["create", "update", "delete", "like", "comment"].map((perm) => (
                      <label key={perm} className="mr-3">
                        <input
                          type="checkbox"
                          disabled={isSuperAdmin(user)}
                          checked={user.permissions?.includes(perm)}
                          onChange={() =>
                            handlePermissionChange(user, perm)
                          }
                        />
                        <span className="ml-1">{perm}</span>
                      </label>
                    ))}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        user.isBlocked
                          ? "bg-red-50 text-red-600 border-red-200"
                          : "bg-green-50 text-green-600 border-green-200"
                      }`}
                    >
                      {user.isBlocked ? "Bloqué" : "Actif"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">

                      {/* BLOCK */}
                      <button
                        disabled={isSuperAdmin(user)}
                        onClick={() => handleToggleBlock(user)}
                        className="p-2 rounded-lg transition-colors disabled:opacity-40"
                      >
                        {user.isBlocked ? (
                          <CheckCircle size={18} />
                        ) : (
                          <Ban size={18} />
                        )}
                      </button>

                      {/* DELETE */}
                      <button
                        disabled={isSuperAdmin(user)}
                        onClick={() => handleDelete(user)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
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