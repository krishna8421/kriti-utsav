import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuth(true);
    }
  }, []);

  return { isAuth };
};
