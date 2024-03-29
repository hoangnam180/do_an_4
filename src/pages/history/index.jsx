import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from 'src/configs/router';
import { useCustomSearchParams } from 'src/hooks/useSeachParams';
import { historyCheckout } from 'src/libs/apis/checkout';
import { formatcurrency } from 'src/utils/convertToFormatCurrency';

function History() {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const refSearch = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useSelector((state) => state?.authReducer);

  const email = searchParams?.email;
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({
      ...searchParams,
      email: refSearch.current.value,
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      if (userInfo?.email) {
        try {
          setLoading(true);
          const res = await historyCheckout({
            email: userInfo?.email || email || '',
          });
          setData(res?.donhang);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          console.log(err);
        }
      }
      if (!email) return;
      try {
        setLoading(true);
        const res = await historyCheckout({
          email: email || '',
        });
        setData(res?.donhang);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);
  return (
    <div className="checkout-container">
      <section className="page-header">
        <div className="overly"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="content text-center">
                <h1 className="mb-3">Lịch sử mua hàng</h1>

                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb bg-transparent justify-content-center">
                    <li className="breadcrumb-item">
                      <Link to={routes.home}>Trang chủ</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Lịch sử mua hàng
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cart shopping page-wrapper">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <form action="">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    defaultValue={email}
                    ref={refSearch}
                  />
                  <div className="input-group-append">
                    <button
                      type="submit"
                      class="btn btn-primary p-0 pl-4 pr-4"
                      onClick={handleSearch}
                    >
                      <i class="tf-ion-android-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-12">
              <div className="product-list">
                <>
                  {loading ? (
                    <div className="text-center">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Đang tải...</span>
                      </div>
                    </div>
                  ) : data?.length > 0 ? (
                    <form className="cart-form">
                      <table
                        className="table shop_table shop_table_responsive cart"
                        cellSpacing="0"
                      >
                        <thead>
                          <tr>
                            <th className="product-thumbnail">Họ tên</th>
                            <th className="product-name">Email</th>
                            <th className="product-property">Số điện thoại</th>
                            <th className="product-price">Địa chỉ</th>
                            <th className="product-quantity pl-4">Ngày đặt</th>
                            <th className="product-subtotal">Tổng tiền</th>
                            <th className="product-remove"></th>
                          </tr>
                        </thead>

                        <tbody>
                          {data?.map((item, index) => {
                            return (
                              <tr className="cart_item" key={1}>
                                <td
                                  className="product-name"
                                  data-title="Họ và tên"
                                >
                                  <Link>{item?.nguoi_nhan}</Link>
                                </td>

                                <td
                                  className="product-name"
                                  data-title="Product"
                                >
                                  <Link>{item?.email}</Link>
                                </td>

                                <td
                                  className="product-name"
                                  data-title="Product"
                                >
                                  <Link>{item?.sdt}</Link>
                                </td>

                                <td
                                  className="product-price"
                                  data-title="Price"
                                >
                                  <span className="amount">
                                    <span className="currencySymbol">
                                      <pre wp-pre-tag-3=""></pre>
                                    </span>
                                    {item?.dia_chi}
                                  </span>
                                </td>
                                <td
                                  className="product-name"
                                  data-title="Quantity"
                                >
                                  <Link>{item?.created_at}</Link>
                                </td>
                                <td
                                  className="product-subtotal"
                                  data-title="Total"
                                >
                                  <span className="amount">
                                    <span className="currencySymbol">
                                      <pre wp-pre-tag-3=""></pre>
                                    </span>
                                    {formatcurrency(item?.tong_tien)}
                                  </span>
                                </td>
                                <td
                                  className="product-remove"
                                  data-title="Remove"
                                >
                                  <Link
                                    to={`/history/${item?.id}`}
                                    className="btn btn-small btn-primary"
                                  >
                                    Chi tiết
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </form>
                  ) : (
                    <div className="text-center">Không có dữ liệu</div>
                  )}
                </>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default History;
