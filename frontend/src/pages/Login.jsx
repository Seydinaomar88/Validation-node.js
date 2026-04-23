import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const freshUser = await login(userData);

      const role = freshUser?.user?.role || freshUser?.role;

      if (freshUser && freshUser.token) {
        localStorage.setItem("token01", freshUser.token);
      }

      if (role === "admin") {
        navigate("/dashboard");
      } else if (role === "user") {
        navigate("/home");
      } else {
        toast.error("Rôle non reconnu");
        return;
      }
    } catch (error) {
      const serverMessage =
        error.response?.data?.message || "Erreur lors de la connexion";

      console.error("Détails de l'erreur 400 :", error.response?.data);

      toast.error(serverMessage);
    }
  };

  return (
    <div className="mx-auto mt-20 max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
        Inscription
      </h2>

      <form onSubmit={handleLogin} className="space-y-6">
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

        <button
          type="submit"
          className="mt-3 w-full cursor-pointer rounded-md bg-gray-900 py-3 font-bold text-white transition-colors hover:bg-black"
        >
          {loading ? "Connexion en cours..." : "Connexion"}
        </button>

        <p className="text-center">
          Pas un compte ?{" "}
          <Link to={"/register"}>
            <span className="cursor-pointer font-medium text-red-600">
              S'inscrivez-vous
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
