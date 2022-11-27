import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWishlistApi } from 'src/libs/apis/wishlist';

const WithList = () => {
  useEffect(() => {
    const fetchData = async () => {
      const res = await getWishlistApi();
      console.log(res);
    };
    fetchData();
  }, []);
  return (
    <div className="container">
      <div className="row pl-5 justify-content-center">
        <div className="col-lg-12 col-sm-12 col-md-12">
          <div className="row">
            <div className="col-lg-12 widget-featured-entries mt-5 mt-lg-0">
              <h4 className="mb-4 pb-3">With List</h4>
            </div>
            {/* Column */}
            <div className="col-lg-4">
              <div className="widget-featured-entries mt-5 mt-lg-0">
                <div className="media mb-3">
                  <Link className="featured-entry-thumb">
                    <img
                      src="assets/images/p-1.jpg"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </Link>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <Link href="#">Keds - Kickstart Pom Pom</Link>
                    </h6>
                    <p className="featured-entry-meta">$42.99</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithList;
