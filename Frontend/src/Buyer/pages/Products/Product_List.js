import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import useFetch from "../../../useFetch";

const ProductList = ({ products }) => {

    const [items, setItems] = useState(products); //items
    // const [search, setSearch] = useState(products);
    const [q, setQ] = useState("");
    const [searchParam] = useState(["tags", "listing_name", "category"]); //if any thing falls under this attributes
    // const [isFilterEffect, setIsfilteredEffect] = useState(false);

    const [filteredProducts, setFilteredProducts] = useState(["All"]);

    function search(items) {
        return items.filter((item) => {
            //FILTER PRODUCTS
            if (item.category.toUpperCase() == filteredProducts) {
                console.log(item.product_name, item.category);
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString().
                            toUpperCase()
                            .indexOf(q.toUpperCase()) > -1
                    );
                });
            }
            //search products 
            else if (filteredProducts == "All") {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString().
                            toUpperCase()
                            .indexOf(q.toUpperCase()) > -1
                    );
                });
            }
        });
    }


    return (
        <>
            {/* <h2 className="text-center text-info">Browse Thrift Shops</h2> */}

            {/* filter */}

            <div className="container-fluid mx-2">
                <div className="row mt-5 mx-2 align-items-center">
                    <div className="col-md-9">
                        {/* //Filter or Search Products */}
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search for clothes"
                                className="me-2 search-input"
                                aria-label="Search"
                                value={q}
                                onChange={(e) => {
                                    setQ(e.target.value.toUpperCase());
                                }}
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        </div>
                        <div className="col-sm-3">
                        <select class="form-select" aria-label="Default select example" onChange={(e) => setFilteredProducts(e.target.value)}>

                            <option value="All">Filter by Category</option>
                            <option value="SWEATSHIRT">Sweatshirt</option>
                            <option value="TOP">Top</option>
                            <option value="DRESS">Dress</option>
                            <option value="ACCESSORIES">Accessories</option>
                        </select>
                    </div>
                    </div>
                    <div className="row mt-5 mx-2 align-items-center">
                    <div className="col-md-12">
                        <div className="row">

                            {/* display products */}
                            {/* the first thriftshop is from the usestate thriftshop */}

                            {
                                search(items).map((product) => {
                                    const { id, listing_name, product_price, product_image, product_brand } = product;
                                    return (
                                        <>

                                            <div key={id} className="col-md-3 mb-4" >

                                                <Link to={`/products/${id}`} style={{ textDecoration: 'none', color: '#000000' }}>
                                                    <div className="card" style={{ height: "550px", width: "400px" }}>
                                                        <div className="card-body">
                                                            {/* <img src = {Product_image} className = "card-img-top"></img> */}
                                                            <img src={product_image} className="card-img-top" style={{width: "100%", height: "40vh", objectFit: 'contain'}}></img>
                                                            <p></p>
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
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ProductList;

