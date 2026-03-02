// import { useContext } from "react";
// import { ProductContext } from "../context/ProductContext";

import { useContext } from "react";
import { ProductContext } from "../ProductContext";

export const useProducts = () => useContext(ProductContext);