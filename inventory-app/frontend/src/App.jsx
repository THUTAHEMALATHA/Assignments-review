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

  // search function (FIXED)
  const search = async () => {
    const params = new URLSearchParams();

    if (filters.q) {
      params.append("q", filters.q.trim());
    }

    if (filters.category) {
      params.append("category", filters.category.toLowerCase());
    }

    if (filters.minPrice) {
      params.append("minPrice", filters.minPrice);
    }

    if (filters.maxPrice) {
      params.append("maxPrice", filters.maxPrice);
    }

    const query = params.toString();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/search?${query}`
      );
      const data = await res.json();
      console.log("API DATA:", data);

      if (Array.isArray(data)) {
        setResults(data);
      } else {
        setResults([]);
      }
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
        {Array.isArray(results) &&
          (results.length === 0 ? (
            <p>No results found</p>
          ) : (
            results.map((item, index) => (
              <div key={index}>
                {item.product_name} - ₹{item.price}
              </div>
            ))
          ))}
      </div>
    </div>
  );
}

export default App;