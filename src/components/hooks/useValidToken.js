import { useState, useEffect } from "react";
import axiosPrivet from "./axiosPrivet";
import { removeCookie, accessToken } from "./useCookies";

const useValidToken = (user) => {
  const [tokenLoading, setTokenLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const email = user?.email || user?.user?.email;

  useEffect(() => {
    if (email) {
      (async () => {
        try {
          setTokenLoading(true);
          const { data } = await axiosPrivet.get(`login/isValidToken`);
          setIsValidToken(data?.admin === true || data?.admin === "true");
        } catch (error) {
          if (
            error?.response?.status === 401 ||
            error?.response?.status === 403
          ) {
            removeCookie(accessToken);
          }
          setIsValidToken(false);
        } finally {
          setTokenLoading(false);
        }
      })();
    }
  }, [email]);

  return [isValidToken, tokenLoading];
};

export default useValidToken;
