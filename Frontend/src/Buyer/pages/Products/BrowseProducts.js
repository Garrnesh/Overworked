import ProductList from "./Product_List";
import useFetch from "../../../useFetch";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import  { useEffect } from "react";

const BrowseProducts = () => {
  const { error, isPending, data: products } = useFetch('http://localhost:8000/products')
  // const [authenticated, setauthenticated] = useState(null);
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("authenticated");
  //   if (loggedInUser) {
  //     setauthenticated(loggedInUser);
  //   }
  // }, []);
  // if(!authenticated){
  //   return <Navigate replace to = "/" />;
  // }
  return (
    <div className="user_home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {products && <ProductList products={products} />}
    </div>
  );
}

export default BrowseProducts;