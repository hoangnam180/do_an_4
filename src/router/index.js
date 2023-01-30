import routes from 'src/configs/router';
import Cart from 'src/pages/cart';
import Checkout from 'src/pages/checkout';
import Home from 'src/pages/home';
import SingleProduct from 'src/pages/product';
import Profile from 'src/pages/profile';
import Shop from 'src/pages/shop';
import AboutUs from 'src/pages/abouts';
import Search from 'src/pages/search';
import EditProfile from 'src/components/common/EditProfile';
import ForgotPassword from 'src/components/Auth/forgotpass/ForgotPass';
import History from 'src/pages/history';
import Login from 'src/components/Auth/Login';
import SignUp from 'src/components/Auth/SignUp';
import Page404 from 'src/pages/404Page';
import WithList from 'src/pages/WithList';
import HistoryDetail from 'src/pages/historyDetail';
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
    path: routes.shop,
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
  {
    path: routes.forgot,
    component: ForgotPassword,
  },
  {
    path: routes.search,
    component: Search,
  },
  {
    path: routes.history,
    component: History,
  },
  {
    path: routes.historyDetail,
    component: HistoryDetail,
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
  {
    path: routes.editProfile,
    component: EditProfile,
  },
];

export { publicRoutes, privateRoutes };
