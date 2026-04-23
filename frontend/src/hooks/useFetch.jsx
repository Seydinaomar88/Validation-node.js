import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await apiClient.post(url);
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.log("error sur useFetch : ", error);
        setLoading(false);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
