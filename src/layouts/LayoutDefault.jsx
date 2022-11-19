import PropTypes from 'prop-types';
import Header from 'src/layouts/Header';
import Footer from 'src/layouts/Footer';
import { ToastContainer } from 'react-toastify';
import Loading from 'src/components/common/Loading';
import { useSelector } from 'react-redux';

function LayoutDefault({ children }) {
  const loading = useSelector((state) => state.authReducer?.loading);
  console.log(loading);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className="wrapper-container">{children}</div>
          <Footer />
          <ToastContainer />
        </>
      )}
    </>
  );
}
LayoutDefault.propTypes = {
  children: PropTypes.node.isRequired,
};
export default LayoutDefault;
