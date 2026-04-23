// PostGrid.jsx
import React from "react";
import PostCard from "./PostCard"; // Assurez-vous d'avoir ce composant
import Pagination from "./Pagination";

const PostGrid = () => {
  // Données factices pour 6 posts
  const postsData = [
    {
      title: "Mon premier voyage solo au Japon",
      body: "Je partage mes expériences de voyage à travers Tokyo et Kyoto, des temples anciens aux gratte-ciels néon. Une aventure inoubliable...",
      initialLikes: 12,
      comments: [
        {
          author: "Yuki.T",
          text: "Si tu passes par Shinjuku, ne rate pas le Golden Gai!",
        },
        {
          author: "Paul B.",
          text: "Super article! Le Japon est sur ma liste.",
        },
        {
          author: "Sam.L",
          text: "Merci pour les conseils sur les transports.",
        },
      ],
    },
    {
      title: "Excuse",
      body: "Pardon Assane, je n'avais pas l'intention d'annuler si tardivement. Le projet a pris du retard.",
      initialLikes: 0,
      comments: [],
    },
    {
      title: "Recette Facile : Crêpes Moelleuses",
      body: "Pas besoin de balance ! Voici ma recette infaillible pour des crêpes parfaites à chaque coup, prêtes en moins de 30 minutes.",
      initialLikes: 45,
      comments: [
        {
          author: "Claire.M",
          text: "Testé et approuvé ce matin! Merci beaucoup.",
        },
        { author: "Jean D.", text: "Une petite astuce pour la garniture?" },
      ],
    },
    {
      title: "5 plantes d'intérieur faciles à entretenir",
      body: "Même si vous n'avez pas la main verte, ces plantes sont parfaites pour apporter de la vie dans votre salon sans trop d'efforts.",
      initialLikes: 21,
      comments: [
        {
          author: "Lucas.P",
          text: "Le Monstera est mon préféré, très résistant.",
        },
      ],
    },
    {
      title: "Découverte : Les khassaïdes en pdf",
      body: "Un guide complet et des liens de téléchargement gratuit pour des œuvres de référence, maintenant en format numérique pour tout le monde.",
      initialLikes: 3,
      comments: [
        { author: "Marie.L", text: "Très pratique pour les étudier partout." },
      ],
    },
    {
      title: "Les meilleures applications de productivité en 2024",
      body: "Mon top 10 des outils essentiels pour s'organiser et gagner du temps au travail ou dans la vie quotidienne. Vous en connaissez sûrement déjà certains.",
      initialLikes: 33,
      comments: [
        { author: "Nadia.S", text: "Notion est top pour tout centraliser." },
        {
          author: "Alex.R",
          text: "Je viens de tester Obsidian, ça a l'air puissant.",
        },
      ],
    },
  ];

  return (
    <div className="bg-bgGray px-10 mt-33 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">
        Explorez les publications récents
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {postsData.map((post, index) => (
          <PostCard
            key={index}
            title={post.title}
            body={post.body}
            initialLikes={post.initialLikes}
            comments={post.comments}
          />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default PostGrid;
