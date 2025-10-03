import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "../context";
import { localStorageKeys } from "../constants/local-storage";
import { actions } from "../constants/actions";

import { useApi } from "./use-api";

export const useAuth = ({ onAuth = false, onUnauth = false }) => {
  const { state, dispatch } = useAppContext();
  const { getRequest } = useApi();
  const navigate = useNavigate();

  

  const userDetails = state.user?.details;

  useEffect(() => {
    const getUser = async () => {
      try {

        const res = await getRequest("auth");
        if (res?.data) {
          dispatch({
            type: actions.UPDATE_USER,
            payload: {
              details: res.data.user,
              token: res.data.token,
            },
          });
          if (!res.data.user.isVerified) {
            navigate("/unverified");
          } else if (onAuth) {
            navigate(onAuth);
          }
        }
      } catch (err) {
        localStorage.removeItem(localStorageKeys.AUTH_TOKEN);
        navigate("/login");
      }
    };

    if (!userDetails) {
      const token = localStorage.getItem(localStorageKeys.AUTH_TOKEN);

      if (token) {
        getUser();
      } else if (onUnauth) {
        
        navigate(onUnauth);
      }
    } else if (!userDetails.isVerified) {
      navigate("/unverified");
    } else if (onAuth) {
      navigate(onAuth);
    }
  }, [userDetails]);
};
