import React, { useEffect, useState } from "react";
const BACKEND_API_ROOT_URL = import.meta.env.VITE_BACKEND_API_ROOT_URL;
const BACKEND_ROOT_URL = import.meta.env.VITE_BACKEND_ROOT_URL;

export default function Sidebarcategories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`${BACKEND_API_ROOT_URL}/products/categories/`)
            .then(response => response.json())
            .then(data => {
                if (data.success && data.data) {
                    setCategories(data.data);
                }
            })
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    return (
        <div className="sidebar has-scrollbar" data-mobile-menu-open-btn>
            <div className="sidebar-category">
                <div className="sidebar-top">
                    <h2 className="sidebar-title">Category</h2>
                    <button className="sidebar-close-btn" data-mobile-menu-close-btn>
                        <ion-icon name="close-outline"></ion-icon>
                    </button>
                </div>
                <ul className="sidebar-menu-category-list">
                    {categories.map(category => (
                        <li key={category.id} className="sidebar-menu-category">
                            <button className="sidebar-accordion-menu">
                                <div className="menu-title-flex">
                                    <img
                                        src={BACKEND_ROOT_URL+category.thumbnail}
                                        width="20"
                                        height="20"
                                        className="menu-title-img"
                                    />
                                    <p className="menu-title">{category.name}</p>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* <div class="product-showcase">
                <h3 class="showcase-heading">best sellers</h3>
                <div class="showcase-wrapper">
                    <div class="showcase-container">
                        <div class="showcase">
                            <a href="#" class="showcase-img-box">
                                <img src="./assets/images/products/1.jpg" alt="baby fabric shoes" width="75" height="75"
                                    class="showcase-img" />
                            </a>
                            <div class="showcase-content">
                                <a href="#">
                                    <h4 class="showcase-title">baby fabric shoes</h4>
                                </a>
                                <div class="showcase-rating">
                                    <ion-icon name="star"></ion-icon>
                                    <ion-icon name="star"></ion-icon>
                                    <ion-icon name="star"></ion-icon>
                                    <ion-icon name="star"></ion-icon>
                                    <ion-icon name="star"></ion-icon>
                                </div>
                                <div class="price-box">
                                    <del>&#8377;5.00</del>
                                    <p class="price">&#8377;4.00</p>
                                </div>
                            </div>
                        </div>
                        <div class="showcase">
                            <a href="#" class="showcase-img-box">
                                <img src="./assets/images/products/2.jpg" alt="men's hoodies t-shirt" class="showcase-img"
                                    width="75" height="75" />
                            </a>
                            <div class="showcase-content">
                                <a href="#">
                                    <h4 class="showcase-title">men's hoodies t-shirt</h4>
                                </a>
                                <div class="showcase-rating">
                                    <ion-icon name="star"></ion-icon>
                                    <ion-icon name="star"></ion-icon>
                                    <ion-icon name="star"></ion-icon>
                                    <ion-icon name="star"></ion-icon>
                                    <ion-icon name="star-half-outline"></ion-icon>
                                </div>
                                <div class="price-box">
                                    <del>&#8377;17.00</del>
                                    <p class="price">&#8377;7.00</p>
                                </div>
                            </div>
                        </div>
                        <div class="showcase">
                            <a href="#" class="showcase-img-box">
                                <img src="./assets/images/products/3.jpg" alt="girls t-shirt" class="showcase-img" width="75"
                                    height="75" />
                            </a>
                            <div class="showcase-content">
                                <a href="#">
                                    <h4 class="showcase-title">girls t-shirt</h4>
                                </a>
                                <div class="showcase-rating">
                                    <ion-icon name="star"></ion-icon>
                                    <ion-icon name="star"></ion-icon>
                                    <ion-icon name="star"></ion-icon>
                                    <ion-icon name="star"></ion-icon>
                                    <ion-icon name="star-half-outline"></ion-icon>
                                </div>
                                <div class="price-box">
                                    <del>&#8377;5.00</del>
                                    <p class="price">&#8377;3.00</p>
                                </div>
                            </div>
                        </div>
                        <div class="showcase">
                            <a href="#" class="showcase-img-box">
                                <img src="./assets/images/products/4.jpg" alt="woolen hat for men" class="showcase-img" width="75"
                                    height="75" />
                            </a>
                            <div class="showcase-content">
                                <a href="#">
                                    <h4 class="showcase-title">woolen hat for men</h4>
                                </a>
                                <div class="showcase-rating">
                                    <ion-icon name="star"></ion-icon>
                                    <ion-icon name="star"></ion-icon>
                                    <ion-icon name="star"></ion-icon>
                                    <ion-icon name="star"></ion-icon>
                                    <ion-icon name="star"></ion-icon>
                                </div>
                                <div class="price-box">
                                    <del>&#8377;15.00</del>
                                    <p class="price">&#8377;12.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

