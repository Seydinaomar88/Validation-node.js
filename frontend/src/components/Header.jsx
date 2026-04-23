import { PlusCircle } from "lucide-react";
import React from "react";
import ModalPost from "./ModalPost";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex fixed z-50 top-0 w-full flex-col  items-center   ">
      <div className="flex justify-between w-full p-4 bg-white border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 cursor-pointer">
            My Blog
          </h1>
        </div>

        <div className="flex gap-6 ">
          <Link to={"/dashboard"}>
            <h1 className="text-gray-600 text-lg hover:text-black font-medium cursor-pointer transition-colors">
              Login
            </h1>
          </Link>

          <h1 className="text-gray-600 text-lg hover:text-black font-medium cursor-pointer transition-colors">
            Register
          </h1>
        </div>
      </div>
      <div className="bg-bgGray w-full flex justify-end p-3 pr-4">
        <button
          onClick={() => document.getElementById("my_modal_2").showModal()}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1"
        >
          <PlusCircle size={20} />
          <span>Ajouter un post</span>
        </button>{" "}
      </div>
      <ModalPost />
    </header>
  );
};

export default Header;
