import React from 'react';

import Banner from './banner';
import Blogs from './blogs';
import HorizontalCategories from './categories';
import CTA from './cta';
import NewProductsGrid from './new-product-grid';
import ProductFeatured from './product-featured';
import ProductMinimal from './product-minimal';
import Services from './services';
import Sidebarcategories from './sidebar-categories';
import Testimonials from './testimonials';

const Home = () => {
  return (
    <>
      <main>
        {/* Banner */}
        <Banner />

        {/* <!--- CATEGORY--> */}
        <HorizontalCategories />

        {/* <!--- PRODUCT--> */}
        <div class="product-container">
          <div class="container">

            {/* <!--- SIDEBAR--> */}
            <Sidebarcategories />

            <div class="product-box">

              {/* <!--- PRODUCT MINIMAL--> */}
              <div class="product-minimal">
                <ProductMinimal />
              </div>

              {/* <!--- PRODUCT FEATURED--> */}
              <div class="product-featured">
                <ProductFeatured />
              </div>

              {/* <!--- New PRODUCT GRID--> */}
              <div class="product-main">
                <NewProductsGrid />
              </div>

            </div>
          </div>
        </div>
        <div class="container">
          <div class="testimonials-box">

            {/* <!--- TESTIMONIALS--> */}
            <Testimonials />

            {/* <!--- CTA--> */}
            <div class="cta-container">
              <CTA />
            </div>

            {/* <!--- SERVICE--> */}
            <div class="service">
              <Services />
            </div>

          </div>
        </div>

        {/* <!--- BLOG--> */}
        <div class="container">
          <Blogs />
        </div>
      </main>
    </>
  );
};

export default Home;
