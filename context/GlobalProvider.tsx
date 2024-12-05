import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { GetCurrentUser } from "../lib/appwrite";

type globalContextType = {
  islogged: boolean;
  setIslogged: React.Dispatch<SetStateAction<boolean>>;
  user: any;
  setUser: React.Dispatch<SetStateAction<any>>;
  loading: boolean;
};

const GlobalContext = createContext<globalContextType>({} as globalContextType);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [islogged, setIslogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetCurrentUser()
      .then((res) => {
        if (res) {
          setIslogged(true);
          setUser(res);
        } else {
          setIslogged(false);
          setUser(null);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        islogged,
        setIslogged,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
