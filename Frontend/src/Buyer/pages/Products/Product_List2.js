import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import useFetch from "../../../useFetch";

const ProductList = ({ products }) => {

    const [product, setProduct] = useState(products);
    const [search, setSearch] = useState(products);
    const [isFilterEffect, setIsfilteredEffect] = useState(false);
    // console.log(isFilterEffect);
    // filter products

    // const FilterResult = (havecategory) => {
    //     const result = products.filter((curData) => {
    //         return curData.category === havecategory.toUpperCase();
    //     });
    //     setIsfilteredEffect(isFilterEffect => !isFilterEffect);
    //     setProduct(result);
        
    // }
    // const { error, isPending, data: filterproducts } = useFetch('http://localhost:8000/products/category' + category.toUpperCase());

    // const {error, isPending, data: filterproducts} = useFetch('http://localhost:8000/products/category/SWEATSHIRT');
    // console.log(filterproducts);   
    const [filteredProducts, setFilteredProducts] = useState([]);

    const FilterResult = async (categoryname) => {
      const category = categoryname.toUpperCase();
      console.log('test1');
      try {
        const response = await fetch("http://localhost:8000/products/category/" + category, {
          method: 'GET',
        });
        const response_Data = await response.json(); 
        console.log(response_Data);
        setFilteredProducts(response_Data);
        setIsfilteredEffect(isFilterEffect => !isFilterEffect);
      } catch (err) {
        console.log(err);
      }
      console.log(filteredProducts);
    };



    //search products
    const searchProducts = products.filter((product) => {
        if (
            product.tags.toLowerCase().includes(search) ||
            product.listing_name.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search)
        ) {

            // console.log(product);
            return product;
        }
    })
    return (
        <>
            {/* <h2 className="text-center text-info">Browse Thrift Shops</h2> */}

            {/* filter */}

            <div className="container-fluid mx-2">
                <div className="row mt-5 mx-2">
                    <div className="col-md-3">
                        {/* //Filter or Search Products */}
                        <Form className="d-flex">
                            <Form.Control
                                type="input"
                                placeholder="Search for clothes"
                                className="me-2"
                                aria-label="Search"
                                onChange={(e) => {
                                    setSearch(e.target.value.toLowerCase());
                                }}
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        <h2 className="mt-2 text">Filter Clothes</h2>
                        <button className="btn btn-outline-dark w-100 mb-4" onClick={() => FilterResult('sweatshirt')}>Sweatshirt</button>
                        <button className="btn btn-outline-dark w-100 mb-4" onClick={() => FilterResult('top')}>Top</button>
                        <button className="btn btn-outline-dark w-100 mb-4" onClick={() => FilterResult('pants')}>Pants</button>
                        <button className="btn btn-outline-dark w-100 mb-4" onClick={() => FilterResult('accessories')}>Accessories</button>
                        <button className="btn btn-outline-dark w-100 mb-4" onClick={() => setProduct(products)}>All</button>
                    </div>

                    <div className="col-md-9">
                        <div className="row">

                            {/* display products */}
                            {/* the first thriftshop is from the usestate thriftshop */}
                            
                            {isFilterEffect ? ( filteredProducts &&
                                filteredProducts.map((product) => {
                                    const{id, listing_name, product_price, product_image, product_brand} = product;
                                    return(
                                    <>
                                    
                                      <div key={id} className="col-md-3 mb-4" >
                                        
                                          <Link to={`/products/${id}`} style={{ textDecoration: 'none', color: '#000000' }}>
                                            <div className="card" style={{ height: "350px", width: "200px"}}>
                                              <div className = "card-body">
                                                {/* <img src = {Product_image} className = "card-img-top"></img> */}
                                                <img src={product_image} className="card-img-top"></img>
                                                <h6 className = "card-title">{product_brand}</h6>
                                                <h5 className = "card-title">{listing_name}</h5>
                                                <h5 className = "card-title">${product_price}</h5>
                                              </div>
                                            </div>
                                          </Link>
                                      </div>
                                    </>
                                  )})
                                ) : (product && 
                                    searchProducts.map((product) => {
                                        const { id, listing_name, product_price, product_image, product_brand } = product;
                                        return (
                                            <>
                                    
                                                <div key={id} className="col-md-3 mb-4" >
                                    
                                                    <Link to={`/products/${id}`} style={{ textDecoration: 'none', color: '#000000' }}>
                                                        <div className="card" style={{ height: "350px", width: "200px" }}>
                                                            <div className="card-body">
                                                                <img src={product_image} className="card-img-top"></img>
                                                                <h6 className="card-title">{product_brand}</h6>
                                                                <h5 className="card-title">{listing_name}</h5>
                                                                <h5 className="card-title">${product_price}</h5>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </>
                                        )
                                    
                                    
                                    })
                                 )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ProductList;