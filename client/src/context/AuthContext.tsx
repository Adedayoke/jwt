import { createContext, ReactNode, useState } from "react";

interface AuthContextInterface {
  auth?: any;
  setAuth?: (value: any) => void;
}
export const AuthContext = createContext<AuthContextInterface>({});

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [auth, setAuth] = useState({});
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
