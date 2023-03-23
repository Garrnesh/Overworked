
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import React, {useState} from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

const ProductList = ({ products }) => {

  const [product, setProduct] = useState(products);
  const filterResult = (havecategory) => {
    const result = products.filter((curData) => {
      return curData.category === havecategory;
    });
    setProduct(result);
  }

  return (
    <>
      {/* <h2 className="text-center text-info">Browse Thrift Shops</h2> */}

      {/* filter */}

      <div className="container-fluid mx-2">
        <div className="row mt-5 mx-2">
          <div className="col-md-3">
            <h2 className="text">Filter Clothes</h2>
            <button className="btn btn-outline-dark w-100 mb-4" onClick = {()=>filterResult('sweatshirt')}>Sweatshirt</button>
            <button className="btn btn-outline-dark w-100 mb-4" onClick = {()=>filterResult('blouse')}>Blouse</button>
            <button className="btn btn-outline-dark w-100 mb-4" onClick = {()=>filterResult('pants')}>Pants</button>
            <button className="btn btn-outline-dark w-100 mb-4" onClick = {()=>filterResult('accessories')}>Accessories</button>
            <button className="btn btn-outline-dark w-100 mb-4" onClick = {() => setProduct(products)}>All</button>
          </div>

          <div className="col-md-9">
            <div className="row">
              
              {/* display products */}
              {/* the first thriftshop is from the usestate thriftshop */}
              {product.map((product) => {
                const{id, product_name, product_price, product_image, product_brand} = product;
                return(
                <>
                
                  <div key={id} className="col-md-3 mb-4" >
                    
                      <Link to={`/products/${id}`} style={{ textDecoration: 'none', color: '#000000' }}>
                        <div className="card" style={{ height: "350px", width: "200px"}}>
                          <div className = "card-body">
                            {/* <img src = {Product_image} className = "card-img-top"></img> */}
                            <img className="img-fluid rounded-3" style={{ height: "200px", objectFit: 'contain'}}src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTWfawhSeoaZLBlJp7M25-VdNmxy8j8FsVhH1fQar3y4reEvkNfRDalNiCUgmTPO7TxGjXeTQl7MPKiNYhlVah-yS4RN058RrZqdfXZcpPXdZ89vNJOrbxx&usqp=CAE" alt={"Carlie Anglemire"} />
                            <h6 className = "card-title">{product_brand}</h6>
                            <h5 className = "card-title">{product_name}</h5>
                            <h5 className = "card-title">${product_price}</h5>
                          </div>
                        </div>
                      </Link>
                  </div>
                </>
              )})}
            </div>
          </div>
        </div>
      </div>

      );
    </>
  )
}


        export default ProductList;


        // <div className="col-md-9">
        // <div className="row">
        //   {product.map((product) => {
        //     const{id, Product_name, Product_price} = product;
        //     return(
        //       <>
        //       <div key = {id} className = "col-md-4 mb-4">
        //       <Link style={{ textDecoration: 'none', color: '#000000' }} to={`/products/${id}`}>
        //         <Card className="mx-3" style={{ width: '18rem' }}>
        //           {/* <img className="profile-photo" src={require("./clothes_db/sweatshirt/polo-1.jpg")} alt={"Carlie Anglemire"}/> */}
        //           <img className="profile-photo" src="https://images.nypl.org/index.php?id=1589457&t=w" alt={"Carlie Anglemire"} />
        //           <Card.Body>
        //             <Card.Title>{Product_name}</Card.Title>
        //             <Card.Text> Price: $
        //               {Product_price}
        //             </Card.Text>
        //           </Card.Body>
        //         </Card>
        //       </Link>
        //       </div>
        //     </>
        //     )})};
        //   </div>
        // </div>