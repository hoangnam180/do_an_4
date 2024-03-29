import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import routes from 'src/configs/router';
import { API_SERVER } from 'src/constants/configs';
import { historyCheckoutDetail } from 'src/libs/apis/checkout';
import { formatcurrency } from 'src/utils/convertToFormatCurrency';

function HistoryDetail() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const res = await historyCheckoutDetail(id);
      if (res?.status === 'success') {
        setTotal(res?.total);
        setData(res?.data);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="checkout-container">
      <section className="page-header">
        <div className="overly"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="content text-center">
                <h1 className="mb-3">Chi tiết đơn hàng</h1>

                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb bg-transparent justify-content-center">
                    <li className="breadcrumb-item">
                      <Link to={routes.home}>Trang chủ</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Chi tiết đơn hàng
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
              <div className="product-list">
                <form className="cart-form">
                  <table
                    className="table shop_table shop_table_responsive cart"
                    cellSpacing="0"
                  >
                    <thead>
                      <tr>
                        <th className="product-thumbnail">Hình ảnh</th>
                        <th className="product-name">Sản phẩm</th>
                        <th className="product-property">Chi tiết</th>
                        <th className="product-price">Giá bán</th>
                        <th className="product-quantity pl-4">Số lượng</th>
                        <th className="product-subtotal">Tổng tiền</th>
                        <th className="product-remove"> </th>
                      </tr>
                    </thead>

                    <tbody>
                      {data?.map((item, index) => {
                        return (
                          <tr className="cart_item" key={index}>
                            <td
                              className="product-thumbnail"
                              data-title="Thumbnail"
                            >
                              <a href="/product-single">
                                <img
                                  style={{ width: '100%', height: '60px' }}
                                  src={`${API_SERVER}${item?.hinh_anh}`}
                                  className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                  alt=""
                                />
                              </a>
                            </td>

                            <td className="product-name" data-title="Product">
                              <Link>{item?.ten_san_pham}</Link>
                            </td>

                            <td
                              className="product-property"
                              data-title="Product"
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  gap: '10px',
                                  alignItems: 'flex-end',
                                }}
                              >
                                <p
                                  style={{
                                    backgroundColor: `${item?.hex}`,
                                    width: '30px',
                                    height: '30px',
                                    border: '1px solid #333',
                                    marginTop: 'auto',
                                    position: 'relative',
                                    top: '16px',
                                  }}
                                ></p>
                                <span>{item?.size}</span>
                              </div>
                            </td>

                            <td className="product-price" data-title="Price">
                              <span className="amount">
                                <span className="currencySymbol">
                                  <pre wp-pre-tag-3=""></pre>
                                </span>
                                {formatcurrency(item?.don_gia)}
                              </span>
                            </td>
                            <td
                              className="product-quantity"
                              data-title="Quantity"
                            >
                              <div className="quantity d-flex align-items-center">
                                <label className="sr-only">Số lượng</label>
                                <input
                                  type="number"
                                  id="qty"
                                  className={`input-text qty qty-${index} text`}
                                  min={1}
                                  max={100}
                                  defaultValue={item?.quantity || 1}
                                  title="Qty"
                                  disabled
                                />
                              </div>
                            </td>
                            <td className="product-subtotal" data-title="Total">
                              <span className="amount">
                                <span className="currencySymbol">
                                  <pre wp-pre-tag-3=""></pre>
                                </span>
                                {formatcurrency(item?.total)}
                              </span>
                            </td>
                            <td className="product-remove" data-title="Remove">
                              <Link
                                className="remove"
                                aria-label="Remove this item"
                                data-product_id="30"
                                data-product_sku=""
                              >
                                ×
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
          <div className="row justify-content-end">
            <div className="col-lg-4">
              <div className="cart-info card p-4 mt-4">
                <h4 className="mb-4">Tổng giỏ hàng</h4>
                <ul className="list-unstyled mb-4">
                  <li className="d-flex justify-content-between pb-2">
                    <h5>Tổng tiền</h5>
                    <span>{formatcurrency(total) || 0}</span>
                  </li>
                </ul>
                <Link to={routes?.checkout} className="btn btn-main btn-small">
                  Thanh toán
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default HistoryDetail;
