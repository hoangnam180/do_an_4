import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination as Paginationn, Autoplay } from 'swiper';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getArrival,
  getBanner,
  getBestSell,
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
  const [products, setProducts] = useState([]);
  const [arrival, setArrival] = useState([]);
  const [topSell, setTopSell] = useState([]);
  const [category, setCategory] = useState([]);
  const [banner, setBanner] = useState([]);
  const isLogin = checkLogin(dataUser);
  const [loading, setLoading] = useState(false);
  const formatcurrency = (number) => {
    var x = parseInt(number);
    x = x.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    return x;
  };
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
            title: 'Đã thêm sản phẩm vào danh sách yêu thích',
          })
        );
      } else if (res?.status === 'erorr' && res?.erorr === 'the same key') {
        dispatch(
          actionToast({
            type: 'error',
            title: 'Sản phẩm đã có trong danh sách yêu thích',
          })
        );
      }
    } catch (error) {
      dispatch(
        actionToast({
          type: 'error',
          title: 'Thêm sản phẩm vào danh sách yêu thích thất bại',
        })
      );
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
        const dataBestSell = getBestSell();

        const [products, arrivals, category, banner, bestsell] =
          await Promise.all([
            dataProducts,
            dataArrivals,
            dataCategory,
            dataBanner,
            dataBestSell,
          ]);
        setCategory(category?.data);
        setProducts(products?.product);
        setArrival(arrivals?.sanPham);
        setBanner(banner?.data);
        setTopSell(bestsell?.data);
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
                          <Link className="btn btn-main">Mua ngay</Link>
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
                              Lên đến <strong>{item?.upto} 50% </strong>
                            </h4>
                            <Link className="read-more">Mua ngay</Link>
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
                    <h2>Sản phẩm</h2>
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
                        {item?.khuyen_mai && item?.khuyen_mai > 0 ? (
                          <span className="onsale">{item?.khuyen_mai}%</span>
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
                          <div
                            style={{
                              display: 'flex',
                              gap: '30px',
                              alignItems: 'center',
                              marginLeft: '20px',
                            }}
                          >
                            <span className="price">
                              {formatcurrency(item?.gia_ban)}
                            </span>
                            <div>
                              {item?.so_luong !== 0 ? (
                                <span>Số lượng : {item?.so_luong}</span>
                              ) : (
                                <span style={{ color: 'red' }}>Hết hàng</span>
                              )}
                            </div>
                          </div>
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
                    <h4 className="mb-4 pb-3">Sản phẩm bán chạy</h4>
                    {topSell?.map(
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
                                ${formatcurrency(item?.gia_ban) || ''}
                              </p>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-md-6">
                  <div className="widget-featured-entries mt-5 mt-lg-0">
                    <h4 className="mb-4 pb-3">Sản phẩm mới</h4>
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
                                ${formatcurrency(item?.gia_ban) || ''}
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
                      <h5>Miễn phí giao hàng</h5>
                      <p>Tất cả sản phẩm trên 5.000.000đ</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-md-6">
                  <div className="feature-block">
                    <i className="tf-wallet"></i>
                    <div className="content">
                      <h5>Đổi trả trong vòng 30 ngày</h5>
                      <p>Đảm bảo hoàn tiền</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-md-6">
                  <div className="feature-block">
                    <i className="tf-key"></i>
                    <div className="content">
                      <h5>Bảo mật thanh toán</h5>
                      <p>100% được bảo vệ bởi Vnpay</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-md-6">
                  <div className="feature-block">
                    <i className="tf-clock"></i>
                    <div className="content">
                      <h5>Hỗ trợ 24/7</h5>
                      <p>Dành toàn thời gian để hỗ trợ khách hàng </p>
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
