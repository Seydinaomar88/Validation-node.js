import React from "react";
import { Menu, Home, Settings, Users, FileText, User2Icon } from "lucide-react"; // Nos icônes propres

const Sidebar = ({ children, pageActive, setPageActive }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content  bg-gray-50 flex flex-col min-h-screen">
        <nav className="w-full bg-white border-b justify-between lg:justify-end border-gray-100 flex items-center py-3 px-8 shadow-sm">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-square btn-ghost lg:hidden mr-2"
          >
            <Menu size={24} className="text-gray-700" />
          </label>
          <div className="flex gap-3 items-center">
            <User2Icon size={30} />
            <div className="text-xl flex flex-col font-bold text-gray-800">
              <span>Baba der</span>
              <span className="text-green-600 text-sm">en ligne</span>
            </div>
          </div>
        </nav>

        <main className="flex-1 p-6">{children}</main>
      </div>

      <div className="drawer-side z-50">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="flex flex-col min-h-full w-64 bg-white border-r border-gray-100 shadow-sm text-gray-700">
          <div className="p-5 border-b border-gray-100 hidden lg:block">
            <h2 className="text-2xl font-black text-black ">Dashboard Admin</h2>
          </div>

          <ul className="menu p-5 w-full gap-2 flex-1">
            <li>
              <button
                onClick={() => setPageActive("overview")}
                className={`flex gap-3 text-[17px] font-medium rounded-lg px-4 py-3 transition-colors ${
                  pageActive === "overview"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Home size={25} />
                Vue d'ensemble
              </button>
            </li>
            <li>
              <button
                onClick={() => setPageActive("posts")}
                className={`flex gap-3 text-[17px] font-medium rounded-lg px-4 py-3 transition-colors ${
                  pageActive === "posts"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <FileText size={25} />
                Gestion des Posts
              </button>
            </li>
            <li>
              <button
                onClick={() => setPageActive("users")}
                className={`flex gap-3 text-[17px] font-medium rounded-lg px-4 py-3 transition-colors ${
                  pageActive === "users"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Users size={25} />
                Utilisateurs
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
