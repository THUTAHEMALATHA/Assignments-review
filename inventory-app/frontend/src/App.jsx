import { useState } from "react";

function App() {
  const [filters, setFilters] = useState({
    q: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const [results, setResults] = useState([]);

  // input change handler
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // search function
  const search = async () => {
    if (
      !filters.q &&
      !filters.category &&
      !filters.minPrice &&
      !filters.maxPrice
    ) {
      setResults([]);
      return;
    }

    const query = new URLSearchParams(filters).toString();

    try {
      const res = await fetch(
        `https://assignments-backend.onrender.com/search?${query}`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.log(err);
      setResults([]);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Inventory Search</h1>

      {/* Filters */}
      <div>
        <input
          name="q"
          placeholder="Search"
          value={filters.q}
          onChange={handleChange}
        />

        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="grain">Grain</option>
          <option value="food">Food</option>
          <option value="electronics">Electronics</option>
        </select>

        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleChange}
        />

        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleChange}
        />

        <button onClick={search}>Search</button>
      </div>

      {/* Results */}
      <div style={{ marginTop: "20px" }}>
        {results.length === 0 ? (
          <p>No results found</p>
        ) : (
          results.map((item, index) => (
            <div key={index}>
              {item.name} - ₹{item.price}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;