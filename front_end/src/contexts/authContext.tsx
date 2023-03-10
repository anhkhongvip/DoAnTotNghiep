import { createContext, useContext, useState } from "react";
import { AuthContextType } from "../@types/auth";
import useAuth from "../hooks/useAuth";
const AuthContext = createContext<AuthContextType | null>(null);
function AuthProvider(props: any) {
  let tokenUser: string = localStorage.getItem("token") || "";
  const [token, setToken] = useState<string>(tokenUser);
  const [account, setAccount] = useAuth(token);
  const value = { account, setAccount, token, setToken };
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}

function useAuthentication() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuthentication must be used within a AuthContext");
  return context;
}

export { AuthProvider, useAuthentication };
