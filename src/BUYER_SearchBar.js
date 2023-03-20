
import SearchBarSection from "./SearchBarSection";
import useFetch from "./useFetch";

const SearchBar = () => {
    const {error, isPending, data: products} = useFetch('http://localhost:8000/products')

    return (
        <div className="Buyer_Search">
          { error && <div>{ error }</div> }
          { isPending && <div>Loading...</div> }
          { products && <SearchBarSection products={products} /> }
        </div>
      );
    }

    export default SearchBar;