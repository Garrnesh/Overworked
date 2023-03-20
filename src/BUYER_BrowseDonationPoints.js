import DonationPointList from "./donationpointsList";
import useFetch from "./useFetch";
import ThriftShopList from "./thriftshopList";

const BrowseDonationPoints = () => {
    const {error, isPending, data: donationpoints} = useFetch('http://localhost:8000/thriftshops')

    return (
        <div className="BrowseDP">
          { error && <div>{ error }</div> }
          { isPending && <div>Loading...</div> }
          { donationpoints && <ThriftShopList donationpoints ={donationpoints.filter((donationpoint) => donationpoint.donation === 'true')} /> }
        </div>
      );
    }

    export default BrowseDonationPoints;