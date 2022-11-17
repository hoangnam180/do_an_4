import routes from 'src/configs/router';
import Page404 from 'src/pages/404page';
import Cart from 'src/pages/cart';
import Checkout from 'src/pages/checkout';
import ForgotPassword from 'src/components/auth/forgotpass';
import Home from 'src/pages/home';
import Login from 'src/components/auth/login';
import SingleProduct from 'src/pages/product';
import Profile from 'src/pages/profile';
import Shop from 'src/pages/shop';
import SignUp from 'src/components/auth/signup';
import AboutUs from 'src/pages/abouts';
// Public routes
const publicRoutes = [
  {
    path: routes.home,
    component: Home,
  },

  {
    path: routes.cart,
    component: Cart,
  },
  {
    path: routes.checkout,
    component: Checkout,
  },
  {
    path: routes.detail,
    component: SingleProduct,
  },
  {
    path: routes.login,
    component: Login,
  },
  {
    path: routes.search,
    component: Shop,
  },
  {
    path: routes.signup,
    component: SignUp,
  },
  {
    path: routes.aboutUs,
    component: AboutUs,
  },

  { path: '*', component: Page404 },
];

// Private routes
const privateRoutes = [
  {
    path: routes.forgot,
    component: ForgotPassword,
  },
  {
    path: routes.profile,
    component: Profile,
  },
];

export { publicRoutes, privateRoutes };
