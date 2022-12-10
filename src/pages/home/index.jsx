import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination as Paginationn, Autoplay } from 'swiper';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getArrival,
  getBanner,
  getCategory,
  getProducts,
} from '../../libs/apis/home';
import { actionToast } from 'src/store/authSlice';
import routes from 'src/configs/router';
import { addWishListApi } from 'src/libs/apis/wishlist';
import { checkLogin } from 'src/utils/checkLogin';
import Loading from 'src/components/common/Loading';
import { API_SERVER } from 'src/constants/configs';

function Home() {
  const dataUser = useSelector((state) => state?.authReducer);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [products, setProducts] = useState([]);
  const [arrival, setArrival] = useState([]);
  const [category, setCategory] = useState([]);
  const [banner, setBanner] = useState([]);
  const isLogin = checkLogin(dataUser);
  const [loading, setLoading] = useState(false);
  const handleListHeart = async (data) => {
    if (!isLogin) {
      dispatch(
        actionToast({
          type: 'error',
          title: 'Please login to use this feature',
        })
      );
      return;
    }
    try {
      const body = { id_san_pham: data.id };
      const res = await addWishListApi(body);
      if (res?.status === 'success') {
        dispatch(
          actionToast({
            type: 'success',
            title: 'Add to wishlist successfully',
          })
        );
      } else if (res?.status === 'erorr' && res?.erorr === 'the same key') {
        dispatch(
          actionToast({
            type: 'error',
            title: 'This product is already in your wishlist',
          })
        );
      }
    } catch (error) {
      dispatch(actionToast({ type: 'error', title: 'Add to wishlist failed' }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const dataProducts = getProducts();
        const dataArrivals = getArrival();
        const dataCategory = getCategory();
        const dataBanner = getBanner();

        const [products, arrivals, category, banner] = await Promise.all([
          dataProducts,
          dataArrivals,
          dataCategory,
          dataBanner,
        ]);
        setCategory(category?.data);
        setProducts(products?.product);
        setArrival(arrivals?.sanPham);
        setBanner(banner?.data);
        var keys = [];

        for (var number in banner?.data?.[0]) {
          if (banner?.data?.[0].hasOwnProperty(number)) {
            if (banner?.data?.[0][number]?.length > 0) {
              keys.push(banner?.data?.[0][number]);
            }
          }
        }
        setBanner(keys);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="home-container">
          <Swiper
            spaceBetween={1}
            modules={[Navigation, Paginationn, Autoplay]}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 3000 }}
            className="main-slider slider slick-initialized slick-slider section"
          >
            {banner?.map((item, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className="slider-item"
                  style={{
                    backgroundImage: `url('${API_SERVER}${item}')`,
                    backgroundPosition: '50%',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-6 col-12 offset-lg-6 offset-md-6">
                        <div className="slider-caption">
                          <span className="lead">Trendy dress</span>
                          <h1 className="mt-2 mb-5">
                            <span className="text-color">Winter</span>
                            Collection
                          </h1>
                          <Link className="btn btn-main">Shop Now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <section className="category section pt-3 pb-0">
            <div className="container">
              <div className="row">
                {category?.map(
                  (item, index) =>
                    index < 3 && (
                      <div className="col-lg-4 col-sm-12 col-md-6" key={index}>
                        <div className="cat-item mb-4 mb-lg-0">
                          <img
                            style={{ height: '250px', width: '100%' }}
                            src={`${API_SERVER}${item?.hinh_anh}`}
                            alt=""
                            className="img-fluid"
                          />
                          <div className="item-info">
                            <p
                              style={{ textTransform: 'capitalize' }}
                              className="mb-0"
                            >
                              {item?.ten_danh_muc}
                            </p>
                            <h4 className="mb-4">
                              up to <strong>{item?.upto} 50% </strong>off
                            </h4>
                            <Link className="read-more">Shop now</Link>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </section>
          <section className="section products-main pb-0">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="title text-center">
                    <h2>New arrivals</h2>
                    <p>The best Online sales to shop these weekend</p>
                  </div>
                </div>
              </div>
              <div className="row">
                {products?.map((item, index) => {
                  return (
                    <div
                      className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5"
                      key={index}
                    >
                      <div className="product">
                        <div className="product-wrap">
                          <Link>
                            <img
                              style={{ height: '300px' }}
                              className="img-fluid w-100 mb-3 img-first"
                              src={`${API_SERVER}${item?.hinh_anh}`}
                              alt="product-img"
                            />
                          </Link>
                          <Link to={`${routes.detail}/${item?.id}`}>
                            <img
                              style={{ height: '300px' }}
                              className="img-fluid w-100 mb-3 img-second"
                              src={`${API_SERVER}${item?.hinh_anh}`}
                              alt="product-img"
                            />
                          </Link>
                        </div>
                        {item?.sale === true ? (
                          <span className="onsale">sale</span>
                        ) : (
                          ''
                        )}

                        <div className="product-hover-overlay">
                          <Link to={`${routes.detail}/${item?.id}`}>
                            <i className="tf-ion-android-cart"></i>
                          </Link>
                          <Link onClick={() => handleListHeart(item)}>
                            <i className="tf-ion-ios-heart"></i>
                          </Link>
                        </div>

                        <div className="product-info">
                          <h2 className="product-title h5 mb-0">
                            <Link>{item?.ten_san_pham}</Link>
                          </h2>
                          <span className="price">${item?.gia_ban}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <section className="section products-list pt-0">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <img
                    src="assets/images/adsv.jpg"
                    alt="Product big thumb"
                    className="img-fluid w-100"
                  />
                </div>
                <div className="col-lg-4 col-sm-6 col-md-6">
                  <div className="widget-featured-entries mt-5 mt-lg-0">
                    <h4 className="mb-4 pb-3">Best selllers</h4>
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
                    <div className="media mb-3">
                      <Link className="featured-entry-thumb" href="#">
                        <img
                          src="assets/images/p-2.jpg"
                          alt="Product thumb"
                          width="64"
                          className="img-fluid mr-3"
                        />
                      </Link>
                      <div className="media-body">
                        <h6 className="featured-entry-title mb-0">
                          <Link href="#">Nike - Brasilia Medium Backpack</Link>
                        </h6>
                        <p className="featured-entry-meta">$27.99</p>
                      </div>
                    </div>
                    <div className="media mb-3">
                      <Link className="featured-entry-thumb" href="#">
                        <img
                          src="assets/images/p-3.jpg"
                          alt="Product thumb"
                          width="64"
                          className="img-fluid mr-3"
                        />
                      </Link>
                      <div className="media-body">
                        <h6 className="featured-entry-title mb-0">
                          <Link href="#">Guess - GU7295</Link>
                        </h6>
                        <p>$38.00</p>
                      </div>
                    </div>
                    <div className="media mb-3">
                      <Link className="featured-entry-thumb" href="#">
                        <img
                          src="assets/images/p-4.jpg"
                          alt="Product thumb"
                          width="64"
                          className="img-fluid mr-3"
                        />
                      </Link>
                      <div className="media-body">
                        <h6 className="featured-entry-title mb-0">
                          <Link href="#">Adidas Originals Cap</Link>
                        </h6>
                        <p className="featured-entry-meta">$35.00</p>
                      </div>
                    </div>
                    <div className="media">
                      <Link className="featured-entry-thumb" href="#">
                        <img
                          src="assets/images/p-5.jpg"
                          alt="Product thumb"
                          width="64"
                          className="img-fluid mr-3"
                        />
                      </Link>
                      <div className="media-body">
                        <h6 className="featured-entry-title mb-0">
                          <Link href="#">Big Star Flip Tops</Link>
                        </h6>
                        <p className="featured-entry-meta">$10.60</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-md-6">
                  <div className="widget-featured-entries mt-5 mt-lg-0">
                    <h4 className="mb-4 pb-3">New Arrivals</h4>
                    {arrival?.map(
                      (item, index) =>
                        index < 5 && (
                          <div className="media mb-3" key={index}>
                            <Link
                              className="featured-entry-thumb"
                              to={`${routes.detail}/${item?.id}`}
                            >
                              <img
                                style={{
                                  height: '64px',
                                  width: '64px',
                                  objectFit: 'cover',
                                  overflow: 'hidden',
                                }}
                                src={`${API_SERVER}${item?.hinh_anh}`}
                                alt="Product thumb"
                                width="64"
                                className="img-fluid mr-3"
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
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="features border-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-md-6">
                  <div className="feature-block">
                    <i className="tf-ion-android-bicycle"></i>
                    <div className="content">
                      <h5>Free Shipping</h5>
                      <p>On all order over $39.00</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-md-6">
                  <div className="feature-block">
                    <i className="tf-wallet"></i>
                    <div className="content">
                      <h5>30 Days Return</h5>
                      <p>Money back Guarantee</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-md-6">
                  <div className="feature-block">
                    <i className="tf-key"></i>
                    <div className="content">
                      <h5>Secure Checkout</h5>
                      <p>100% Protected by paypal</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-md-6">
                  <div className="feature-block">
                    <i className="tf-clock"></i>
                    <div className="content">
                      <h5>24/7 Support</h5>
                      <p>All time customer support </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
export default Home;
