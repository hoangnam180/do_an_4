import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from 'src/components/common/Loading';
import routes from 'src/configs/router';
import { API_SERVER } from 'src/constants/configs';
import { getWishlistApi } from 'src/libs/apis/wishlist';

const WithList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getWishlistApi();
      if (res?.data?.success) {
        setWishlist(res?.data?.data);
      }
      setLoading(false);
      setWishlist(res?.data);
    };
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          <div className="row pl-5 justify-content-center">
            <div className="col-lg-12 col-sm-12 col-md-12">
              <div className="row">
                <div className="col-lg-12 widget-featured-entries mt-5 mt-lg-0">
                  <h4 className="mb-4 pb-3">With List</h4>
                </div>
                {/* Column */}
                {wishlist.map((item) => (
                  <div key={item?.id} className="col-lg-4">
                    <div className="widget-featured-entries mt-5 mt-lg-0">
                      <div className="media mb-3">
                        <Link
                          to={`${routes.detail}/${item?.id}`}
                          className="featured-entry-thumb"
                        >
                          <img
                            src={`${API_SERVER}${item?.hinh_anh}`}
                            alt="Product thumb"
                            width="64"
                            className="img-fluid mr-3"
                            style={{ height: '64px  ' }}
                          />
                        </Link>
                        <div className="media-body">
                          <h6 className="featured-entry-title mb-0">
                            <Link to={`${routes.detail}/${item?.id}`}>
                              {item?.ten_san_pham || ''}
                            </Link>
                          </h6>
                          <p className="featured-entry-meta">
                            ${item?.gia_ban || ''}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WithList;
