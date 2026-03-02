import { createContext, useEffect, useState } from "react";
import { getAllProducts, getProductsByCategory } from "../api/productApi";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (categoryId = "") => {
    setLoading(true);
    try {
      const data = categoryId
        ? await getProductsByCategory(categoryId)
        : await getAllProducts();
      setProducts(data.data || data);
    } catch (err) {
      console.error("Products fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading ,fetchProducts}}>
      {children}
    </ProductContext.Provider>
  );
};
