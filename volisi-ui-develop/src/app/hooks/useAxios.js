import { useCallback } from "react";
import axiosClient from "../../util/axiosClient";

const useAxios = () => {
  const request = useCallback(
    async (method, endpoint, requestData, includeToken = false) => {
      try {
        const config = {};
        if (includeToken) {
          const token = localStorage.getItem("token");
          if (!token || token.trim() === "") {
            throw new Error("No valid token found. Please log in.");
          }

          const tokenExpiryTime = localStorage.getItem("tokenExpiryTime");
          const currentTime = new Date().getTime();

          if (currentTime > tokenExpiryTime) {
            throw new Error("Token has expired. Please log in again.");
          }

          config.headers = {
            Authorization: `Bearer ${token}`,
          };
        }
        const response = await axiosClient({
          method,
          url: endpoint,
          ...(method === "get"
            ? { params: requestData }
            : { data: requestData }),
          ...config,
        });
        if (response && response.data) {
          return response.data;
        } else {
          throw new Error("Invalid response data");
        }
      } catch (error) {
        throw error;
      }
    },
    []
  );

  const get = useCallback(
    (endpoint, params, includeToken = false) => {
      return request("get", endpoint, params, includeToken);
    },
    [request]
  );

  const post = useCallback(
    (endpoint, data, includeToken = false) => {
      return request("post", endpoint, data, includeToken);
    },
    [request]
  );

  const put = useCallback(
    (endpoint, data, includeToken = false) => {
      return request("put", endpoint, data, includeToken);
    },
    [request]
  );

  const del = useCallback(
    (endpoint, includeToken = false) => {
      return request("delete", endpoint, null, includeToken);
    },
    [request]
  );

  const patch = useCallback(
    (endpoint, data, includeToken = false) => {
      return request("patch", endpoint, data, includeToken);
    },
    [request]
  );

  return { get, post, put, del, patch };
};

export default useAxios;
