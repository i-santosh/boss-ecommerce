import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import LAYOUT from './Components/LAYOUT.jsx'
import Women from './Components/women.jsx'
import Hotdeals from './Components/Hotdeals.jsx'
import Admin from './Components/admin.jsx'
import About from './Components/about.jsx'
import Myaccount from './Components/myaccount.jsx'
import Cart from './Components/cart.jsx'
import Home from './Components/home.jsx'
import Contact from './Components/contact.jsx'
import Wishlist from './Components/wishlist.jsx'
import Men from './Components/men.jsx'
import Uservalidation from './Components/uservalidation.jsx'

//men section for clothing
import Formals from './Components/clothingcomponent/men/formals.jsx'
import Shorts from './Components/clothingcomponent/men/short$jeans.jsx'
import Tshirts from './Components/clothingcomponent/men/t-shirts.jsx'
import Fashionmen from './Components/clothingcomponent/men/fashion-accessories-men.jsx'
import Fashionwomen from './Components/clothingcomponent/women/fashion-accessories-women.jsx'
import Kurti from './Components/clothingcomponent/women/kurti.jsx' 








const router = createBrowserRouter(

   createRoutesFromElements(

<Route path='' element={<LAYOUT/>}>
<Route index element={<Home/>}/>
<Route path='/women' element={<Women/>}/>
<Route path='/offers' element={<Hotdeals/>}/>
<Route path='/about' element={<About/>}/>
<Route path='/account' element={<Myaccount/>}/>
<Route path='/admin' element={<Admin/>}/>
<Route path='/cart' element={<Cart/>}/>
<Route path='/contact' element={<Contact/>}/>
<Route path='/wish' element={<Wishlist/>}/>
<Route path='/men' element={<Men/>}/>
<Route path='/user' element={<Uservalidation/>}/>
<Route path='/menformal' element={<Formals/>}/>
<Route path='/menshorts' element={<Shorts/>}/>
<Route path='/mentshirts' element={<Tshirts/>}/>
<Route path='/menfashion' element={<Fashionmen/>}/>
<Route path='/womenafashion' element={<Fashionwomen/>}/>
<Route path='/kurti' element={<Kurti/>}/>



























</Route>











   )














)

















createRoot(document.getElementById('root')).render(
  <StrictMode>
<RouterProvider router={router}/>
  </StrictMode>
)
