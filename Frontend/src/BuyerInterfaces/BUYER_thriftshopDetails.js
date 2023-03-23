import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../useFetch";

const TSDetails = () => {
  const { id } = useParams();
  const { data: thriftshop, error, isPending } = useFetch('http://localhost:8000/thriftshops/' + id);
  const navigate = useNavigate();

  const handleClick = () => {
    fetch('http://localhost:8000/thriftshops/' + thriftshop.id, {
      method: 'DELETE'
    }).then(() => {
      navigate.push('/');
    }) 
  }

  return (
    <div className="thriftshop-details mt-4">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { thriftshop && (
        <div className="row p-5">
        <div className="col-md-7 d-none d-md-block ml-4">
          <div className="col-md-9 pt-0 text-center text-md-start">
            <h2>
                <div className="product_brand fw-bold">{thriftshop.shop_name }</div>
              </h2>
            <p className="description">{thriftshop.shop_description }</p>
            <p className="address"><span className="text-muted">Address: </span> <span>{thriftshop.shop_address }</span></p>
      
          </div>  
      
        </div>
       
        {/* <!-- add picture carousel--> */}
          <div id="loopgarms" className = "col-md-5 ml-5 p-4 justify-content-end pb-2">
          <img
                        className="d-block w-100"
                        src="https://images.nypl.org/index.php?id=1589457&t=w"
                        alt="First slide"
                        width = {400} height = {400}
                      />
          </div>
      </div>
      )}
    </div>
  );
}

export default TSDetails;