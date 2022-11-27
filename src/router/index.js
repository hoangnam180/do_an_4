import routes from 'src/configs/router';
import Page404 from 'src/pages/404page';
import Cart from 'src/pages/cart';
import Checkout from 'src/pages/checkout';
import Home from 'src/pages/home';
import SingleProduct from 'src/pages/product';
import Profile from 'src/pages/profile';
import Shop from 'src/pages/shop';
import AboutUs from 'src/pages/abouts';
import ForgotPassword from 'src/components/Auth/forgotpass/ForgotPass';
import SignUp from 'src/components/Auth/SignUp';
import Login from 'src/components/Auth/Login';
import WithList from 'src/pages/WithList';
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
    children: [
      {
        path: routes.singleProduct,
        component: SingleProduct,
      },
    ],
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
  {
    path: routes.withList,
    component: WithList,
  },
];

export { publicRoutes, privateRoutes };
