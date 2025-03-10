"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import apiClient from "../../lib/client-axios"
import {
    Star,
    Heart,
    ShoppingCart,
    Share2,
    ArrowLeft,
    ShieldCheck,
    Truck,
    Package,
    Minus,
    Plus,
    Loader2
} from "lucide-react"
import { cn } from "../../lib/utils"
import { toast } from "react-fox-toast"
import useUserProfileStore from '../../store/user-profile'
import AddToCartButton from "./AddToCartButton"

const BACKEND_API_ROOT_URL = import.meta.env.VITE_BACKEND_API_ROOT_URL
const BACKEND_ROOT_URL = import.meta.env.VITE_BACKEND_ROOT_URL

export default function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [buyNowLoading, setBuyNowLoading] = useState(false)
    const [loading, setLoading] = useState(true)
    const [mainImage, setMainImage] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [wishlistAdded, setWishlistAdded] = useState(false);
    const { userProfile } = useUserProfileStore();


    const openRazorpayModal = async (orderId) => {
        const key = import.meta.env.VITE_RAZORPAY_KEY_ID

        var options = {
            "key": key, // Enter the Key ID generated from the Dashboard
            "currency": "INR",
            "name": "BOSS",
            "description": "Test Transaction",
            "image": "",
            "order_id": orderId,
            "handler": function (response) {
                console.log(response)
            },
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                "name": userProfile?.name || "", //your customer's name
                "email": userProfile?.email || "",
            },
            "theme": {
                "color": "#ff637e"
            }
        };

        try {
            const razorpay = new Razorpay(options);
            razorpay.open();
            razorpay.on('payment.failed', function (response) {
                toast.error("Payment failed")
            });
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = (await apiClient.get(`/products/products/${id}/`)).data
                if (result.success) {
                    setProduct(result.data)
                    setMainImage(`${BACKEND_ROOT_URL}${result.data.thumbnail}`)
                }
            } catch (error) {
                console.error("Error fetching product:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    if (loading) {
        return <LoadingState />
    }

    if (!product) {
        return <ProductNotFound />
    }

    const handleThumbnailClick = (imageUrl) => {
        setMainImage(imageUrl)
    }
    // Remember to change the quantity limit to the product stock
    const increaseQuantity = () => {
        if (quantity < 20) {
            setQuantity(quantity + 1)
        }
    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const toggleWishlist = () => {
        setWishlistAdded(!wishlistAdded)
    }

    const handleBuyNow = async () => {
        setBuyNowLoading(true)
        // Create Order first
        const orderItem = [
            {
                product_id: product.id,
                quantity: quantity,
            }
        ]
        try {
            const order = (await apiClient.post(`/orders/place/`, { orderItem })).data
            console.log(order)

            if (order.success) {
                // Redirect to checkout page
                toast.success(order.message)
                openRazorpayModal(order.data.razorpay_order_id)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setBuyNowLoading(false)
        }
        // Redirect to checkout page
    }

    // Calculate discount percentage if original price exists
    const discountPercentage = product.original_price
        ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
        : 0

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* <Breadcrumbs product={product} /> */}

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-6">
                    {/* Image Gallery - 2 cols on lg screens */}
                    <div className="lg:col-span-2">
                        <div className="sticky top-24">
                            <ProductGallery
                                product={product}
                                mainImage={mainImage}
                                wishlistAdded={wishlistAdded}
                                discountPercentage={discountPercentage}
                                onThumbnailClick={handleThumbnailClick}
                                onToggleWishlist={toggleWishlist}
                            />
                        </div>
                    </div>

                    {/* Product Info - 3 cols on lg screens */}
                    <div className="lg:col-span-3 flex flex-col">
                        <ProductHeader product={product} />
                        <ProductDescription description={product.description} />
                        <ProductPrice price={product.price} originalPrice={product.original_price} />
                        <QuantitySelector
                            quantity={quantity}
                            stock={product.stock}
                            onIncrease={increaseQuantity}
                            onDecrease={decreaseQuantity}
                            onChange={setQuantity}
                        />
                        <ActionButtons onBuyNowClick={handleBuyNow} buyNowLoading={buyNowLoading} product={product} quantity={quantity} />
                        <ProductFeatures />
                    </div>
                </div>
            </div>
        </div>
    )
}

