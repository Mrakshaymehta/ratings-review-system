import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Connect to your backend (adjust the URL if needed)
    axios.get('http://localhost:5000/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-indigo-600">Product List</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {products.map(product => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-3">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Add/View Reviews
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

