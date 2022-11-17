import PropTypes from 'prop-types';
import Header from 'src/layouts/Header';
import Footer from 'src/layouts/Footer';

function LayoutDefault({ children }) {
  return (
    <div>
      <Header />
      <div className="wrapper-container">{children}</div>
      <Footer />
    </div>
  );
}
LayoutDefault.propTypes = {
  children: PropTypes.node.isRequired,
};
export default LayoutDefault;
