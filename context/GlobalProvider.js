import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        if (!user) {
          setUser(null);
          setIsLoggedIn(false);
          return;
        } else {
          setUser(user);
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {
        setIsLoading(false);
      })
  }, []);

  return (
    <GlobalContext.Provider value={{ 
      user, setUser,
      isLoggedIn, setIsLoggedIn,
      isLoading
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;