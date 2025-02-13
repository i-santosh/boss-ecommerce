import React, { useState, useEffect } from 'react';

const BACKEND_API_ROOT_URL = import.meta.env.VITE_BACKEND_API_ROOT_URL;
const BACKEND_ROOT_URL = import.meta.env.VITE_BACKEND_ROOT_URL;

const ProductMinimal = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BACKEND_API_ROOT_URL}/products/products/`);
        const result = await response.json();
        if (result.success) {
          setProducts(result.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Helper function to chunk array into groups
  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  // Split products into sections (New Arrivals, Trending, Top Rated)
  const getProductSection = (start, count) => {
    return products.slice(start, start + count);
  };

  const renderShowcase = (product) => {
    if (!product) return null;
   
    return (
      <div key={product.id} className="showcase">
        <a href="#" className="showcase-img-box">
          <img
            src={BACKEND_ROOT_URL+product.thumbnail}
            alt={product.name}
            className="showcase-img"
            width="70"
          />
        </a>
        <div className="showcase-content">
          <a href="#">
            <h4 className="showcase-title">{product.name}</h4>
          </a>
          <a href="#" className="showcase-category">
            {product.category === 1 ? 'Clothes' :
             product.category === 2 ? 'Shoes' :
             product.category === 3 ? 'Jewelry' :
             product.category === 4 ? 'Perfume' :
             product.category === 5 ? 'Cosmetics' :
             product.category === 8 ? 'Watches' : 'Other'}
          </a>
          <div className="price-box">
            <p className="price">₹{parseFloat(product.price).toFixed(2)}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderProductSection = (title, productsData) => {
    // Calculate how many complete chunks of 4 we need
    const completeChunks = Math.floor(productsData.length / 4);
    // Get any remaining products
    const remainingProducts = productsData.length % 4;
    
    // Create array of chunks
    const chunks = [];
    
    // Add complete chunks
    for (let i = 0; i < completeChunks; i++) {
      chunks.push(productsData.slice(i * 4, (i + 1) * 4));
    }
    
    // Add remaining products as a final chunk if any exist
    if (remainingProducts > 0) {
      chunks.push(productsData.slice(completeChunks * 4));
    }

    return (
      <div className="product-showcase">
        <h2 className="title">{title}</h2>
        <div className="showcase-wrapper has-scrollbar">
          {chunks.map((chunk, index) => (
            <div key={index} className="showcase-container">
              {chunk.map(product => renderShowcase(product))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="product-showcase">Loading products...</div>;
  }

  return (
    <>
      {renderProductSection('New Arrivals', getProductSection(0, 9))}
      {renderProductSection('Trending', getProductSection(9, 9))}
      {renderProductSection('Top Rated', getProductSection(18, 9))}
    </>
  );
};

export default ProductMinimal;