// Component for loading state
function LoadingState() {
    return (
        <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
        </div>
    )
}

// Component for product not found
function ProductNotFound() {
    return (
        <div className="text-center mt-16 p-8 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-700">Product not found</h2>
            <p className="mt-2 text-gray-500">The product you're looking for doesn't exist or has been removed.</p>
            <button className="mt-4 flex items-center mx-auto px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
                <ArrowLeft size={18} className="mr-2" />
                Return to shop
            </button>
        </div>
    )
}


// Component for product gallery
function ProductGallery({
    product,
    mainImage,
    wishlistAdded,
    discountPercentage,
    onThumbnailClick,
    onToggleWishlist,
}) {
    return (
        <>
            {/* Main Image */}
            <div className="relative group mb-4 overflow-hidden rounded-xl">
                <img
                    src={mainImage || ""}
                    alt={product.name}
                    className="w-full h-96 object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                />

                {/* Wishlist button */}
                <button
                    onClick={onToggleWishlist}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition transform hover:scale-110"
                    aria-label={wishlistAdded ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <Heart
                        size={20}
                        className={cn("transition-colors", wishlistAdded ? "text-rose-500 fill-rose-500" : "text-gray-500")}
                    />
                </button>

                {/* Share button */}
                <button
                    className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition transform hover:scale-110"
                    aria-label="Share product"
                >
                    <Share2 size={20} className="text-gray-500" />
                </button>

                {/* Discount badge */}
                {discountPercentage > 0 && (
                    <div className="absolute bottom-4 left-4 bg-red-500 text-white text-sm font-semibold py-1 px-3 rounded-full shadow-md">
                        {discountPercentage}% OFF
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-3">
                <div
                    className={cn(
                        "aspect-square rounded-lg cursor-pointer overflow-hidden border-2 transition-all duration-200",
                        mainImage === `${BACKEND_ROOT_URL}${product.thumbnail}`
                            ? "border-pink-500 shadow-md"
                            : "border-transparent hover:border-pink-300",
                    )}
                    onClick={() => onThumbnailClick(`${BACKEND_ROOT_URL}${product.thumbnail}`)}
                >
                    <img
                        src={`${BACKEND_ROOT_URL}${product.thumbnail}`}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {product.images &&
                    product.images.slice(0, 4).map((img) => (
                        <div
                            key={img.id}
                            className={cn(
                                "aspect-square rounded-lg cursor-pointer overflow-hidden border-2 transition-all duration-200",
                                mainImage === `${BACKEND_ROOT_URL}${img.image}`
                                    ? "border-pink-500 shadow-md"
                                    : "border-transparent hover:border-pink-300",
                            )}
                            onClick={() => onThumbnailClick(`${BACKEND_ROOT_URL}${img.image}`)}
                        >
                            <img
                                src={`${BACKEND_ROOT_URL}${img.image}`}
                                alt={img.alt_text || product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
            </div>
        </>
    )
}

// Component for product header
function ProductHeader({ product }) {
    return (
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 leading-tight">{product.name}</h1>
            <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center">
                    <RatingStars rating={product.rating || 4} />
                    <span className="text-gray-600 ml-2 text-sm">({product.rating || 4.0})</span>
                </div>
                <span className="text-sm text-gray-300">|</span>
                <StockStatus stock={product.stock} />
                <span className="text-sm text-gray-300">|</span>
                <span className="text-sm text-gray-500">SKU: {product.sku || "N/A"}</span>
            </div>
        </div>
    )
}

// Component for rating stars
function RatingStars({ rating }) {
    return (
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    fill={i < rating ? "currentColor" : "none"}
                    className={cn("h-5 w-5", i < rating ? "text-yellow-500" : "text-gray-300")}
                />
            ))}
        </div>
    )
}

// Component for stock status
function StockStatus({ stock }) {
    let statusText = "In Stock"
    let statusClass = "text-green-600"

    if (stock <= 0) {
        statusText = "Out of Stock"
        statusClass = "text-red-500"
    } else if (stock <= 10) {
        statusText = `Only ${stock} left`
        statusClass = "text-orange-500"
    }

    return <span className={`text-sm ${statusClass} font-medium`}>{statusText}</span>
}

// Component for product description
function ProductDescription({ description }) {
    return (
        <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>
    )
}

// Component for product price
function ProductPrice({ price, originalPrice }) {
    return (
        <div className="mb-6 flex items-end gap-3">
            <span className="text-3xl font-bold text-gray-900">₹{price.toLocaleString()}</span>
            {originalPrice && <span className="text-lg text-gray-500 line-through">₹{originalPrice.toLocaleString()}</span>}
            {originalPrice && (
                <span className="text-sm font-medium text-green-600">Save ₹{(originalPrice - price).toLocaleString()}</span>
            )}
        </div>
    )
}

// Component for quantity selector
function QuantitySelector({
    quantity,
    stock,
    onIncrease,
    onDecrease,
    onChange,
}) {
    return (
        <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Quantity</p>
            <div className="flex items-center">
                <div
                    onClick={onDecrease}
                    disabled={quantity <= 1}
                    className={cn(
                        "w-10 h-10 rounded-l-lg flex items-center justify-center border border-gray-300 transition-colors cursor-pointer",
                        quantity <= 1
                            ? "bg-gray-100! text-gray-400! cursor-not-allowed"
                            : "bg-gray-100! text-gray-700! hover:bg-gray-200!",
                    )}
                    aria-label="Decrease quantity"
                >
                    <Minus size={16} />
                </div>
                <input
                    type="number"
                    min="1"
                    max={stock}
                    value={quantity}
                    onChange={(e) => onChange(Math.min(stock, Math.max(1, Number.parseInt(e.target.value) || 1)))}
                    className="w-16 h-10 border-t border-b text-black! border-gray-300 text-center focus:outline-none focus:ring-1 focus:ring-pink-300!"
                    aria-label="Quantity"
                />
                <div
                    onClick={onIncrease}
                    disabled={quantity >= stock}
                    className={cn(
                        "w-10 h-10 rounded-r-lg flex items-center justify-center border border-gray-300 transition-colors cursor-pointer",
                        quantity >= stock
                            ? "bg-gray-100! text-gray-400! cursor-not-allowed"
                            : "bg-gray-100! text-gray-700! hover:bg-gray-200!",
                    )}
                    aria-label="Increase quantity"
                >
                    <Plus size={16} />
                </div>
            </div>
        </div>
    )
}

// Component for action buttons
function ActionButtons({ onBuyNowClick, buyNowLoading, product, quantity }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl mb-8">
            <AddToCartButton product={product} quantity={quantity} />

            <div
                className="relative cursor-pointer h-12 sm:h-14 bg-rose-400! hover:bg-rose-500! text-white rounded-lg! flex items-center justify-center font-medium transition-all duration-200 shadow-sm hover:shadow group"
                aria-label="Buy now"
                onClick={onBuyNowClick}
            >
                {buyNowLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <span className="transition-transform group-hover:scale-105">Buy Now</span>}
            </div>
        </div>
    )
}

// Component for product features
function ProductFeatures() {
    const features = [
        {
            icon: <ShieldCheck size={20} />,
            title: "Authentic Product",
            description: "100% Genuine",
        },
        {
            icon: <Truck size={20} />,
            title: "Fast Delivery",
            description: "2-3 Business Days",
        },
        {
            icon: <Package size={20} />,
            title: "Easy Returns",
            description: "7 Days Return Policy",
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-100 pt-6">
            {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 group">
                    <div className="p-2 bg-pink-50 text-pink-500 rounded-full transition-all duration-200 group-hover:bg-pink-100 group-hover:text-pink-600 group-hover:scale-110">
                        {feature.icon}
                    </div>
                    <div>
                        <p className="text-sm font-medium">{feature.title}</p>
                        <p className="text-xs text-gray-500">{feature.description}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}