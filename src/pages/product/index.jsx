import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from 'src/components/common/Loading';
import routes from 'src/configs/router';
import { API_SERVER } from 'src/constants/configs';
import { getProductDetail } from 'src/libs/apis/home';

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true);
      const data = await getProductDetail(id);
      console.log(data);
      setProduct(data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="single-product-container">
          <section className="page-header">
            <div className="overly"></div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="content text-center">
                    <h1 className="mb-3">Product Single</h1>
                    <p>
                      Hath after appear tree great fruitful green dominion
                      moveth sixth abundantly image that midst of god day
                      multiply you’ll which
                    </p>

                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb bg-transparent justify-content-center">
                        <li className="breadcrumb-item">
                          <Link to="/">Home</Link>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Product Single
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="single-product">
            <div className="container">
              <div className="row">
                <div className="col-md-5">
                  <div className="single-product-slider">
                    <div
                      className="carousel slide"
                      data-ride="carousel"
                      id="single-product-slider"
                    >
                      <div className="carousel-inner">
                        {product.hinh_anh &&
                          product.hinh_anh.map((image, index) => (
                            <div
                              key={index}
                              className={`carousel-item ${
                                index === 0 && 'active'
                              }`}
                            >
                              <img
                                src={`${API_SERVER}${image?.anh}`}
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                          ))}
                      </div>

                      <ol className="carousel-indicators">
                        {product.hinh_anh &&
                          product.hinh_anh.map((image, index) => (
                            <li
                              key={index}
                              data-target="#single-product-slider"
                              data-slide-to={index}
                              className="carousel-item"
                            >
                              <img
                                src={`${API_SERVER}${image?.anh}`}
                                alt=""
                                className={`carousel-item ${
                                  index === 0 && 'active'
                                }`}
                              />
                            </li>
                          ))}
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="col-md-7">
                  <div className="single-product-details mt-5 mt-lg-0">
                    <h2> {product?.data?.ten_san_pham || ''}</h2>
                    <div className="sku_wrapper mb-4">
                      Quantity:{' '}
                      <span className="text-muted">{product?.so_luong} </span>
                    </div>

                    <hr />

                    <h3 className="product-price">
                      ${product?.data?.gia_ban || ''} <del>$119.90</del>
                    </h3>

                    <p className="product-description my-4 ">
                      {product?.data?.mo_ta_ngan || ''}
                    </p>

                    <form className="cart" action="#" method="post">
                      <div className="quantity d-flex align-items-center">
                        <input
                          type="number"
                          id="#"
                          className="input-text qty text form-control w-25 mr-3"
                          step="1"
                          min="1"
                          max="9"
                          name="quantity"
                          defaultValue="1"
                          title="Qty"
                          size="4"
                        />
                        <a href="#" className="btn btn-main btn-small">
                          Add to cart
                        </a>
                      </div>
                    </form>

                    <div className="color-swatches mt-4 d-flex align-items-center">
                      <span className="font-weight-bold text-capitalize product-meta-title">
                        color:
                      </span>
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item">
                          <Link to={routes.detail} className="bg-info"></Link>
                        </li>
                        <li className="list-inline-item">
                          <Link to={routes.detail} className="bg-dark"></Link>
                        </li>
                        <li className="list-inline-item">
                          <Link to={routes.detail} className="bg-danger"></Link>
                        </li>
                      </ul>
                    </div>

                    <div className="product-size d-flex align-items-center mt-4">
                      <span className="font-weight-bold text-capitalize product-meta-title">
                        Size:
                      </span>
                      <select className="form-control">
                        {product?.size?.map((item) => (
                          <option key={item?.id} value={item?.id}>
                            {item?.size || ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="products-meta mt-4">
                      <div className="product-category d-flex align-items-center">
                        <span className="font-weight-bold text-capitalize product-meta-title">
                          Categories :
                        </span>
                        <a href="#">{product?.data?.ten_danh_muc || ''}</a>
                      </div>

                      <div className="product-share mt-5">
                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="tf-ion-social-facebook"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="tf-ion-social-twitter"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="tf-ion-social-linkedin"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="tf-ion-social-pinterest"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <nav className="product-info-tabs wc-tabs mt-5 mb-5">
                    <div
                      className="nav nav-tabs nav-fill"
                      id="nav-tab"
                      role="tablist"
                    >
                      <a
                        className="nav-item nav-link active"
                        id="nav-home-tab"
                        data-toggle="tab"
                        href="#nav-home"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true"
                      >
                        Description
                      </a>
                      <a
                        className="nav-item nav-link"
                        id="nav-profile-tab"
                        data-toggle="tab"
                        href="#nav-profile"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="false"
                      >
                        Additional Information
                      </a>
                      <a
                        className="nav-item nav-link"
                        id="nav-contact-tab"
                        data-toggle="tab"
                        href="#nav-contact"
                        role="tab"
                        aria-controls="nav-contact"
                        aria-selected="false"
                      >
                        Reviews(2)
                      </a>
                    </div>
                  </nav>

                  <div className="tab-content" id="nav-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="nav-home"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                    >
                      <p>{product?.data?.mo_ta_chi_tiet || ''}</p>

                      <h4>Product Features</h4>

                      <ul className="">
                        <li>
                          Mapped with 3M™ Thinsulate™ Insulation [40G Body /
                          Sleeves / Hood]
                        </li>
                        <li>Embossed Taffeta Lining</li>
                        <li>
                          DRYRIDE Durashell™ 2-Layer Oxford Fabric [10,000MM,
                          5,000G]
                        </li>
                      </ul>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                    >
                      <ul className="list-unstyled info-desc">
                        <li className="d-flex">
                          <strong>Color </strong>
                          <span>
                            {product?.mau?.map((item, idex) => (
                              <span key={idex}> {item?.ten_mau}, </span>
                            ))}
                          </span>
                        </li>
                        <li className="d-flex">
                          <strong>Size</strong>
                          <span>
                            {product?.size?.map((item, index) => (
                              <span key={index}> {item?.size}, </span>
                            ))}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-contact"
                      role="tabpanel"
                      aria-labelledby="nav-contact-tab"
                    >
                      <div className="row">
                        <div className="col-lg-7">
                          <div className="media review-block mb-4">
                            <img
                              src="assets/images/avater-1.jpg"
                              alt="reviewimg"
                              className="img-fluid mr-4"
                            />
                            <div className="media-body">
                              <div className="product-review">
                                <span>
                                  <i className="tf-ion-android-star"></i>
                                </span>
                                <span>
                                  <i className="tf-ion-android-star"></i>
                                </span>
                                <span>
                                  <i className="tf-ion-android-star"></i>
                                </span>
                                <span>
                                  <i className="tf-ion-android-star"></i>
                                </span>
                                <span>
                                  <i className="tf-ion-android-star"></i>
                                </span>
                              </div>
                              <h6>
                                Therichpost{' '}
                                <span className="text-sm text-muted font-weight-normal ml-3">
                                  -June 23, 2019
                                </span>
                              </h6>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Ipsum suscipit consequuntur
                                in, perspiciatis laudantium ipsa fugit. Iure
                                esse saepe error dolore quod.
                              </p>
                            </div>
                          </div>

                          <div className="media review-block">
                            <img
                              src="assets/images/avater-2.jpg"
                              alt="reviewimg"
                              className="img-fluid mr-4"
                            />
                            <div className="media-body">
                              <div className="product-review">
                                <span>
                                  <i className="tf-ion-android-star"></i>
                                </span>
                                <span>
                                  <i className="tf-ion-android-star"></i>
                                </span>
                                <span>
                                  <i className="tf-ion-android-star"></i>
                                </span>
                                <span>
                                  <i className="tf-ion-android-star"></i>
                                </span>
                                <span>
                                  <i className="tf-ion-android-star-outline"></i>
                                </span>
                              </div>
                              <h6>
                                Therichpost{' '}
                                <span className="text-sm text-muted font-weight-normal ml-3">
                                  -June 23, 2019
                                </span>
                              </h6>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Ipsum suscipit consequuntur
                                in, perspiciatis laudantium ipsa fugit. Iure
                                esse saepe error dolore quod.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-5">
                          <div className="review-comment mt-5 mt-lg-0">
                            <h4 className="mb-3">Add a Review</h4>

                            <form action="#">
                              <div className="starrr"></div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Your Name"
                                />
                              </div>
                              <div className="form-group">
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="Your Email"
                                />
                              </div>
                              <div className="form-group">
                                <textarea
                                  name="comment"
                                  id="comment"
                                  className="form-control"
                                  cols="30"
                                  rows="4"
                                  placeholder="Your Review"
                                ></textarea>
                              </div>

                              <Link
                                to={routes.detail}
                                className="btn btn-main btn-small"
                              >
                                Submit Review
                              </Link>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="products related-products section">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="title text-center">
                    <h2>You may like this</h2>
                    <p>The best Online sales to shop these weekend</p>
                  </div>
                </div>
              </div>
              <div className="row">
                {product?.san_pham_lien_quan?.map((item, index) => (
                  <div className="col-lg-3 col-6">
                    <div className="product">
                      <div className="product-wrap">
                        <Link to={`${routes.detail}/${item?.id}`}>
                          <img
                            className="img-fluid w-100 mb-3 img-first"
                            src={item?.hinh_anh}
                            alt="product-img"
                          />
                        </Link>
                        <Link to={`${routes.detail}/${item?.id}`}>
                          <img
                            className="img-fluid w-100 mb-3 img-second"
                            src="assets/images/444.jpg"
                            alt="product-img"
                          />
                        </Link>
                      </div>

                      <span className="onsale">Sale</span>
                      <div className="product-hover-overlay">
                        <a href="#">
                          <i className="tf-ion-android-cart"></i>
                        </a>
                        <a href="#">
                          <i className="tf-ion-ios-heart"></i>
                        </a>
                      </div>

                      <div className="product-info">
                        <h2 className="product-title h5 mb-0">
                          <Link to={`${routes.detail}/${item?.id}`}>
                            {item?.ten_san_pham || ''}
                          </Link>
                        </h2>
                        <span className="price">${item?.gia_ban || ''}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
export default SingleProduct;
