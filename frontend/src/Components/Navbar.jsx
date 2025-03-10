import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import isAuthenticated from '../../lib/auth';
import { useEffect, useState } from 'react';
import useUserProfileStore from '../../store/user-profile'
import apiClient from '../../lib/client-axios';


const Navbar = () => {
  const navigation = useNavigate();
  const { setUserProfile } = useUserProfileStore();

  const [auth, setAuth] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      const isAuth = await isAuthenticated(); // Wait for the Promise to resolve
      setAuth(isAuth);
    }
    checkAuth();
  }, [auth]);


  const useraccount = () => {
    if (auth) {
      navigation('/myaccount')
    }
    else {
      navigation('/signin')
    }
  }

  const mycart = () => {
    navigation('/cart')
  }

  const wishlist = () => {
    navigation('/wish')
  }

  const getAndSetProfileData = async () => {
    try {
      const response = (await apiClient.get('/accounts/profile/')).data;
      if (!response.success) return;

      const userData = response.data;

      if (userData) {
        if (userData.email_verified === false) {
          navigation(`/email/verify/?email=${userData.email}`)
        }

        setUserProfile(userData);

      }
    } catch (error) {
      // navigation('/signin')
    }
  }

  useEffect(() => {
    getAndSetProfileData();
  }, []);


  return (
    <>
      {/* <!--- HEADER--> */}

      <header>
        <div className="header-top">
          <div className="container">
            <ul className="header-social-container">
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-facebook"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-twitter"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-instagram"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-linkedin"></ion-icon>
                </a>
              </li>
            </ul>
            <div className="header-alert-news">
              <p>
                <b>Free Shipping</b>
                This Week Order Over - &#8377;1000
              </p>
            </div>
            <div className="header-top-actions">
              <select name="currency">
                <option value="inr">INR &#8377;</option>
                <option value="eur">EUR &euro;</option>
              </select>
              <select name="language">
                <option value="en-US">English</option>
              </select>
            </div>
          </div>
        </div>
        <div className="header-main">
          <div className="container">
            <Link to="" className="header-logo">
              <img src="./assets/images/logo/boss-logo.svg" alt="Anon's logo" width="120" height="52" />
            </Link>
            <div className="header-search-container">
              <input type="search" name="search" className="search-field" placeholder="Enter your product name..." />
              <button className="search-btn">
                <ion-icon name="search-outline"></ion-icon>
              </button>
            </div>
            <div className="header-user-actions">
              <button className="action-btn" onClick={() => { useraccount() }} >
                <ion-icon name="person-outline"></ion-icon>
              </button>
              <button className="action-btn" onClick={() => { wishlist() }}>
                <ion-icon name="heart-outline"></ion-icon>
                <span className="count">0</span>
              </button>
              <button className="action-btn" onClick={() => { mycart() }}>
                <ion-icon name="bag-handle-outline"></ion-icon>
                <span className="count">0</span>
              </button>
            </div>
          </div>
        </div>
        <nav className="desktop-navigation-menu">
          <div className="container">
            <ul className="desktop-menu-category-list">
              <li className="menu-category">
                <Link to="/" className="menu-title">Home</Link>
              </li>
              <li className="menu-category">
                <Link to="#" className="menu-title">Categories</Link>
                <div className="dropdown-panel">
                  <ul className="dropdown-panel-list">
                    <li className="menu-title">
                      <a href="#">Men's</a>
                    </li>
                    <li className="panel-list-item">
                      <a href="#">All Shoes</a>
                    </li>
                    <li className="panel-list-item">
                      <a href="#">Running</a>
                    </li>
                    <li className="panel-list-item">
                      <a href="#">Sandals</a>
                    </li>
                    <li className="panel-list-item">
                      <a href="#">Clothings</a>
                    </li>
                    <li className="panel-list-item">
                      <a href="#">Fashion Accessories</a>
                    </li>
                    <li className="panel-list-item">
                      <a href="#">
                        <img src="./assets/images/mens-banner.jpg" alt="men's fashion" width="250" height="119" />
                      </a>
                    </li>
                  </ul>
                  <ul className="dropdown-panel-list">
                    <li className="menu-title">
                      <a href="#">Women's</a>
                    </li>
                    <li className="panel-list-item">
                      <a href="#">Running</a>
                    </li>
                    <li className="panel-list-item">
                      <a href="#">GYM & Training</a>
                    </li>
                    <li className="panel-list-item">
                      <a href="#">clothings</a>
                    </li>
                    <li className="panel-list-item">
                      <a href="#">Fashion Accessories</a>
                    </li>
                    <li className="panel-list-item">
                      <a href="#">
                        <img src="./assets/images/womens-banner.jpg" alt="women's fashion" width="250" height="119" />
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="menu-category">
                <a href="/men" className="menu-title">Men's</a>
                <ul className="dropdown-list">
                  <li className="dropdown-item">
                    <Link href="/menformal">Formals</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link href="/menshorts">Shorts & Jeans</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link href="/mentshirts">T-shirts</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link href="/menfashion">Fashion Accessories</Link>
                  </li>
                </ul>
              </li>
              <li className="menu-category">
                <a href="/women" className="menu-title">Women's</a>
                <ul className="dropdown-list">
                  <li className="dropdown-item">
                    <Link href="#">Kurti</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link href="#">Saree</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link href="#">Western Dress</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link href="#">Fashion Accessories</Link>
                  </li>
                </ul>
              </li>
              <li className="menu-category">
                <Link to="/about" className="menu-title">About</Link>
              </li>
              <li className="menu-category">
                <Link to="/contact" className="menu-title">Contact</Link>
              </li>
              <li className="menu-category">
                <Link to="/offers" className="menu-title">Hot Offers</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="mobile-bottom-navigation">
          <button className="action-btn" data-mobile-menu-open-btn>
            <ion-icon name="menu-outline"></ion-icon>
          </button>
          <button className="action-btn">
            <ion-icon name="bag-handle-outline"></ion-icon>
            <span className="count">0</span>
          </button>
          <button className="action-btn">
            <ion-icon name="home-outline"></ion-icon>
          </button>
          <button className="action-btn">
            <ion-icon name="heart-outline"></ion-icon>
            <span className="count">0</span>
          </button>
          <button className="action-btn" data-mobile-menu-open-btn>
            <ion-icon name="grid-outline"></ion-icon>
          </button>
        </div>
        <nav className="mobile-navigation-menu  has-scrollbar" data-mobile-menu>
          <div className="menu-top">
            <h2 className="menu-title">Menu</h2>
            <button className="menu-close-btn" data-mobile-menu-close-btn>
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>
          <ul className="mobile-menu-category-list">
            <li className="menu-category">
              <a href="#" className="menu-title">Home</a>
            </li>
            <li className="menu-category">
              <button className="accordion-menu" data-accordion-btn>
                <p className="menu-title">Men's</p>
                <div>
                  <ion-icon name="add-outline" className="add-icon"></ion-icon>
                  <ion-icon name="remove-outline" className="remove-icon"></ion-icon>
                </div>
              </button>
              <ul className="submenu-category-list" data-accordion>
                <li className="submenu-category">
                  <a href="#" className="submenu-title">Shirt</a>
                </li>
                <li className="submenu-category">
                  <a href="#" className="submenu-title">Shorts & Jeans</a>
                </li>
                <li className="submenu-category">
                  <a href="#" className="submenu-title">Safety Shoes</a>
                </li>
                <li className="submenu-category">
                  <a href="#" className="submenu-title">Wallet</a>
                </li>
              </ul>
            </li>
            <li className="menu-category">
              <button className="accordion-menu" data-accordion-btn>
                <p className="menu-title">Women's</p>
                <div>
                  <ion-icon name="add-outline" className="add-icon"></ion-icon>
                  <ion-icon name="remove-outline" className="remove-icon"></ion-icon>
                </div>
              </button>
              <ul className="submenu-category-list" data-accordion>
                <li className="submenu-category">
                  <a href="#" className="submenu-title">Dress & Frock</a>
                </li>
                <li className="submenu-category">
                  <a href="#" className="submenu-title">Earrings</a>
                </li>
                <li className="submenu-category">
                  <a href="#" className="submenu-title">Necklace</a>
                </li>
                <li className="submenu-category">
                  <a href="#" className="submenu-title">Makeup Kit</a>
                </li>
              </ul>
            </li>
            <li className="menu-category">
              <button className="accordion-menu" data-accordion-btn>
                <p className="menu-title">Jewelry</p>
                <div>
                  <ion-icon name="add-outline" className="add-icon"></ion-icon>
                  <ion-icon name="remove-outline" className="remove-icon"></ion-icon>
                </div>
              </button>
              <ul className="submenu-category-list" data-accordion>
                <li className="submenu-category">
                  <a href="#" className="submenu-title">Earrings</a>
                </li>
                <li className="submenu-category">
                  <a href="#" className="submenu-title">Couple Rings</a>
                </li>
                <li className="submenu-category">
                  <a href="#" className="submenu-title">Necklace</a>
                </li>
                <li className="submenu-category">
                  <a href="#" className="submenu-title">Bracelets</a>
                </li>
              </ul>
            </li>
            <li className="menu-category">
              <button className="accordion-menu" data-accordion-btn>
                <p className="menu-title">Perfume</p>
                <div>
                  <ion-icon name="add-outline" className="add-icon"></ion-icon>
                  <ion-icon name="remove-outline" className="remove-icon"></ion-icon>
                </div>
              </button>
              <ul className="submenu-category-list" data-accordion>
                <li className="submenu-category">
                  <a href="#" className="submenu-title">Clothes Perfume</a>
                </li>
                <li className="submenu-category">
                  <a href="#" className="submenu-title">Deodorant</a>
                </li>
                <li className="submenu-category">
                  <a href="#" className="submenu-title">Flower Fragrance</a>
                </li>
                <li className="submenu-category">
                  <a href="#" className="submenu-title">Air Freshener</a>
                </li>
              </ul>
            </li>
            <li className="menu-category">
              <a href="#" className="menu-title">Blog</a>
            </li>
            <li className="menu-category">
              <a href="#" className="menu-title">Hot Offers</a>
            </li>
          </ul>
          <div className="menu-bottom">
            <ul className="menu-category-list">
              <li className="menu-category">
                <button className="accordion-menu" data-accordion-btn>
                  <p className="menu-title">Language</p>
                  <ion-icon name="caret-back-outline" className="caret-back"></ion-icon>
                </button>
                <ul className="submenu-category-list" data-accordion>
                  <li className="submenu-category">
                    <a href="#" className="submenu-title">English</a>
                  </li>
                  <li className="submenu-category">
                    <a href="#" className="submenu-title">Espa&ntilde;ol</a>
                  </li>
                  <li className="submenu-category">
                    <a href="#" className="submenu-title">Fren&ccedil;h</a>
                  </li>
                </ul>
              </li>
              <li className="menu-category">
                <button className="accordion-menu" data-accordion-btn>
                  <p className="menu-title">Currency</p>
                  <ion-icon name="caret-back-outline" className="caret-back"></ion-icon>
                </button>
                <ul className="submenu-category-list" data-accordion>
                  <li className="submenu-category">
                    <a href="#" className="submenu-title">USD &dollar;</a>
                  </li>
                  <li className="submenu-category">
                    <a href="#" className="submenu-title">EUR &euro;</a>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="menu-social-container">
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-facebook"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-twitter"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-instagram"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-linkedin"></ion-icon>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
