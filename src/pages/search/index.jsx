import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSearchParams,
  Link,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import Loading from 'src/components/common/Loading';
import routes from 'src/configs/router';
import { API_SERVER } from 'src/constants/configs';
import { getSearch } from 'src/libs/apis/search';
import { addWishListApi } from 'src/libs/apis/wishlist';
import { actionToast } from 'src/store/authSlice';
import { checkLogin } from 'src/utils/checkLogin';

function Search() {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const navigate = useNavigate();
  const refInput = useRef(null);
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

  function handleSubmit(event) {
    event.preventDefault();
    const { value } = refInput.current;
    navigate({
      pathname: routes.search,
      search: createSearchParams({
        search: value,
      }).toString(),
    });
  }
  useEffect(() => {
    const fetchData = async () => {
      const search = searchParams.get('search');
      setLoading(true);
      try {
        if (search?.length > 0) {
          const result = await getSearch({ search, page });
          setLoading(false);
          setSearchResult(result?.data?.data);
          setTotalPage(result?.data?.last_page);
        } else {
          const result = await getSearch({ page });
          setLoading(false);
          setSearchResult(result?.data?.data);
          setTotalPage(result?.data?.last_page);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, [searchParams, page]);
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
                    <h1 className="mb-3">Search</h1>
                    <p>
                      Hath after appear tree great fruitful green dominion
                      moveth sixth abundantly image that midst of god day
                      multiply you’ll which
                    </p>

                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb bg-transparent justify-content-center">
                        <li className="breadcrumb-item">
                          <Link to={routes.home}>Home</Link>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Search
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <form onSubmit={handleSubmit}>
            <div className="input-group container mt-4">
              <input
                name="search"
                type="text"
                className="form-control bg-white"
                placeholder="Search....."
                ref={refInput}
              />
              <div className="input-group-append" style={{ width: '100px' }}>
                <button type="submit" className="btn btn-primary p-0 pl-4 pr-4">
                  <i
                    style={{ fontSize: '25px' }}
                    className="tf-ion-android-search"
                  ></i>
                </button>
              </div>
            </div>
          </form>
          <section
            className="products-shop section"
            style={{ paddingTop: '10px' }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="row align-items-center">
                    <div className="col-lg-12 mb-4 mb-lg-0">
                      <div className="section-title">
                        <h2 className="d-block text-left-sm">Search</h2>

                        <div className="heading d-flex justify-content-between mb-5">
                          <p className="result-count mb-0">
                            {' '}
                            Showing 1–8 of 17 results
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    {searchResult.map((item) => (
                      <div
                        key={item?.id}
                        className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5"
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
                            <span className="price">${item?.gia_ban || 0}</span>
                          </div>
                        </div>
                      </div>
                    ))}

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
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
export default Search;
