import React from 'react'
import useFetch from '../../../useFetch';
import ThriftShopList from './ThriftShopList';

const BrowseThriftShops = () => {
  const {error, isPending, data: thriftshops} = useFetch('http://localhost:8000/shops')

  return (
      <div className="BrowseTS">
        { error && <div>{ error }</div> }
        { isPending && <div>Loading...</div> }
        { thriftshops && <ThriftShopList thriftshops ={thriftshops} /> }
      </div>
    );
  }

  export default BrowseThriftShops;