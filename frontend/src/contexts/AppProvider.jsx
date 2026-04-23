import { AuthProvider } from "./authContext";
import { CommentProvider } from "./commentContext";
import { PostProvider } from "./postContext";

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <PostProvider>
        <CommentProvider>{children}</CommentProvider>
      </PostProvider>
    </AuthProvider>
  );
};

export default AppProvider;
