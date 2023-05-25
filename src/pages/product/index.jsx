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
  RateProductAuth,
  RateProductPublic,
} from 'src/libs/apis/detail';
import { actionAddToCart } from 'src/store/cartSlice';

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRate, setLoadingRate] = useState(false);
  const [star, setStar] = useState(0);
  const [listRate, setListRate] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [indexActive, setIndexActive] = useState(null);
  const [size, setSize] = useState();
  const [color, setColor] = useState();
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
  const formatcurrency = (number) => {
    var x = parseInt(number);
    x = x.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    return x;
  };

  const onSubmit = async (data) => {
    const dataSubmit = { ...data, color };
    const findId = size?.find(
      (item) => item.id === Number(dataSubmit.size)
    )?.id_chi_tiet_san_pham;
    if (!findId || !color) {
      alert('Please choose size or color');
      return;
    }
    const res = 'success';
    if (res === 'success') {
      dispatch(
        actionToast({
          type: 'success',
          title: 'Thêm vào giỏ hàng thành công',
        })
      );
      dispatch(
        actionAddToCart({
          data: {
            ...product,
            id_chi_tiet_san_pham: findId,
            so_luong: dataSubmit.quantity,
            sizeSubmit: dataSubmit.size,
            color: color,
          },
          step: dataSubmit.quantity,
        })
      );
    }
  };

  const onSubmitRate = async (data) => {
    try {
      setLoadingRate(true);
      if (!isLogin) {
        const res = await RateProductPublic(id, { ...data, sao: star });
        if (res?.status === 'success') {
          setListRate([res?.data, ...listRate]);
          dispatch(
            actionToast({
              type: 'success',
              title: 'Rate success',
            })
          );
          setLoadingRate(false);
        } else {
          if (res?.message) {
            dispatch(actionToast({ title: res?.message, type: 'error' }));
          } else {
            for (let index = 0; index < res.errors.length; index++) {
              const element = res.errors[index][0];
              dispatch(actionToast({ title: element, type: 'error' }));
            }
          }
        }
        return;
      }
      const res = await RateProductAuth(id, { ...data, sao: star });
      if (res?.status === 'success') {
        setListRate([res?.data, ...listRate]);
        dispatch(
          actionToast({
            type: 'success',
            title: 'Rate success',
          })
        );
        setLoadingRate(false);
      } else {
        for (let index = 0; index < res.errors.length; index++) {
          const element = res.errors[index][0];
          dispatch(actionToast({ title: element, type: 'error' }));
        }
      }
    } catch (err) {
      setLoadingRate(false);
      dispatch(
        actionToast({
          type: 'error',
          title: 'Rate failed',
        })
      );
    } finally {
      setLoadingRate(false);
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
            title: 'Thêm sản phẩm vào danh sách yêu thích thành công',
          })
        );
      } else if (res?.status === 'erorr' && res?.erorr === 'the same key') {
        dispatch(
          actionToast({
            type: 'error',
            title: 'Sản phẩm này đã được thêm vào trước đó',
          })
        );
      }
    } catch (error) {
      dispatch(
        actionToast({
          type: 'error',
          title: 'Thêm sản phẩm vào danh sách yêu thất thất bại',
        })
      );
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
        setQuantity(data?.so_luong?.tong);
        setSize(data?.size);
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
                    <h1 className="mb-3">Chi Tiết Sản Phẩm</h1>

                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb bg-transparent justify-content-center">
                        <li className="breadcrumb-item">
                          <Link to={routes.home}>Trang chủ</Link>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Chi Tiết Sản Phẩm
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
              {quantity <= 0 ? (
                <h1>Sản phẩm này đang tạm hết hàng</h1>
              ) : (
                <>
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
                            Số lượng:{' '}
                            <span
                              style={{
                                color: `${quantity < 50 ? 'red ' : '#6c757d'}`,
                              }}
                            >
                              {quantity || ''}{' '}
                            </span>
                          </div>

                          <hr />

                          <h3 className="product-price">
                            {formatcurrency(
                              product?.data?.gia_ban *
                                ((100 - product?.data?.khuyen_mai) / 100)
                            ) || ''}{' '}
                            <del>
                              {product?.data?.khuyen_mai
                                ? formatcurrency(product?.data?.gia_ban)
                                : ''}{' '}
                            </del>
                          </h3>

                          <p className="product-description my-4 ">
                            {product?.data?.mo_ta_ngan || ''}
                          </p>

                          <div className="quantity d-flex align-items-center">
                            <input
                              defaultValue="1"
                              min={1}
                              {...register('quantity', {
                                required: true,
                                min: 1,
                                max: quantity || 1,
                              })}
                              type="number"
                              className="input-text qty text form-control w-25 mr-3"
                              name="quantity"
                            />

                            <button
                              type="submit"
                              className="btn btn-main btn-small"
                              onClick={() => {
                                if (!color) {
                                  dispatch(
                                    actionToast({
                                      type: 'error',
                                      title: 'Bạn chưa chọn màu sắc',
                                    })
                                  );
                                  return;
                                }
                              }}
                            >
                              Thêm vào giỏ hàng
                            </button>
                          </div>
                          {errors?.quantity && (
                            <span className="text-danger">
                              Số lượng phải từ 1 tới {quantity}
                            </span>
                          )}
                          <div className="color-swatches mt-4 d-flex align-items-center">
                            <span className="font-weight-bold text-capitalize product-meta-title">
                              màu :
                            </span>
                            <ul className="list-inline mb-0">
                              {product?.so_luong?.mau?.map((color, index) => {
                                return (
                                  <li className="list-inline-item" key={index}>
                                    <Link
                                      onClick={() => {
                                        setQuantity(color?.so_luong);
                                        setIndexActive(index);
                                        setColor(color?.id_mau);
                                        setSize(color?.size);
                                      }}
                                      style={{
                                        border: `1px solid ${
                                          index === indexActive
                                            ? '#007bff'
                                            : '#333'
                                        }`,
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
                              defaultValue={''}
                              onChange={(e) => {
                                const findIndex = size.find(
                                  (item) => item?.id === Number(e.target.value)
                                );
                                if (!findIndex || !findIndex?.so_luong) {
                                  dispatch(
                                    actionToast({
                                      title: 'Vui lòng chọn màu trước',
                                      type: 'error',
                                    })
                                  );
                                } else {
                                  setQuantity(findIndex?.so_luong);
                                }
                              }}
                            >
                              <option value="" key={0}>
                                Choose size
                              </option>
                              {size?.map((item) => (
                                <option key={item?.id} value={item?.id}>
                                  {item?.size || ''}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="products-meta mt-4">
                            <div className="product-category d-flex align-items-center">
                              <span className="font-weight-bold text-capitalize product-meta-title">
                                Danh mục :
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
                            Mô Tả
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
                            Thông tin chi tiết
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
                            Đánh giá({listRate?.length})
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
                              DRYRIDE Durashell™ 2-Layer Oxford Fabric
                              [10,000MM, 5,000G]
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
                              <strong>Màu </strong>
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
                                        <p style={{ marginBottom: '2px' }}>
                                          {item?.content}
                                        </p>
                                        {item?.children_content ? (
                                          <div>
                                            <span
                                              style={{
                                                cursor: 'pointer',
                                                fontWeight: 'bold',
                                              }}
                                              data-toggle="collapse"
                                              data-target={`#collapseExample-${item?.id}`}
                                              aria-expanded="false"
                                              aria-controls={`collapseExample-${item?.id}`}
                                            >
                                              xem câu trả lời ...
                                            </span>
                                            <div
                                              style={{ marginLeft: '10px' }}
                                              class="collapse"
                                              id={`collapseExample-${item?.id}`}
                                            >
                                              <h6
                                                style={{ marginBottom: '0px' }}
                                              >
                                                admin
                                              </h6>
                                              <p
                                                style={{ marginBottom: '0px' }}
                                              >
                                                {item?.children_content}
                                              </p>
                                            </div>
                                          </div>
                                        ) : (
                                          ''
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>

                            <div className="col-lg-5">
                              <div className="review-comment mt-5 mt-lg-0">
                                <h4 className="mb-3">Thêm một đánh giá</h4>
                                {loadingRate && (
                                  <div className="d-flex justify-content-center">
                                    <div class="spinner-border" role="status">
                                      <span class="sr-only">Loading...</span>
                                    </div>
                                  </div>
                                )}
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
                </>
              )}
            </div>
          </section>

          <section className="products related-products section">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="title text-center">
                    <h2>Có Thể Bạn Sẽ Thích</h2>
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
                        <span className="price">
                          {formatcurrency(item?.gia_ban) || ''}
                        </span>
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
