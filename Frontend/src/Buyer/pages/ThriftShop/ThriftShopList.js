import { Link } from "react-router-dom";
import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';


const ThriftShopList = ({ thriftshops }) => {

  const [thriftshop, setThriftShop] = useState(thriftshops);
  
  const filterResult = (dp_ornot) => {
    const result = thriftshops.filter((curData) => {
      return curData.donation === dp_ornot;
    });
    setThriftShop(result);
  }

  return (
    <>
      {/* <h2 className="text-center text-info">Browse Thrift Shops</h2> */}

      {/* filter */}
      <div className="container-fluid mx-2">
        <div className="row mt-5 mx-2">
          <div className="col-md-3">
            <h2 className="text">Filter Thrift Shops</h2>
            <button className="btn btn-outline-dark w-100 mb-4" onClick = {()=>filterResult('True')}>Donation Point</button>
            <button className="btn btn-outline-dark w-100 mb-4" onClick = {() => setThriftShop(thriftshops)}>All Thrift Shops</button>
          </div>

          <div className="col-md-9">
            <div className="row">
              
              {/* display products */}
              {/* the first thriftshop is from the usestate thriftshop */}
              {thriftshop.map((thriftshop) => {
                const{id, shop_name, shop_address} = thriftshop;
                return(
                <>
                  <div key={id} className="col mb-2" >

                      <Link to={`/thriftshops/${id}`} style={{ textDecoration: 'none', color: '#000000' }}>
                        <Card className="card" style={{ width: '45rem' }}>
                          <Card.Body>
                            <Card.Title>{shop_name}</Card.Title>
                            <Card.Text>Address: {shop_address}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Link>
                  </div>
                </>
              )})}
            </div>
          </div>
        </div>
      </div>

  
    </>
  )
}

export default ThriftShopList;