import { useState } from "react";

const ShoeFilter = ({ onFilterChange }) => {
  const [selectedSize, setSelectedSize] = useState(''); 
  const [selectedPrice, setSelectedPrice] = useState('');

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
    onFilterChange({ size: e.target.value, price: selectedPrice });
  };

  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
    onFilterChange({ size: selectedSize, price: e.target.value });
  };

  return (
    <div className="w-64 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900">Filters</h3>

      {/* Size Filter */}
      <div className="mt-4">
        <h4 className="font-medium text-gray-700">Size</h4>
        <select
          value={selectedSize}
          onChange={handleSizeChange}
          className="mt-2 block w-full border-gray-300 rounded-md p-2"
        >
          <option value="">Select Size</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
        </select>
      </div>

      {/* Price Filter */}
      <div className="mt-4">
        <h4 className="font-medium text-gray-700">Price</h4>
        <select
          value={selectedPrice}
          onChange={handlePriceChange}
          className="mt-2 block w-full border-gray-300 rounded-md p-2"
        >
          <option value="">Select Price Range</option>
          <option value="0-50">$0 - $50</option>
          <option value="51-100">$51 - $100</option>
          <option value="101-150">$101 - $150</option>
          <option value="151-200">$151 - $200</option>
        </select>
      </div>
    </div>
  );
};

const ShoeCard = ({ shoe }) => (


    
  <div className="lg:w-1/4 md:w-1/2 p-4 w-fullhover:scale-200 transition-transform duration-300 ease-in-out transform hover:shadow-xl hover:bg-gray-50 rounded-lg">
    <div className="block relative h-48 rounded overflow-hidden">
      <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={shoe.img} />
    </div>






    <div className="mt-4">
      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{shoe.category}</h3>
      <h2 className="text-gray-900 title-font text-lg font-medium">{shoe.name}</h2>
      <p className="mt-1">${shoe.price}</p>
    </div>
  </div>
);

const ShoeGrid = ({ shoes }) => (
  <div className="flex flex-wrap -m-4">
    {shoes.map((shoe) => (
      <ShoeCard key={shoe.id} shoe={shoe} />
    ))}
  </div>
);

const Hotdeals = () => {
  const [filteredShoes, setFilteredShoes] = useState([
    { id: 1, name: "Nike Air Max", price: 120, size: 9, category: "Sneakers", img: "https://dummyimage.com/420x260" },
    { id: 2, name: "Adidas Ultra Boost", price: 150, size: 10, category: "Running", img: "https://dummyimage.com/421x261" },
    { id: 3, name: "Puma Suede", price: 80, size: 8, category: "Casual", img: "https://dummyimage.com/422x262" },
    { id: 4, name: "Reebok Classic", price: 90, size: 7, category: "Casual", img: "https://dummyimage.com/423x263" },
    { id: 5, name: "Converse Chuck Taylor", price: 60, size: 9, category: "Sneakers", img: "https://dummyimage.com/424x264" },
    { id: 6, name: "New Balance 990", price: 180, size: 10, category: "Running", img: "https://dummyimage.com/425x265" },
    { id: 7, name: "Nike Air Force 1", price: 110, size: 11, category: "Sneakers", img: "https://dummyimage.com/427x267" },
    { id: 8, name: "Adidas Stan Smith", price: 85, size: 8, category: "Casual", img: "https://dummyimage.com/428x268" },
  ]);

  const handleFilterChange = (filters) => {
    let filtered = [
      { id: 1, name: "Nike Air Max", price: 120, size: 9, category: "Sneakers", img: "https://dummyimage.com/420x260" },
      { id: 2, name: "Adidas Ultra Boost", price: 150, size: 10, category: "Running", img: "https://dummyimage.com/421x261" },
      { id: 3, name: "Puma Suede", price: 80, size: 8, category: "Casual", img: "https://dummyimage.com/422x262" },
      { id: 4, name: "Reebok Classic", price: 90, size: 7, category: "Casual", img: "https://dummyimage.com/423x263" },
      { id: 5, name: "Converse Chuck Taylor", price: 60, size: 9, category: "Sneakers", img: "https://dummyimage.com/424x264" },
      { id: 6, name: "New Balance 990", price: 180, size: 10, category: "Running", img: "https://dummyimage.com/425x265" },
      { id: 7, name: "Nike Air Force 1", price: 110, size: 11, category: "Sneakers", img: "https://dummyimage.com/427x267" },
      { id: 8, name: "Adidas Stan Smith", price: 85, size: 8, category: "Casual", img: "https://dummyimage.com/428x268" },
    ];

    // Apply Size Filter
    if (filters.size) {
      filtered = filtered.filter((shoe) => shoe.size === parseInt(filters.size));
    }

    // Apply Price Filter
    if (filters.price) {
      const [minPrice, maxPrice] = filters.price.split('-').map((p) => parseInt(p));
      filtered = filtered.filter((shoe) => shoe.price >= minPrice && shoe.price <= maxPrice);
    }

    setFilteredShoes(filtered);
  };

  return (
    <>
{/* slider for hot deals start here */}

<div class="banner">

<div class="container">

  <div class="slider-container has-scrollbar">

    <div class="slider-item">
      <img src="./assets/background/hotdeals-1.jpg" alt="hot deals" />

      <div class="banner-content">

        <p class="banner-subtitle">Trending item</p>

        <h2 class="videoheading">Men's latest fashion sale</h2>

        <p class="banner-text" className="text-white text-1xl">
          starting at &#8377; <b>2000</b>.00
        </p>

        <a href="#" class="banner-btn">Shop now</a>

      </div>

    </div>

    <div class="slider-item">

      <img src="./assets/background/sale.png" alt="hot deals" />

      <div class="banner-content">

        <p class="banner-subtitle">Trending accessories</p>



        <a href="#" class="banner-btn">Shop now</a>

      </div>

    </div>

    <div class="slider-item">

      <img src="./assets/background/sale2.jpg" alt="new fashion summer sale" />

      <div class="banner-content">

        <p class="banner-subtitle">Sale Offer</p>

        <h2 class="banner-title">New fashion summer sale</h2>

        <p class="banner-text" className="text-white text-1xl">
          starting at &#8377;<b>29</b>.99
        </p>

        <a href="#" class="banner-btn">Shop now</a>

      </div>

    </div>

  </div>

</div>

</div>











































    <div className="flex">
      {/* Filter Section */}
      <ShoeFilter onFilterChange={handleFilterChange} />

      {/* Shoes Grid */}
      <div className="flex-grow p-4">
        <h2 className="text-2xl font-bold mb-4" class="heading-grid">Best Offers !!</h2>
        <ShoeGrid shoes={filteredShoes} />
        <ShoeGrid shoes={filteredShoes} />
      </div>
    </div>
    </>
  );
};

export default Hotdeals;
