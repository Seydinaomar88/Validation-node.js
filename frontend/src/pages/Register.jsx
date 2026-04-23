import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, useAuth } from "../contexts/authContext";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { user, register } = useAuth();
  console.log("ress : ", user);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!userData.name || !userData.email || !userData.password) {
      toast.error("tous les champs sont requis");
      return;
    }
    try {
      const res = await register(userData);
      console.log(res);
      toast.success("votre compte a été crées");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto mt-20 max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
        Inscription
      </h2>

      <form onSubmit={handleRegister} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            type="text"
            className="mt-1 w-full rounded-md border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="baba der"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            type="email"
            className="mt-1 w-full rounded-md border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ton@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>

          <div className="relative">
            <input
              type="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              placeholder="password"
              className="mt-1 w-full rounded-md border border-gray-300 p-3 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            ></button>
          </div>
        </div>

        <div>
          <h1 className="text-center font-medium text-red-600"></h1>
        </div>

        <button
          type="submit"
          className="mt-3 w-full cursor-pointer rounded-md bg-gray-900 py-3 font-bold text-white transition-colors hover:bg-black"
        >
          S'inscrire
        </button>

        <p className="text-center">
          deja un compte ?{" "}
          <Link to={"/"}>
            <span className="cursor-pointer font-medium text-red-600">
              Connectez-vous
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
