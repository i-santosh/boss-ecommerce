import React, { useEffect, useState } from "react";
import apiClient from "../../lib/client-axios";
import { Link } from "react-router-dom";

const BACKEND_API_ROOT_URL = import.meta.env.VITE_BACKEND_API_ROOT_URL;
const BACKEND_ROOT_URL = import.meta.env.VITE_BACKEND_ROOT_URL;

export default function NewProductsGrid() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = (await apiClient.get('/products/products/')).data;
                if (await response.success) {
                    console.log(response.data);
                    setProducts(await response.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <h2 className="title">What's New</h2>
            <div className="product-grid">
                {products.map(product => (
                    <Link to={`/products/${product.id}`} key={product.id}>
                        <div className="showcase">
                            <div className="showcase-banner">
                                <img src={BACKEND_ROOT_URL+product.thumbnail} alt={product.name} width="300" className="product-img default" />
                            {product.images.length > 0 && (
                                <img src={BACKEND_ROOT_URL+product.images[0].image} alt={product.name} width="300" className="product-img hover" />
                            )}
                            <div className="showcase-actions">
                                <button className="btn-action">
                                    <ion-icon name="heart-outline"></ion-icon>
                                </button>
                                <button className="btn-action">
                                    <ion-icon name="eye-outline"></ion-icon>
                                </button>
                                <button className="btn-action">
                                    <ion-icon name="repeat-outline"></ion-icon>
                                </button>
                                <button className="btn-action">
                                    <ion-icon name="bag-add-outline"></ion-icon>
                                </button>
                            </div>
                        </div>
                        <div className="showcase-content">
                            <a href="#" className="showcase-category">Category {product.category}</a>
                            <h3>
                                <a href="#" className="showcase-title">{product.name}</a>
                            </h3>
                            <div className="showcase-rating">
                                <ion-icon name="star"></ion-icon>
                                <ion-icon name="star"></ion-icon>
                                <ion-icon name="star"></ion-icon>
                                <ion-icon name="star-outline"></ion-icon>
                                <ion-icon name="star-outline"></ion-icon>
                            </div>
                            <div className="price-box">
                                <p className="price">&#8377;{product.price}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
