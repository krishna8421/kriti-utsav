import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface IUser {
  username: string;
  name: string;
  state: string;
}

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const token = Cookies.get("token");
      if (!token) {
        setUser(null);
        setIsAuth(false);
        return;
      }
      try {
        const res = await axios.get("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          setUser(res.data);
          setIsAuth(true);
        }
      } catch (err) {
        Cookies.remove("token");
        setUser(null);
        setIsAuth(false);
        router.push("/");
        return;
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  return { isAuth, user, isLoading };
};
