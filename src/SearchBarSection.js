import React, { useState } from "react";
// import "./SearchBarSection.css";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const SearchBarSection = ({ products }) => {

    //   const [products, setProducts] =  useState(productss);

    const [search, setSearch] = useState(products);

    const filteredProducts = products.filter((product) => {
        if (
            product.tags.toLowerCase().includes(search) ||
            product.Product_name.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search)
        ) {
            return product;
        }
    });


    return (
        <div className="container-fluid mx-2">
            <div className="row mt-2 mx-2">
            <div class="col-3 mt-5 mx-2 mb-4">
                {/* <input
                className="input"
                onChange={(e) => {
                    setSearch(e.target.value.toLowerCase());
                }}
            /> */}
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

                {/* <Button variant="outline-success">Search</Button> */}
            </div >
            <div className="col-md-9">
                <div className="row">
                {filteredProducts.map((product) => {
                    const { id, Product_name, Product_price, Product_image, Product_brand } = product;
                    return (
                        <>

                            <div key={id} className="col-md-3 mb-4" >

                                <Link to={`/products/${id}`} style={{ textDecoration: 'none', color: '#000000' }}>
                                    <div className="card" style={{ height: "350px", width: "200px" }}>
                                        <div className="card-body">
                                            {/* <img src = {Product_image} className = "card-img-top"></img> */}
                                            <img className="img-fluid rounded-3" style={{ height: "200px", objectFit: 'contain' }} src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTWfawhSeoaZLBlJp7M25-VdNmxy8j8FsVhH1fQar3y4reEvkNfRDalNiCUgmTPO7TxGjXeTQl7MPKiNYhlVah-yS4RN058RrZqdfXZcpPXdZ89vNJOrbxx&usqp=CAE" alt={"Carlie Anglemire"} />
                                            <h6 className="card-title">{Product_brand}</h6>
                                            <h5 className="card-title">{Product_name}</h5>
                                            <h5 className="card-title">${Product_price}</h5>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </>
                    )


                })}
            </div>
            </div>
            </div>
        </div >
    );
};

export default SearchBarSection;



