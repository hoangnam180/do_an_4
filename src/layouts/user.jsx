import PropsType from 'prop-types';
import { useEffect } from 'react';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
// import Footer from '../components/Footer';
// import Header from '../components/Header';
// import Login from 'src/components/Auth/Login';

// import { useSelector, useDispatch } from 'react-redux';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';

// import { actionAuthentication } from '../store/authSlice';

// import { protectPages } from 'src/utils/protectPages';

// import Login from '@components/Auth/Login';
// import Header from '@components/Header';
// import Footer from '@components/Footer';

UserLayout.prototype = {
  title: PropsType.string,
  description: PropsType.string,
  keywords: PropsType.string,
};

export default function UserLayout({ title, description, keywords, children }) {
  // const router = useRouter();
  // const dispatch = useDispatch();
  // const isAuth = useSelector((state) => state.authReducer.isAuth);

  // useEffect(() => {
  //   if (!isAuth && protectPages.includes(router.pathname)) {
  //     dispatch(
  //       actionAuthentication({
  //         isHandle: 'login',
  //       })
  //     );
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isAuth]);

  return (
    <>
      <div className="layout-user">
        <div id="preloder">
          <div className="loader"></div>
        </div>
        <div className="offcanvas-menu-overlay"></div>
        <Header />
        <div className="layout-user__main">
          {children}
          {/* <Login /> */}
        </div>
        <Footer />
      </div>
      <div className="search-model">
        <div className="h-100 d-flex align-items-center justify-content-center">
          <div className="search-close-switch">+</div>
          <form className="search-model-form">
            <input
              type="text"
              id="search-input"
              placeholder="Search here....."
            />
          </form>
        </div>
      </div>
    </>
  );
}

// UserLayout.defaultProps = {
//   title: 'Crocs',
//   description: 'Crocs description',
//   keywords: 'Crocs',
// };
