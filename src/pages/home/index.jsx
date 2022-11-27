import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination as Paginationn, Autoplay } from 'swiper';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getProducts } from '../../libs/apis/home';

import { actionAddToCart } from 'src/store/cartSlice';
import { actionToast } from 'src/store/authSlice';
import dataHome from 'src/dataFake/home';
import routes from 'src/configs/router';

function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [products, setProducts] = useState([]);
  const handleAddToCart = (data) => {
    dispatch(actionAddToCart({ data }));
    dispatch(
      actionToast({ type: 'success', title: 'Add to cart successfully' })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProducts();
      console.log(response);
    };
    fetchData();
  }, []);
  return (
    <div className="home-container">
      <Swiper
        spaceBetween={1}
        modules={[Navigation, Paginationn, Autoplay]}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 3000 }}
        className="main-slider slider slick-initialized slick-slider section"
        // scrollbar={{ draggable: true }}
      >
        {dataHome.banner?.map((item) => {
          return (
            <SwiperSlide
              key={item?.id}
              className="slider-item"
              style={{
                backgroundImage: `url('${item?.img}')`,
                backgroundPosition: '50%',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 col-12 offset-lg-6 offset-md-6">
                    <div className="slider-caption">
                      <span className="lead">{item?.caption?.text_top}</span>
                      <h1 className="mt-2 mb-5">
                        <span className="text-color">
                          {item?.caption?.text_center}
                        </span>
                        {item?.caption?.text_bottom}
                      </h1>
                      <a href="#" className="btn btn-main">
                        Shop Now
                      </a>
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
            {dataHome?.category?.map((item) => (
              <div className="col-lg-4 col-sm-12 col-md-6" key={item?.id}>
                <div className="cat-item mb-4 mb-lg-0">
                  <img src={item?.img} alt="" className="img-fluid" />
                  <div className="item-info">
                    <p className="mb-0">{item?.name}</p>
                    <h4 className="mb-4">
                      up to <strong>{item?.upto} </strong>off
                    </h4>
                    <a href="#" className="read-more">
                      Shop now
                    </a>
                  </div>
                </div>
              </div>
            ))}
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
            {dataHome?.products?.map((item) => {
              return (
                <div
                  className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5"
                  key={item?.id}
                >
                  <div className="product">
                    <div className="product-wrap">
                      <a href="/product-single">
                        <img
                          className="img-fluid w-100 mb-3 img-first"
                          src={item?.img}
                          alt="product-img"
                        />
                      </a>
                      <a href="/product-single">
                        <img
                          className="img-fluid w-100 mb-3 img-second"
                          src={item?.img}
                          alt="product-img"
                        />
                      </a>
                    </div>
                    {item?.sale === true ? (
                      <span className="onsale">sale</span>
                    ) : (
                      ''
                    )}

                    <div className="product-hover-overlay">
                      <Link onClick={() => handleAddToCart(item)}>
                        <i className="tf-ion-android-cart"></i>
                      </Link>
                      <Link>
                        <i className="tf-ion-ios-heart"></i>
                      </Link>
                    </div>

                    <div className="product-info">
                      <h2 className="product-title h5 mb-0">
                        <Link>{item?.name}</Link>
                      </h2>
                      <span className="price">${item?.price}</span>
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
                  <a className="featured-entry-thumb" href="/product-single">
                    <img
                      src="assets/images/p-1.jpg"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </a>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <a href="#">Keds - Kickstart Pom Pom</a>
                    </h6>
                    <p className="featured-entry-meta">$42.99</p>
                  </div>
                </div>
                <div className="media mb-3">
                  <a className="featured-entry-thumb" href="#">
                    <img
                      src="assets/images/p-2.jpg"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </a>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <a href="#">Nike - Brasilia Medium Backpack</a>
                    </h6>
                    <p className="featured-entry-meta">$27.99</p>
                  </div>
                </div>
                <div className="media mb-3">
                  <a className="featured-entry-thumb" href="#">
                    <img
                      src="assets/images/p-3.jpg"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </a>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <a href="#">Guess - GU7295</a>
                    </h6>
                    <p>$38.00</p>
                  </div>
                </div>
                <div className="media mb-3">
                  <a className="featured-entry-thumb" href="#">
                    <img
                      src="assets/images/p-4.jpg"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </a>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <a href="#">Adidas Originals Cap</a>
                    </h6>
                    <p className="featured-entry-meta">$35.00</p>
                  </div>
                </div>
                <div className="media">
                  <a className="featured-entry-thumb" href="#">
                    <img
                      src="assets/images/p-5.jpg"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </a>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <a href="#">Big Star Flip Tops</a>
                    </h6>
                    <p className="featured-entry-meta">$10.60</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-md-6">
              <div className="widget-featured-entries mt-5 mt-lg-0">
                <h4 className="mb-4 pb-3">New Arrivals</h4>
                <div className="media mb-3">
                  <a className="featured-entry-thumb" href="/product-single">
                    <img
                      src="assets/images/p-7.jpg"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </a>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <a href="#">Keds - Kickstart Pom Pom</a>
                    </h6>
                    <p className="featured-entry-meta">$42.99</p>
                  </div>
                </div>
                <div className="media mb-3">
                  <a className="featured-entry-thumb" href="#">
                    <img
                      src="assets/images/p-8.jpg"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </a>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <a href="#">Nike - Brasilia Medium Backpack</a>
                    </h6>
                    <p className="featured-entry-meta">$27.99</p>
                  </div>
                </div>
                <div className="media mb-3">
                  <a className="featured-entry-thumb" href="#">
                    <img
                      src="assets/images/p-1.jpg"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </a>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <a href="#">Guess - GU7295</a>
                    </h6>
                    <p>$38.00</p>
                  </div>
                </div>
                <div className="media mb-3">
                  <a className="featured-entry-thumb" href="#">
                    <img
                      src="assets/images/p-2.jpg"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </a>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <a href="#">Adidas Originals Cap</a>
                    </h6>
                    <p className="featured-entry-meta">$35.00</p>
                  </div>
                </div>
                <div className="media">
                  <a className="featured-entry-thumb" href="#">
                    <img
                      src="assets/images/p-4.jpg"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </a>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <a href="#">Big Star Flip Tops</a>
                    </h6>
                    <p className="featured-entry-meta">$10.60</p>
                  </div>
                </div>
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
  );
}
export default Home;
