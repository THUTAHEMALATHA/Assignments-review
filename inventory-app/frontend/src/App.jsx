import { useState } from "react";

function App(){
  const [filters, setFilters] = useState({
    q : "",
    category:"",
    minPrice:"",
    maxPrice:""
  });

  const[results , setResults] = useState([]);
  const search = async()=>{
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`http://localhost:5000/search?{query}`);
    const data = await res.json();
    setResults(data);
 };
  return(
    <div>
      <h1>Inventory Search</h1>
      <input placeholder="Search"
      onChange={e =>setFilters({...filters, q: e.target.value})}
       />
       <input placeholder="Category"
      onChange={e =>setFilters({...filters, q: e.target.value})}
       />
       <input type="number" placeholder="Min Price"
      onChange={e =>setFilters({...filters, minPrice: e.target.value})}
       />
       <input type="number" placeholder="Max Price"
      onChange={e =>setFilters({...filters, maxPrice: e.target.value})}
       />
       
       <button onClick={search}>Search</button>
        
        {results.length === 0 ? (
          <p>No results found</p>
        ) : (
          results.map(item =>(
            <div key={item.id}>{item.product_name} - ₹{item.price}</div>
          ))
        )}

    </div>
  )

}
export default App;
