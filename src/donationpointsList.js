import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';


const DonationPointList = ({donationpoints}) => {
  return (
    <div className ="container h-100 py-5">
      <div className="dp-list row mr-4">
                
      {/* display products */}
      {donationpoints.map(donationpoint => (
            <div key = {donationpoint.id} className = "dp-preview col-sm-6 col-md-4 col-lg-3 mb-4" >
              
              <Link to={`/thriftshops/${donationpoint.id}`} style = {{textDecoration : 'none', color : '#000000'}}>
                <Card className = "card h-100 mx-3" style={{ width: '18rem' }}>
                  {/* <Card.Img variant="top" src={product.Product_image[0]}/> */}
                  
                  <Card.Body>
                    <Card.Title>{donationpoint.shop_name}</Card.Title>
                    <Card.Text> Price: $
                      {donationpoint.shop_description}
                    </Card.Text>
                  </Card.Body>
                  </Card>
              </Link>

          </div>
            ))}
      </div>
    </div>
  );
}
 
export default DonationPointList;