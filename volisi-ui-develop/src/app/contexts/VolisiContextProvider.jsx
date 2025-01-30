import { useEffect, useState } from "react";
import VolisiContext from "./VolisiContext";
import useAxios from "../hooks/useAxios";
import { API_ENDPOINT } from "../../constants/constants";
const VolisiContextProvider = ({ children }) => {
  const { get } = useAxios();
  const [folders, setFolders] = useState([]);
  const userId = localStorage.getItem("userId");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("Quiz");
  const [isMove, setIsMove] = useState(false);

  const fetchFolders = () => {
    if (!userId) return;
    get(`${API_ENDPOINT.COLLECTION}/user/${userId}`, null, true)
      .then((response) => {
        setFolders(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching folders:", error);
        setFolders([]);
      });
  };
  useEffect(() => {
    fetchFolders();
  }, [setFolders]);

  return (
    <VolisiContext.Provider
      value={{
        folders,
        setFolders,
        fetchFolders,
        selectedOption,
        setSelectedOption,
        searchQuery,
        setSearchQuery,
        isMove,
        setIsMove,
      }}
    >
      {children}
    </VolisiContext.Provider>
  );
};

export default VolisiContextProvider;
