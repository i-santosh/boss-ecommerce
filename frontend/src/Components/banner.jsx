import React from "react"

export default function Banner() {
    return (
        <>
            <div class="banner">
                <div class="container">
                    <div class="slider-container has-scrollbar">
                        <div class="slider-item">
                            <video id="boss-video" src="src\videos\boss-cropped.mp4" autoPlay loop muted></video>
                            <div class="banner-content">
                                <p class="banner-subtitle">Trending item</p>
                                <h2 class="videoheading">Men's latest fashion sale</h2>
                                <p class="banner-text">
                                    starting at &#8377; <b>2000</b>.00
                                </p>
                                <a href="#" class="banner-btn">Shop now</a>
                            </div>
                        </div>
                        <div class="slider-item">
                            <img src="./assets/images/puma-sale-img.png" alt="modern sunglasses" class="banner-img" />
                            <div class="banner-content">
                                <p class="banner-subtitle">Trending accessories</p>
                                <a href="#" class="banner-btn">Shop now</a>
                            </div>
                        </div>
                        <div class="slider-item">
                            <img src="./assets/images/nike-im2.png" alt="new fashion summer sale" class="banner-img" />
                            <div class="banner-content">
                                <p class="banner-subtitle">Sale Offer</p>
                                <h2 class="banner-title">New fashion summer sale</h2>
                                <p class="banner-text">
                                    starting at &dollar; <b>29</b>.99
                                </p>
                                <a href="#" class="banner-btn">Shop now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}