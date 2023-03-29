import React from 'react'
import ThriftShopList from './ThriftShopList';
import useFetch from '../../../useFetch';

const BrowseThriftShops = () => {
  const {error, isPending, data: thriftshops} = useFetch('http://localhost:8000/thriftshops')

  return (
      <div className="BrowseTS">
        { error && <div>{ error }</div> }
        { isPending && <div>Loading...</div> }
        { thriftshops && <ThriftShopList thriftshops ={thriftshops} /> }
      </div>
    );
  }

  export default BrowseThriftShops;