/* eslint-disable jsx-a11y/img-redundant-alt */
import 'jquery/dist/jquery.slim.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionLogout, actionToast } from 'src/store/authSlice';
import routes from 'src/configs/router';
import { useEffect, useState } from 'react';
function Header() {
  const [width, setWidth] = useState(window.innerWidth);
  const data = useSelector((state) => state?.authReducer);
  const cart = useSelector((state) => state?.cartReducer);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(actionLogout());
    dispatch(actionToast({ title: 'Logout Successfully!', type: 'success' }));
  };

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
    return () =>
      window.removeEventListener('resize', () => setWidth(window.innerWidth));
  }, []);
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
              <Link className="nav-link" to={{ pathname: routes.search }}>
                Search
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" to={{ pathname: routes.aboutUs }}>
                About-Us
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" to={{ pathname: routes.cart }}>
                Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={{ pathname: routes.profile }}>
                Profile
              </Link>
            </li>
            {width <= 768 && (
              <>
                {data.userInfo && data.isAuth === true ? (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to={{ pathname: routes.forgot }}
                      >
                        Forgot Password
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" onClick={handleLogout}>
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to={{ pathname: routes.login }}
                      >
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={routes.signup}>
                        SignUp
                      </Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </div>
        <ul
          className="top-menu list-inline mb-0 d-none d-lg-block"
          id="top-menu"
        >
          <li className="list-inline-item">
            <Link to={routes.search} className="search_toggle" id="search-icon">
              <i className="tf-ion-android-search"></i>
            </Link>
          </li>
          <li className="cart-nav nav-item dropdown dropdown-slide list-inline-item ">
            <span className="step">{cart?.step ? cart?.step : 0}</span>
            <Link
              className="nav-link dropdown-toggle pd-0"
              id="navbarDropdown5"
              role="button"
              data-delay="350"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="tf-ion-android-cart"></i>
            </Link>
            <ul
              className="dropdown-menu right-at"
              aria-labelledby="navbarDropdown5"
            >
              <li>
                <Link to={routes.cart}> View Cart</Link>
              </li>
              <li>
                <Link to={routes.checkout}>Checkout</Link>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown dropdown-slide list-inline-item ">
            <Link
              className="nav-link dropdown-toggle pd-0"
              id="navbarDropdown5"
              role="button"
              data-delay="350"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="tf-ion-ios-person mr-3"></i>
            </Link>
            <ul
              className="dropdown-menu right-at"
              aria-labelledby="navbarDropdown5"
            >
              {data.userInfo && data.isAuth === true ? (
                <>
                  <li>
                    <Link to={{ pathname: routes.profile }}>profile</Link>
                  </li>
                  <li>
                    <Link to={{ pathname: routes.forgot }}>
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
                    <Link to={{ pathname: routes.login }}>Login</Link>
                  </li>
                  <li>
                    <Link to={{ pathname: routes.signup }}>SignUp</Link>
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
