import 'jquery/dist/jquery.slim.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionLogout, actionToast } from 'src/store/authSlice';
function Header() {
  const data = useSelector((state) => state?.authReducer);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(actionLogout());
    dispatch(actionToast({ title: 'Logout Successfully!', type: 'success' }));
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white w-100 navigation"
      id="navbar"
    >
      <div className="container">
        <Link className="navbar-brand font-weight-bold" to={{ pathname: '/' }}>
          E-Shop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#main-navbar"
          aria-controls="main-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="main-navbar">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item active">
              <Link className="nav-link" to={{ pathname: '/' }}>
                Home
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" to={{ pathname: '/shop' }}>
                Search
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" to={{ pathname: '/about-us' }}>
                About-Us
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" to={{ pathname: '/cart' }}>
                Cart
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" to={{ pathname: '/profile' }}>
                Profile
              </Link>
            </li>
          </ul>
        </div>

        <ul
          className="top-menu list-inline mb-0 d-none d-lg-block"
          id="top-menu"
        >
          <li className="list-inline-item">
            <Link to="/shop" className="search_toggle" id="search-icon">
              <i className="tf-ion-android-search"></i>
            </Link>
          </li>
          <li className="dropdown cart-nav dropdown-slide list-inline-item">
            <a
              href="#"
              className="dropdown-toggle cart-icon"
              data-toggle="dropdown"
              data-hover="dropdown"
            >
              <i className="tf-ion-android-cart"></i>
            </a>
            <div className="dropdown-menu cart-dropdown">
              <div className="media">
                <a href="/product-single">
                  <img
                    className="media-object img- mr-3"
                    src="assets/images/cart-1.jpg"
                    alt="image"
                  />
                </a>
                <div className="media-body">
                  <h6>Ladies Bag</h6>
                  <div className="cart-price">
                    <span>1 x</span>
                    <span>1250.00</span>
                  </div>
                </div>
                <a href="#" className="remove">
                  <i className="tf-ion-close"></i>
                </a>
              </div>

              <div className="media">
                <a href="/product-single">
                  <img
                    className="media-object img-fluid mr-3"
                    src="assets/images/cart-2.jpg"
                    alt="image"
                  />
                </a>
                <div className="media-body">
                  <h6>Skinny Jeans</h6>
                  <div className="cart-price">
                    <span>1 x</span>
                    <span>1250.00</span>
                  </div>
                </div>
                <a href="#" className="remove">
                  <i className="tf-ion-close"></i>
                </a>
              </div>
              <div className="cart-summary">
                <span className="h6">Total</span>
                <span className="total-price h6">$1799.00</span>
                <div className="text-center cart-buttons mt-3">
                  <Link
                    to="/cart"
                    className="btn btn-small btn-transparent btn-block"
                  >
                    View Cart
                  </Link>
                  <Link
                    to="/checkout"
                    className="btn btn-small btn-main btn-block"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </li>
          <li className="nav-item dropdown dropdown-slide list-inline-item ">
            <a
              className="nav-link dropdown-toggle pd-0"
              href="#"
              id="navbarDropdown5"
              role="button"
              data-delay="350"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="tf-ion-ios-person mr-3"></i>
            </a>
            <ul
              className="dropdown-menu right-at"
              aria-labelledby="navbarDropdown5"
            >
              {data.userInfo && Number(data.isAuth) === 0 ? (
                <>
                  <li>
                    <Link to={{ pathname: '/profile' }}>profile</Link>
                  </li>
                  <li>
                    <Link to={{ pathname: '/forgot-password' }}>
                      Forgot Password
                    </Link>
                  </li>
                  <li>
                    <Link onClick={handleLogout}>Logout</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to={{ pathname: '/login' }}>Login</Link>
                  </li>
                  <li>
                    <Link to={{ pathname: '/signup' }}>SignUp</Link>
                  </li>
                </>
              )}
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Header;
