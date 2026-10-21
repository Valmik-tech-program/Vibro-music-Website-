import {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");

      if (!savedUser || savedUser === "undefined" || savedUser === "null") {
        return null;
      }

      return JSON.parse(savedUser);
    } catch (error) {
      localStorage.removeItem("user");
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const login = (data) => {
    const safeToken = data?.token || null;
    const safeUser = data?.user
      ? {
          ...data.user,
          name: data.user.name || data.user.username || "User",
        }
      : null;

    if (safeToken) {
      localStorage.setItem("token", safeToken);
      setToken(safeToken);
    }

    if (safeUser) {
      localStorage.setItem("user", JSON.stringify(safeUser));
      setUser(safeUser);
    } else {
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isLoggedIn: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};