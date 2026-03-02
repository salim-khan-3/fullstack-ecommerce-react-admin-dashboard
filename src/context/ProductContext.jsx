import { createContext, useEffect, useState } from "react";
import { deleteProduct, getAllProducts, getProductsByCategory } from "../api/productApi";

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


   const productDeleteFunc = async (id) => {
    setLoading(true);
    try {
      await deleteProduct(id); // database থেকে delete
      setProducts((prev) => prev.filter((p) => p._id !== id)); // UI থেকে remove
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  return (
    <ProductContext.Provider value={{ products, loading ,fetchProducts,productDeleteFunc,setProducts}}>
      {children}
    </ProductContext.Provider>
  );
};
