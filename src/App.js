import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Page404 from './pages/404page';
import AboutUs from './pages/abouts';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import ForgotPassword from './pages/forgotpass';
import Home from './pages/home';
import Login from './pages/login';
import SingleProduct from './pages/product';
import Profile from './pages/profile';
import Shop from './pages/shop';
import SignUp from './pages/signup';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/single-product" element={<SingleProduct />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}
export default App;
