import { AuthProvider } from "./authContext";
import { PostProvider } from "./postContext";

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <PostProvider>{children}</PostProvider>
    </AuthProvider>
  );
};

export default AppProvider;
