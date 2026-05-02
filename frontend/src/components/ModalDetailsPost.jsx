import React, { useEffect, useState } from "react";
import { usePosts } from "../contexts/postContext";
import { Pencil, Trash2, Save, X } from "lucide-react";
import { useAuth } from "../contexts/authContext";

const ModalDetailsPost = ({ postId, modalId }) => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const { fetchPostById, updatePosts, deletePosts } = usePosts();
  const { user } = useAuth();

  // user contient { success, message, user: { id, name... }, token }
  // On extrait proprement l'id
  const currentUserId = user?.user?.id;
  const isAuthor = currentUserId && post && currentUserId === post.author._id;

  useEffect(() => {
    if (!postId) return;
    const loadPost = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPostById(postId);
        setPost(data);
        setEditTitle(data.title);
        setEditContent(data.content);
        setIsEditing(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPost();
  }, [postId]);

  const handleUpdate = async (id) => {
    try {
      const data = { title: editTitle, content: editContent };
      await updatePosts({ data, id });
      setPost((prev) => ({
        ...prev,
        title: editTitle,
        content: editContent,
      }));
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePosts(postId);
      document.getElementById(modalId).close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box relative">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        {isLoading ? (
          <p className="animate-pulse text-gray-500">Chargement...</p>
        ) : post ? (
          <>
            {isEditing ? (
              <div className="flex flex-col gap-3 mt-4">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-600"
                />
              </div>
            ) : (
              <>
                <h3 className="font-bold text-lg mt-4">{post.title}</h3>
                <p className="py-4 text-gray-600">{post.content}</p>
              </>
            )}

            {isAuthor && (
              <div className="flex justify-between mt-6">
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-500 text-sm font-medium rounded-lg transition-colors"
                >
                  <Trash2 size={15} />
                  Supprimer
                </button>

                {isEditing ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                    >
                      <X size={15} />
                      Annuler
                    </button>
                    <button
                      onClick={() => handleUpdate(postId)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <Save size={15} />
                      Enregistrer
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <Pencil size={15} />
                    Modifier
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-400">Aucun post trouvé.</p>
        )}
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ModalDetailsPost;