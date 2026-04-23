import { AlertCircle, Heart, MessageSquare, Users } from "lucide-react";
import StatCard from "./StatCard";

const Overview = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Vue d'ensemble</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Utilisateurs totaux"
          value="2,841"
          icon={<Users />}
          colorClass="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Total des Likes"
          value="120k+"
          icon={<Heart />}
          colorClass="bg-pink-50 text-pink-600"
        />
        <StatCard
          title="Commentaires"
          value="45,109"
          icon={<MessageSquare />}
          colorClass="bg-green-50 text-green-600"
        />
        <StatCard
          title="Total des Posts"
          value="45,109"
          icon={<MessageSquare />}
          colorClass="bg-green-50 text-green-600"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Nouveaux membres</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-3">Utilisateur</th>
                <th className="px-6 py-3">Rôle</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    M
                  </div>
                  <span className="font-medium text-gray-800">Marc Dubois</span>
                </td>
                <td className="px-6 py-4">Utilisateur</td>
                <td className="px-6 py-4">Aujourd'hui, 10:23</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    En ligne
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium text-gray-800">
                    Sophie Laurent
                  </span>
                </td>
                <td className="px-6 py-4 text-purple-600 font-medium">
                  Modérateur
                </td>
                <td className="px-6 py-4">Hier, 18:45</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    Hors ligne
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
