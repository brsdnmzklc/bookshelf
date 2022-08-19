import React, {useEffect, useState} from 'react';
import axios from 'axios';

const useFetch = (url, headers) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url, {headers: headers});
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return {data, loading, error};
};

export default useFetch;
