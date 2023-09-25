import React, { useState, useEffect, createContext, useContext } from "react";


export const LoadingContext = createContext();

export const useLoading = () => {
  return useContext(LoadingContext);
};

export default function LandingLoadingProvider  (props)  {
  const [isLoading, setIsLoading] = useState(true);
  const [areCategoriesLoading, setAreCategoriesLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/products/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories.");
        }
        const data = await response.json();
        setCategories(data);
        setAreCategoriesLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, areCategoriesLoading, setAreCategoriesLoading, categories  }}>
      {props.children}
    </LoadingContext.Provider>
  );
};
