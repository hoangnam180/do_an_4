import { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { getProductDetail } from 'src/libs/apis/home';
import { addWishListApi } from 'src/libs/apis/wishlist';
import { actionToast } from 'src/store/authSlice';
import { checkLogin } from 'src/utils/checkLogin';

import Loading from 'src/components/common/Loading';

import routes from 'src/configs/router';

import { API_SERVER } from 'src/constants/configs';
import FormRate from './formRate/FormRate';
import {
  ListRate,
  RateProduct,
  RateProductAuth,
  RateProductPublic,
} from 'src/libs/apis/detail';

function SingleProduct() {
  const soluong = {
    tong: 200,
    mau: [
      {
        ten_mau: 'xanh',
        so_luong: 100,
        size: [
          { ten_size: 'M', so_luong: 50 },
          { ten_size: 'L', so_luong: 50 },
          { ten_size: 'XL', so_luong: 0 },
        ],
      },
      {
        ten_mau: 'do',
        so_luong: 100,
        size: [
          { ten_size: 'M', so_luong: 50 },
          { ten_size: 'L', so_luong: 50 },
          { ten_size: 'XL', so_luong: 0 },
        ],
      },
    ],
  };
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [star, setStar] = useState(0);
  const [listRate, setListRate] = useState([]);
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state?.authReducer);
  const isLogin = checkLogin(dataUser);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => console.log(data);

  const onSubmitRate = async (data) => {
    try {
      if (!isLogin) {
        const res = await RateProductPublic(id, { ...data, sao: star });
        if (res?.status === 'success') {
          setListRate([...listRate, res?.data]);
          dispatch(
            actionToast({
              type: 'success',
              title: 'Rate success',
            })
          );
        }
        return;
      }
      const res = await RateProductAuth(id, { ...data, sao: star });
      if (res?.status === 'success') {
        setListRate([...listRate, res?.data]);
        dispatch(
          actionToast({
            type: 'success',
            title: 'Rate success',
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
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
      try {
        setIsLoading(true);
        const data = await getProductDetail(id);
        const rate = await ListRate(id);
        setListRate(rate?.data);
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
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
                                src={`${API_SERVER}${image?.hinh_anh}`}
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
                                src={`${API_SERVER}${image?.hinh_anh}`}
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
                  <form onSubmit={handleSubmit(onSubmit)}>
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

                      <div className="quantity d-flex align-items-center">
                        <input
                          defaultValue="1"
                          {...register('quantity', {
                            required: true,
                            min: 1,
                            max: 10,
                          })}
                          type="number"
                          className="input-text qty text form-control w-25 mr-3"
                          name="quantity"
                        />

                        <button
                          type="submit"
                          className="btn btn-main btn-small"
                        >
                          Add to cart
                        </button>
                      </div>
                      {errors?.quantity && (
                        <span className="text-danger">
                          Quantity must be between 1 and 10
                        </span>
                      )}
                      <div className="color-swatches mt-4 d-flex align-items-center">
                        <span className="font-weight-bold text-capitalize product-meta-title">
                          color:
                        </span>
                        <ul className="list-inline mb-0">
                          {product?.mau?.map((color, index) => {
                            return (
                              <li className="list-inline-item" key={index}>
                                <Link
                                  to={routes.detail}
                                  style={{
                                    border: `1px solid #333`,
                                    backgroundColor: color?.hex,
                                  }}
                                ></Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      <div className="product-size d-flex align-items-center mt-4">
                        <span className="font-weight-bold text-capitalize product-meta-title">
                          Size:
                        </span>
                        <select
                          className="form-control"
                          {...register('size')}
                          required
                          placeholder="Size"
                        >
                          {product?.size?.map((item) => (
                            <option key={item?.id} value={item?.id}>
                              {item?.size || ''}
                            </option>
                          ))}
                        </select>
                      </div>
                      {
                        // how to conver number to arrays
                        // Array.from({length: 10}, (v, k) => k + 1)
                      }
                      <div className="products-meta mt-4">
                        <div className="product-category d-flex align-items-center">
                          <span className="font-weight-bold text-capitalize product-meta-title">
                            Categories :
                          </span>
                          <Link href="#">
                            {product?.data?.ten_danh_muc || ''}
                          </Link>
                        </div>

                        <div className="product-share mt-5">
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <Link href="#">
                                <i className="tf-ion-social-facebook"></i>
                              </Link>
                            </li>
                            <li className="list-inline-item">
                              <Link href="#">
                                <i className="tf-ion-social-twitter"></i>
                              </Link>
                            </li>
                            <li className="list-inline-item">
                              <Link href="#">
                                <i className="tf-ion-social-linkedin"></i>
                              </Link>
                            </li>
                            <li className="list-inline-item">
                              <Link href="#">
                                <i className="tf-ion-social-pinterest"></i>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </form>
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
                        Reviews({listRate?.length})
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
                          {listRate?.length > 0 &&
                            listRate?.map((item, index) => {
                              return (
                                <div
                                  key={item?.id}
                                  className="media review-block mb-4"
                                >
                                  <div className="media-body">
                                    <div className="product-review">
                                      <ReactStars
                                        count={5}
                                        size={24}
                                        value={item?.rate}
                                        edit={false}
                                        isHalf={true}
                                        emptyIcon={
                                          <i className="far fa-star"></i>
                                        }
                                        halfIcon={
                                          <i className="fa fa-star-half-alt"></i>
                                        }
                                        fullIcon={
                                          <i className="fa fa-star"></i>
                                        }
                                        activeColor="#ffd700"
                                      />
                                    </div>
                                    <h6>
                                      {item?.email}
                                      <span className="text-sm text-muted font-weight-normal ml-3">
                                        {new Date(
                                          item?.created_at
                                        ).toLocaleString('vi-VN')}
                                      </span>
                                    </h6>

                                    <p>{item?.content}</p>
                                  </div>
                                </div>
                              );
                            })}
                        </div>

                        <div className="col-lg-5">
                          <div className="review-comment mt-5 mt-lg-0">
                            <h4 className="mb-3">Add a Review</h4>
                            <FormRate
                              onSubmitRate={onSubmitRate}
                              setStar={setStar}
                            />
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
                  <div className="col-lg-3 col-6" key={index}>
                    <div className="product">
                      <div className="product-wrap">
                        <Link to={`${routes.detail}/${item?.id}`}>
                          <img
                            className="img-fluid w-100 mb-3 img-first"
                            src={`${API_SERVER}${item?.hinh_anh}`}
                            style={{ height: '300px' }}
                            alt="product-img"
                          />
                        </Link>
                        <Link to={`${routes.detail}/${item?.id}`}>
                          <img
                            className="img-fluid w-100 mb-3 img-second"
                            src={`${API_SERVER}${item?.hinh_anh}`}
                            style={{ height: '300px' }}
                            alt="product-img"
                          />
                        </Link>
                      </div>

                      <span className="onsale">Sale</span>
                      <div className="product-hover-overlay">
                        <Link>
                          <i className="tf-ion-android-cart"></i>
                        </Link>
                        <Link onClick={() => handleListHeart(item)}>
                          <i className="tf-ion-ios-heart"></i>
                        </Link>
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
