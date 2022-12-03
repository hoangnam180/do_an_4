import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from 'src/components/common/Loading';
import routes from 'src/configs/router';
import { API_SERVER } from 'src/constants/configs';
import { getDataFilter, searchFilter } from 'src/libs/apis/filter';
import { addWishListApi } from 'src/libs/apis/wishlist';
import { actionToast } from 'src/store/authSlice';
import { checkLogin } from 'src/utils/checkLogin';

function Shop() {
  const [data, setData] = useState([]);
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [productFilter, setProductFilter] = useState([]);
  const [reset, setReset] = useState(false);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state?.authReducer);
  const isLogin = checkLogin(dataUser);
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
      console.log(res);
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
      const data = await getDataFilter();
      setData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await searchFilter({ page, brand, id_danh_muc: category });
      setProductFilter(data?.san_pham?.data);
      setTotalPage(data?.san_pham?.last_page);
      setLoading(false);
    };
    fetchData();
  }, [reset, page]);

  console.log('data', page);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="shop-container">
          <section className="page-header">
            <div className="overly"></div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="content text-center">
                    <h1 className="mb-3">Shop</h1>
                    <p>
                      Hath after appear tree great fruitful green dominion
                      moveth sixth abundantly image that midst of god day
                      multiply you’ll which
                    </p>

                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb bg-transparent justify-content-center">
                        <li className="breadcrumb-item">
                          <a href="/">Home</a>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Shop
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            className="products-shop section"
            style={{ paddingTop: '10px' }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-9">
                  <div className="row align-items-center">
                    <div className="col-lg-12 mb-4 mb-lg-0">
                      <div className="section-title">
                        <h2 className="d-block text-left-sm">Shop</h2>

                        <div className="heading d-flex justify-content-between mb-5">
                          <p className="result-count mb-0">
                            {' '}
                            Showing 1–6 of 17 results
                          </p>
                          <form className="ordering " method="get">
                            <select
                              name="orderby"
                              className="orderby form-control"
                              aria-label="Shop order"
                            >
                              <option value="">Default sorting</option>
                              <option value="0">Sort by popularity</option>
                              <option value="1">Sort by average rating</option>
                              <option value="2">Sort by latest</option>
                              <option value="3">
                                Sort by price: low to high
                              </option>
                              <option value="4">
                                Sort by price: high to low
                              </option>
                            </select>
                            <input type="hidden" name="paged" value="1" />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    {productFilter?.length < 1 ? (
                      <h1>No Data</h1>
                    ) : (
                      productFilter.map((item) => (
                        <div
                          key={item?.id}
                          className="col-lg-4 col-12 col-md-6 col-sm-6 mb-5"
                        >
                          <div className="product">
                            <div className="product-wrap">
                              <Link to={`${routes.detail}/${item?.id}`}>
                                <img
                                  style={{ height: '250px' }}
                                  className="img-fluid w-100 mb-3 img-first"
                                  src={`${API_SERVER}${item?.hinh_anh}`}
                                  alt="product-img"
                                />
                              </Link>
                              <Link to={`${routes.detail}/${item?.id}`}>
                                <img
                                  style={{ height: '250px' }}
                                  className="img-fluid w-100 mb-3 img-second"
                                  src={`${API_SERVER}${item?.hinh_anh}`}
                                  alt="product-img"
                                />
                              </Link>
                            </div>

                            <span className="onsale">Sale</span>
                            <div className="product-hover-overlay">
                              <Link href="#">
                                <i className="tf-ion-android-cart"></i>
                              </Link>
                              <Link
                                href="#"
                                onClick={() => handleListHeart(item)}
                              >
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
                                ${item?.gia_ban || 0}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}

                    <div className="col-12">
                      <nav aria-label="Page navigation">
                        <ul className="pagination">
                          <li className="page-item">
                            <Link
                              className="page-link"
                              href="#"
                              aria-label="Previous"
                              onClick={() => setPage(page - 1)}
                            >
                              <span aria-hidden="true">&laquo;</span>
                            </Link>
                          </li>
                          {Array.from(Array(totalPage).keys()).map((item) => (
                            <li
                              onClick={() => setPage(item + 1)}
                              className={`page-item ${
                                item + 1 === page ? 'active' : ''
                              }`}
                              key={item}
                            >
                              <Link className="page-link" href="#">
                                {item + 1}
                              </Link>
                            </li>
                          ))}
                          <li className="page-item">
                            <Link
                              className="page-link"
                              href="#"
                              aria-label="Next"
                              onClick={() => setPage(page + 1)}
                            >
                              <span aria-hidden="true">&raquo;</span>
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <form className="mb-5" name="category">
                    <section className="widget widget-colors mb-5">
                      <h3 className="widget-title h4 mb-4">Shop by Category</h3>
                      <form className="ordering " method="get">
                        <select
                          name="category"
                          className="category form-control"
                          aria-label="Shop order"
                          style={{ textTransform: 'capitalize' }}
                          onChange={(e) => {
                            setCategory(e.target.value);
                          }}
                        >
                          {data?.danh_muc?.map((item, index) => (
                            <option
                              key={index}
                              style={{ textTransform: 'capitalize' }}
                              value={item?.id}
                            >
                              {item?.ten_danh_muc}
                            </option>
                          ))}
                        </select>
                        <input type="hidden" name="paged" value="1" />
                      </form>
                    </section>

                    <section className="widget widget-sizes mb-5">
                      <h3 className="widget-title h4 mb-4">Shop by Brand</h3>
                      {data?.brand?.map((item, index) => (
                        <div
                          key={index}
                          // className="custom-control custom-checkbox"
                        >
                          <input
                            type="radio"
                            className="custom-control-input"
                            name="brand"
                            id={item?.brand}
                            defaultChecked={index === -1}
                            onChange={async (e) => {
                              setBrand(item?.brand);
                            }}
                          />
                          <label
                            style={{
                              textTransform: 'capitalize',
                              marginLeft: '10px',
                              cursor: 'pointer',
                            }}
                            className="custom-control-label"
                            htmlFor={item?.brand}
                          >
                            {item?.brand}
                          </label>
                        </div>
                      ))}
                      <button
                        className="btn btn-primary btn-sm"
                        type="button"
                        onClick={async () => {
                          document
                            .querySelectorAll('input[name="brand"]')
                            .forEach((item) => {
                              item.checked = false;
                            });
                          setBrand('');
                          // reset category setlect option
                          document.querySelector(
                            'select[name="category"]'
                          ).value = '';
                          setCategory('');
                          setBrand('');
                          setReset(!reset);
                        }}
                      >
                        Reset
                      </button>
                    </section>

                    <button
                      type="button"
                      className="btn btn-black btn-small"
                      onClick={async () => {
                        try {
                          setLoading(true);
                          const data = await searchFilter({
                            brand,
                            id_danh_muc: category,
                          });
                          setProductFilter(data?.san_pham?.data);
                          setLoading(false);
                        } catch (error) {
                          console.log(error);
                          setLoading(false);
                        }
                      }}
                    >
                      Filter
                    </button>
                  </form>

                  <section className="widget widget-popular mb-5">
                    <h3 className="widget-title mb-4 h4">Popular Products</h3>
                    <a
                      className="popular-products-item media"
                      href="/product-single"
                    >
                      <img
                        src="assets/images/p-1.jpg"
                        alt=""
                        className="img-fluid mr-4"
                      />
                      <div className="media-body">
                        <h6>
                          Contrast <br />
                          Backpack
                        </h6>
                        <span className="price">$45</span>
                      </div>
                    </a>

                    <a
                      className="popular-products-item media"
                      href="/product-single"
                    >
                      <img
                        src="assets/images/p-2.jpg"
                        alt=""
                        className="img-fluid mr-4"
                      />
                      <div className="media-body">
                        <h6>
                          Hoodie with <br />
                          Logo
                        </h6>
                        <span className="price">$45</span>
                      </div>
                    </a>

                    <a
                      className="popular-products-item media"
                      href="/product-single"
                    >
                      <img
                        src="assets/images/p-3.jpg"
                        alt=""
                        className="img-fluid mr-4"
                      />
                      <div className="media-body">
                        <h6>
                          Traveller
                          <br />
                          Backpack
                        </h6>
                        <span className="price">$45</span>
                      </div>
                    </a>
                  </section>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
export default Shop;
