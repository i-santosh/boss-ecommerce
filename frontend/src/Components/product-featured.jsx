import React, { useState, useEffect } from 'react';
const BACKEND_API_ROOT_URL = import.meta.env.VITE_BACKEND_API_ROOT_URL;
const BACKEND_ROOT_URL = import.meta.env.VITE_BACKEND_ROOT_URL;

const ProductFeatured = () => {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState({});

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const response = await fetch(`${BACKEND_API_ROOT_URL}/products/products/deal-of-the-day/`);
                const result = await response.json();
                if (result.success) {
                    setDeals(result.data);
                    const initialTimeLeft = result.data.reduce((acc, deal) => {
                        acc[deal.id] = calculateTimeLeft(deal.end_date);
                        return acc;
                    }, {});
                    setTimeLeft(initialTimeLeft);
                }
            } catch (error) {
                console.error('Error fetching deals:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDeals();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                return Object.keys(prevTimeLeft).reduce((acc, dealId) => {
                    acc[dealId] = calculateTimeLeft(deals.find(d => d.id === parseInt(dealId))?.end_date);
                    return acc;
                }, {});
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [deals]);

    const calculateTimeLeft = (endDate) => {
        const difference = new Date(endDate) - new Date();
        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    };

    if (loading) {
        return <div className="text-center p-4">Loading deals...</div>;
    }

    return (
        <>
            <h2 className="title">Deal of the day</h2>
            <div className="showcase-wrapper has-scrollbar">
                {deals.map((deal) => (
                    <div key={deal.id} className="showcase-container">
                        <div className="showcase">
                            <div className="showcase-banner">
                                <img 
                                    src={BACKEND_ROOT_URL+deal.product.thumbnail} 
                                    alt={deal.product.name} 
                                    className="showcase-img"
                                />
                            </div>
                            <div className="showcase-content">
                                <div className="showcase-rating">
                                    {[...Array(5)].map((_, index) => (
                                        <span key={index} className="text-yellow-400">★</span>
                                    ))}
                                </div>
                                <h3 className="showcase-title">
                                    <a href="#" className="showcase-title">{deal.product.name}</a>
                                </h3>
                                <p className="showcase-desc">
                                    Special deal of the day - Limited time offer!
                                </p>
                                <div className="price-box">
                                    <p className="price">₹{deal.deal_price}</p>
                                    <del>₹{deal.product.price}</del>
                                </div>
                                <button className="add-cart-btn">Add to cart</button>
                                <div className="countdown-box">
                                    <p className="countdown-desc">
                                        Hurry Up! Offer ends in:
                                    </p>
                                    <div className="countdown">
                                        {Object.entries(timeLeft[deal.id] || {}).map(([unit, value]) => (
                                            <div key={unit} className="countdown-content">
                                                <p className="display-number">
                                                    {String(value).padStart(2, '0')}
                                                </p>
                                                <p className="display-text">
                                                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProductFeatured;
