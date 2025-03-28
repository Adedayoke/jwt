import { createContext, ReactNode, useState } from "react";


interface AuthContextType {
    auth: any;
    setAuth: (value: any) => void;
}
export const AuthContext = createContext({});

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [auth, setAuth] = useState({});
  return <AuthContext.Provider value={{auth, setAuth}}>{children}</AuthContext.Provider>;
}
