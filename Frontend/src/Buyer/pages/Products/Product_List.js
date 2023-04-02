import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

const ProductList = ({ products }) => {

    const [product, setProduct] = useState(products);
    const [search, setSearch] = useState(products);

    // filter products
    const filterResult = (havecategory) => {
        const result = products.filter((curData) => {
            return curData.category === havecategory;
        });
        setProduct(result);
    }

    const searchProducts = products.filter((product) => {
        if (
            product.tags.toLowerCase().includes(search) ||
            product.product_name.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search)
        ) {

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
                        <button className="btn btn-outline-dark w-100 mb-4" onClick={() => filterResult('sweatshirt')}>Sweatshirt</button>
                        <button className="btn btn-outline-dark w-100 mb-4" onClick={() => filterResult('blouse')}>Blouse</button>
                        <button className="btn btn-outline-dark w-100 mb-4" onClick={() => filterResult('pants')}>Pants</button>
                        <button className="btn btn-outline-dark w-100 mb-4" onClick={() => filterResult('accessories')}>Accessories</button>
                        <button className="btn btn-outline-dark w-100 mb-4" onClick={() => setProduct(products)}>All</button>
                    </div>

                    <div className="col-md-9">
                        <div className="row">

                            {/* display products */}
                            {/* the first thriftshop is from the usestate thriftshop */}
                            {
                                searchProducts.map((product) => {
                                    const { id, product_name, product_price, product_image, product_brand } = product;
                                    return (
                                        <>

                                            <div key={id} className="col-md-3 mb-4" >

                                                <Link to={`/products/${id}`} style={{ textDecoration: 'none', color: '#000000' }}>
                                                    <div className="card" style={{ height: "350px", width: "200px" }}>
                                                        <div className="card-body">
                                                            <img src={product_image} className="card-img-top"></img>
                                                            {/* <img className="img-fluid rounded-3" style={{ height: "200px", objectFit: 'contain' }} src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTWfawhSeoaZLBlJp7M25-VdNmxy8j8FsVhH1fQar3y4reEvkNfRDalNiCUgmTPO7TxGjXeTQl7MPKiNYhlVah-yS4RN058RrZqdfXZcpPXdZ89vNJOrbxx&usqp=CAE" alt={"Carlie Anglemire"} /> */}
                                                            <h6 className="card-title">{product_brand}</h6>
                                                            <h5 className="card-title">{product_name}</h5>
                                                            <h5 className="card-title">${product_price}</h5>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </>
                                    )


                                })}

                            {/* {products.map((product) => {
                                const { id, product_name, product_price, product_image, product_brand } = product;
                                return (
                                    <>

                                        <div key={id} className="col-md-3 mb-4" >

                                            <Link to={`/products/${id}`} style={{ textDecoration: 'none', color: '#000000' }}>
                                                <div className="card" style={{ height: "350px", width: "200px" }}>
                                                    <div className="card-body">
                                                        <img src={product_image}  className="img-fluid rounded-3" style={{ height: "200px", objectFit: 'contain' }}></img>
                                                        <h6 className="card-title">{product_brand}</h6>
                                                        <h5 className="card-title mt-2">{product_name}</h5>
                                                        <h5 className="card-title">${product_price}</h5>

                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </>
                                )
                            })
                            } */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ProductList;

