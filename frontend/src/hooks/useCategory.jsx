import { useState, useEffect } from "react";
import axios from "axios";
import { environment } from "../environment";

export default function useCategory() {
  const apiUrl = environment.apiUrl;

  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/category/get-category`);
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return categories;
}
