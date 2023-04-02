import ProductList from "./Product_List";
import useFetch from "../../../useFetch";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import  { useEffect } from "react";
import Cart from "../Cart/Cart2";


const BrowseProducts = () => {
  const { error, isPending, data: products } = useFetch('http://localhost:8000/products')


  return (
    <div className="user_home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {products && <ProductList products={products}/>}
    </div>
  );
}

export default BrowseProducts;