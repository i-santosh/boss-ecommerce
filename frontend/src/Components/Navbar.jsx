import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';





const Navbar = ()=>{

  const navigation = useNavigate();

  const useraccount = ()=>{

    navigation('/signin')
    
    }


    const mycart=()=>{

navigation('/cart')
    }


    const wishlist=()=>{

      navigation('/wish')
          }

  return (


  
<>




{/* 
<!--
  - NOTIFICATION TOAST
--> */}

{/* <div class="notification-toast" data-toast >

  <button class="toast-close-btn" data-toast-close>
    <ion-icon name="close-outline"></ion-icon>
  </button>

  <div class="toast-banner">
    <img src="./assets/images/products/jewellery-1.jpg" alt="Rose Gold Earrings" width="80" height="70"/>
  </div>

  <div class="toast-detail">
34t1
    <p class="toast-message">
      Someone in new just bought
    </p>

    <p class="toast-title">
      Rose Gold Earrings
    </p>

    <p class="toast-meta">
      <time datetime="PT2M">2 Minutes</time> ago
    </p>

  </div>

</div> */}





{/* <!--
  - HEADER
--> */}

<header>

  <div class="header-top">

    <div class="container">

      <ul class="header-social-container">

        <li>
          <a href="#" class="social-link">
            <ion-icon name="logo-facebook"></ion-icon>
          </a>
        </li>

        <li>
          <a href="#" class="social-link">
            <ion-icon name="logo-twitter"></ion-icon>
          </a>
        </li>

        <li>
          <a href="#" class="social-link">
            <ion-icon name="logo-instagram"></ion-icon>
          </a>
        </li>

        <li>
          <a href="#" class="social-link">
            <ion-icon name="logo-linkedin"></ion-icon>
          </a>
        </li>

      </ul>

      <div class="header-alert-news">
        <p>
          <b>Free Shipping</b>
          This Week Order Over - &#8377;1000 
        </p>
      </div>

      <div class="header-top-actions">

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

  <div class="header-main">

    <div class="container">

      <Link to="" class="header-logo">
        <img src="./assets/images/logo/boss-logo.svg" alt="Anon's logo" width="120" height="52"/>
      </Link>

      <div class="header-search-container">

        <input type="search" name="search" class="search-field" placeholder="Enter your product name..."/>

        <button class="search-btn">
          <ion-icon name="search-outline"></ion-icon>
        </button>

      </div>

      <div class="header-user-actions">

        <button class="action-btn" onClick={()=>{useraccount()}} >
          <ion-icon name="person-outline"></ion-icon>
        </button>

        <button class="action-btn" onClick={()=>{wishlist()}}>
          <ion-icon name="heart-outline"></ion-icon>
          <span class="count">0</span>
        </button>

        <button class="action-btn"onClick={()=>{mycart()}}>
          <ion-icon name="bag-handle-outline"></ion-icon>
          <span class="count">0</span>
        </button>

      </div>

    </div>

  </div>

  <nav class="desktop-navigation-menu">

    <div class="container">

      <ul class="desktop-menu-category-list">

        <li class="menu-category">
          <Link to="/" class="menu-title">Home</Link>
        </li>

        <li class="menu-category">
          <Link to="#" class="menu-title">Categories</Link>

          <div class="dropdown-panel">

             {/* <ul class="dropdown-panel-list">

              <li class="menu-title">
                <a href="#">Electronics</a>
              </li>

              <li class="panel-list-item">
                <a href="#">Desktop</a>
              </li>

              <li class="panel-list-item">
                <a href="#">Laptop</a>
              </li>

              <li class="panel-list-item">
                <a href="#">Camera</a>
              </li>

              <li class="panel-list-item">
                <a href="#">Tablet</a>
              </li>

              <li class="panel-list-item">
                <a href="#">Headphone</a>
              </li>

              <li class="panel-list-item">
                <a href="#">
                  <img src="./assets/images/electronics-banner-1.jpg" alt="headphone collection" width="250"
                    height="119">
                </a>
              </li>

            </ul> --> */}

            <ul class="dropdown-panel-list">

              <li class="menu-title">
                <a href="#">Men's</a>
              </li>

              <li class="panel-list-item">
                <a href="#">All Shoes</a>
              </li>

               
              <li class="panel-list-item">
                <a href="#">Running</a>
              </li>

            <li class="panel-list-item">
                <a href="#">Sandals</a>
              </li>



              <li class="panel-list-item">
                <a href="#">Clothings</a>
              </li>
              <li class="panel-list-item">
                <a href="#">Fashion Accessories</a>
              
              </li>

          

            

              <li class="panel-list-item">
                <a href="#">
                  <img src="./assets/images/mens-banner.jpg" alt="men's fashion" width="250" height="119"/>
                </a>
              </li>

            </ul>

            <ul class="dropdown-panel-list">

              <li class="menu-title">
                <a href="#">Women's</a>
              </li>

              <li class="panel-list-item">
                <a href="#">Running</a>
              </li>

              <li class="panel-list-item">
                <a href="#">GYM & Training</a>
              </li>

              <li class="panel-list-item">
                <a href="#">clothings</a>
              </li>

              <li class="panel-list-item">
                <a href="#">Fashion Accessories</a>
              </li>

              <li class="panel-list-item">
                <a href="#">
                  <img src="./assets/images/womens-banner.jpg" alt="women's fashion" width="250" height="119"/>
                </a>
              </li>

            </ul>

            {/* <!-- <ul class="dropdown-panel-list">

              <li class="menu-title">
                <a href="#">Electronics</a>
              </li>

              <li class="panel-list-item">
                <a href="#">Smart Watch</a>
              </li>

              <li class="panel-list-item">
                <a href="#">Smart TV</a>
              </li>

              <li class="panel-list-item">
                <a href="#">Keyboard</a>
              </li>

              <li class="panel-list-item">
                <a href="#">Mouse</a>
              </li>

              <li class="panel-list-item">
                <a href="#">Microphone</a>
              </li>

              <li class="panel-list-item">
                <a href="#">
                  <img src="./assets/images/electronics-banner-2.jpg" alt="mouse collection" width="250" height="119">
                </a>
              </li>

            </ul> --> */}

          </div>
        </li>

        <li class="menu-category">
          <a href="/men" class="menu-title">Men's</a>

          <ul class="dropdown-list">

            <li class="dropdown-item">
              <Link href="/menformal">Formals</Link>
            </li>

            <li class="dropdown-item">
              <Link href="/menshorts">Shorts & Jeans</Link>
            </li>

            <li class="dropdown-item">
              <Link href="/mentshirts">T-shirts</Link>
            </li>

            <li class="dropdown-item">
              <Link href="/menfashion">Fashion Accessories</Link>
            </li>

          </ul>
        </li>

        <li class="menu-category">
          <a href="/women" class="menu-title">Women's</a>

          <ul class="dropdown-list">

            <li class="dropdown-item">
              <Link href="#">Kurti</Link>
            </li>

            <li class="dropdown-item">
              <Link href="#">Saree</Link>
            </li>

            <li class="dropdown-item">
              <Link href="#">Western Dress</Link>
            </li>

            <li class="dropdown-item">
              <Link href="#">Fashion Accessories</Link>
            </li>

          </ul>
        </li>

        <li class="menu-category">
          <Link to="/about" class="menu-title">About</Link>

          {/* <ul class="dropdown-list">

            <li class="dropdown-item">
              <a href="#">Earrings</a>
            </li>

            <li class="dropdown-item">
              <a href="#">Couple Rings</a>
            </li>

            <li class="dropdown-item">
              <a href="#">Necklace</a>
            </li>

            <li class="dropdown-item">
              <a href="#">Bracelets</a>
            </li>

          </ul> */}
        </li>

        <li class="menu-category">
          <Link to="/contact" class="menu-title">Contact</Link>

          {/* <ul class="dropdown-list">

            <li class="dropdown-item">
              <a href="#">Clothes Perfume</a>
            </li>

            <li class="dropdown-item">
              <a href="#">Deodorant</a>
            </li>

            <li class="dropdown-item">
              <a href="#">Flower Fragrance</a>
            </li>

            <li class="dropdown-item">
              <a href="#">Air Freshener</a>
            </li>

          </ul> */}
        </li>


        <li class="menu-category">
          <Link to="/offers" class="menu-title">Hot Offers</Link>
        </li>

      </ul>

    </div>

  </nav>

  <div class="mobile-bottom-navigation">

    <button class="action-btn" data-mobile-menu-open-btn>
      <ion-icon name="menu-outline"></ion-icon>
    </button>

    <button class="action-btn">
      <ion-icon name="bag-handle-outline"></ion-icon>

      <span class="count">0</span>
    </button>

    <button class="action-btn">
      <ion-icon name="home-outline"></ion-icon>
    </button>

    <button class="action-btn">
      <ion-icon name="heart-outline"></ion-icon>

      <span class="count">0</span>
    </button>

    <button class="action-btn" data-mobile-menu-open-btn>
      <ion-icon name="grid-outline"></ion-icon>
    </button>

  </div>

  <nav class="mobile-navigation-menu  has-scrollbar" data-mobile-menu>

    <div class="menu-top">
      <h2 class="menu-title">Menu</h2>

      <button class="menu-close-btn" data-mobile-menu-close-btn>
        <ion-icon name="close-outline"></ion-icon>
      </button>
    </div>

    <ul class="mobile-menu-category-list">

      <li class="menu-category">
        <a href="#" class="menu-title">Home</a>
      </li>

      <li class="menu-category">

        <button class="accordion-menu" data-accordion-btn>
          <p class="menu-title">Men's</p>

          <div>
            <ion-icon name="add-outline" class="add-icon"></ion-icon>
            <ion-icon name="remove-outline" class="remove-icon"></ion-icon>
          </div>
        </button>

        <ul class="submenu-category-list" data-accordion>

          <li class="submenu-category">
            <a href="#" class="submenu-title">Shirt</a>
          </li>

          <li class="submenu-category">
            <a href="#" class="submenu-title">Shorts & Jeans</a>
          </li>

          <li class="submenu-category">
            <a href="#" class="submenu-title">Safety Shoes</a>
          </li>

          <li class="submenu-category">
            <a href="#" class="submenu-title">Wallet</a>
          </li>

        </ul>

      </li>

      <li class="menu-category">

        <button class="accordion-menu" data-accordion-btn>
          <p class="menu-title">Women's</p>

          <div>
            <ion-icon name="add-outline" class="add-icon"></ion-icon>
            <ion-icon name="remove-outline" class="remove-icon"></ion-icon>
          </div>
        </button>

        <ul class="submenu-category-list" data-accordion>

          <li class="submenu-category">
            <a href="#" class="submenu-title">Dress & Frock</a>
          </li>

          <li class="submenu-category">
            <a href="#" class="submenu-title">Earrings</a>
          </li>

          <li class="submenu-category">
            <a href="#" class="submenu-title">Necklace</a>
          </li>

          <li class="submenu-category">
            <a href="#" class="submenu-title">Makeup Kit</a>
          </li>

        </ul>

      </li>

      <li class="menu-category">

        <button class="accordion-menu" data-accordion-btn>
          <p class="menu-title">Jewelry</p>

          <div>
            <ion-icon name="add-outline" class="add-icon"></ion-icon>
            <ion-icon name="remove-outline" class="remove-icon"></ion-icon>
          </div>
        </button>

        <ul class="submenu-category-list" data-accordion>

          <li class="submenu-category">
            <a href="#" class="submenu-title">Earrings</a>
          </li>

          <li class="submenu-category">
            <a href="#" class="submenu-title">Couple Rings</a>
          </li>

          <li class="submenu-category">
            <a href="#" class="submenu-title">Necklace</a>
          </li>

          <li class="submenu-category">
            <a href="#" class="submenu-title">Bracelets</a>
          </li>

        </ul>

      </li>

      <li class="menu-category">

        <button class="accordion-menu" data-accordion-btn>
          <p class="menu-title">Perfume</p>

          <div>
            <ion-icon name="add-outline" class="add-icon"></ion-icon>
            <ion-icon name="remove-outline" class="remove-icon"></ion-icon>
          </div>
        </button>

        <ul class="submenu-category-list" data-accordion>

          <li class="submenu-category">
            <a href="#" class="submenu-title">Clothes Perfume</a>
          </li>

          <li class="submenu-category">
            <a href="#" class="submenu-title">Deodorant</a>
          </li>

          <li class="submenu-category">
            <a href="#" class="submenu-title">Flower Fragrance</a>
          </li>

          <li class="submenu-category">
            <a href="#" class="submenu-title">Air Freshener</a>
          </li>

        </ul>

      </li>
-
      <li class="menu-category">
        <a href="#" class="menu-title">Blog</a>
      </li>

      <li class="menu-category">
        <a href="#" class="menu-title">Hot Offers</a>
      </li>

    </ul>

    <div class="menu-bottom">

      <ul class="menu-category-list">

        <li class="menu-category">

          <button class="accordion-menu" data-accordion-btn>
            <p class="menu-title">Language</p>

            <ion-icon name="caret-back-outline" class="caret-back"></ion-icon>
          </button>

          <ul class="submenu-category-list" data-accordion>

            <li class="submenu-category">
              <a href="#" class="submenu-title">English</a>
            </li>

            <li class="submenu-category">
              <a href="#" class="submenu-title">Espa&ntilde;ol</a>
            </li>

            <li class="submenu-category">
              <a href="#" class="submenu-title">Fren&ccedil;h</a>
            </li>

          </ul>

        </li>

        <li class="menu-category">
          <button class="accordion-menu" data-accordion-btn>
            <p class="menu-title">Currency</p>
            <ion-icon name="caret-back-outline" class="caret-back"></ion-icon>
          </button>

          <ul class="submenu-category-list" data-accordion>
            <li class="submenu-category">
              <a href="#" class="submenu-title">USD &dollar;</a>
            </li>

            <li class="submenu-category">
              <a href="#" class="submenu-title">EUR &euro;</a>
            </li>
          </ul>
        </li>

      </ul>

      <ul class="menu-social-container">

        <li>
          <a href="#" class="social-link">
            <ion-icon name="logo-facebook"></ion-icon>
          </a>
        </li>

        <li>
          <a href="#" class="social-link">
            <ion-icon name="logo-twitter"></ion-icon>
          </a>
        </li>

        <li>
          <a href="#" class="social-link">
            <ion-icon name="logo-instagram"></ion-icon>
          </a>
        </li>

        <li>
          <a href="#" class="social-link">
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
