import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from 'src/configs/router';

function Checkout() {
  const { data, totalCart } = useSelector((state) => state.cartReducer);
  const states = [
    'An Giang',
    'Bac Giang',
    'Bac Kan',
    'Bac Lieu',
    'Bac Ninh',
    'Ba Ria-Vung Tau',
    'Ben Tre',
    'Binh Dinh',
    'Binh Duong',
    'Binh Phuoc',
    'Binh Thuan',
    'Ca Mau',
    'Cao Bang',
    'Dac Lak',
    'Dac Nong',
    'Dien Bien',
    'Dong Nai',
    'Dong Thap',
    'Gia Lai',
    'Ha Giang',
    'Hai Duong',
    'Ha Nam',
    'Ha Tay',
    'Ha Tinh',
    'Hau Giang',
    'Hoa Binh',
    'Hung Yen',
    'Khanh Hoa',
    'Kien Giang',
    'Kon Tum',
    'Lai Chau',
    'Lam Dong',
    'Lang Son',
    'Lao Cai',
    'Long An',
    'Nam Dinh',
    'Nghe An',
    'Ninh Binh',
    'Ninh Thuan',
    'Phu Tho',
    'Phu Yen',
    'Quang Binh',
    'Quang Nam',
    'Quang Ngai',
    'Quang Ninh',
    'Quang Tri',
    'Soc Trang',
    'Son La',
    'Tay Ninh',
    'Thai Binh',
    'Thai Nguyen',
    'Thanh Hoa',
    'Thua Thien-Hue',
    'Tien Giang',
    'Tra Vinh',
    'Tuyen Quang',
    'Vinh Long',
    'Vinh Phuc',
    'Yen Bai',
    'Can Tho',
    'Da Nang',
    'Hai Phong',
    'Hanoi',
    'Ho Chi Minh',
  ];
  return (
    <div className="checkout-container">
      <section className="page-header">
        <div className="overly"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="content text-center">
                <h1 className="mb-3">Checkout</h1>
                <p>
                  Hath after appear tree great fruitful green dominion moveth
                  sixth abundantly image that midst of god day multiply you’ll
                  which
                </p>

                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb bg-transparent justify-content-center">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Checkout
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-wrapper">
        <div className="checkout shopping">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 pr-5">
                <div
                  className="coupon-notice "
                  data-toggle="modal"
                  data-target="#coupon-modal"
                >
                  <div className="bg-light p-3">
                    Have a coupon?{' '}
                    <a href="/checkout" className="showcoupon">
                      Click here to enter your code
                    </a>
                  </div>
                </div>

                <div className="billing-details mt-5">
                  <h4 className="mb-4">Billing Details</h4>
                  <form className="checkout-form">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group mb-4">
                          <label htmlFor="first_name">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="first_name"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group mb-4">
                          <label htmlFor="last_name">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="last_name"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="company_name">Province</label>
                          <select
                            className="form-control"
                            onChange={(e) => {
                              console.log(e.target.value);
                            }}
                          >
                            <option value="">Select an Option</option>
                            {states.map((state, index) => (
                              <option key={index} value={state}>
                                {state}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="first_name">Street Address</label>
                          <input
                            type="text"
                            className="form-control"
                            id="street"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="first_name">District</label>
                          <input
                            type="text"
                            className="form-control"
                            id="city"
                            placeholder="Apartment"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="first_name">
                            Apartment, suite, unit etc. (optional) (optional)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="apartment"
                            placeholder="Apartment"
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="first_name">Phone </label>
                          <input
                            type="text"
                            className="form-control"
                            id="phone"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="first_name">Email address </label>
                          <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-check mb-4 pl-0">
                          <Link to={routes.signup}>Create an account?</Link>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-check mb-4 pl-0">
                          <Link to={routes.signup}>
                            Ship to a different address?
                          </Link>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="first_name">
                            Order notes (optional)
                          </label>
                          <textarea
                            className="form-control"
                            id="msg"
                            cols="30"
                            rows="5"
                            placeholder="Notes about order e:g: want to say something"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="product-checkout-details mt-5 mt-lg-0">
                  <h4 className="mb-4 border-bottom pb-4">Order Summary</h4>

                  {data?.map((item) => (
                    <div className="media product-card" key={item?.id}>
                      <p>{item?.name}</p>
                      <div className="media-body text-right">
                        <p className="h5">
                          {item?.quantity} x ${item?.price}
                        </p>
                      </div>
                    </div>
                  ))}

                  <ul className="summary-prices list-unstyled mb-4">
                    <li className="d-flex justify-content-between">
                      <span>Shipping:</span>
                      <span className="h5">Free</span>
                    </li>
                    <li className="d-flex justify-content-between">
                      <span>Total</span>
                      <span className="h5">${totalCart || 0}</span>
                    </li>
                  </ul>

                  <form action="#">
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="option1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios1"
                      >
                        Direct bank transfer
                      </label>

                      <div className="alert alert-secondary mt-3" role="alert">
                        Make your payment directly into our bank account. Please
                        use your Order ID as the payment reference. Your order
                        will not be shipped until the funds have cleared in our
                        account.
                      </div>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios2"
                        value="option2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios2"
                      >
                        Check payments
                      </label>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck3"
                      >
                        I have read and agree to the website terms and
                        conditions *
                      </label>
                    </div>
                  </form>

                  <div className="info mt-4 border-top pt-4 mb-5">
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our{' '}
                    <a href="#">privacy policy</a>.
                  </div>
                  <a href="/checkout" className="btn btn-main btn-small">
                    Place Order
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="coupon-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content py-5">
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Coupon Code"
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-main btn-small"
                  data-dismiss="modal"
                >
                  Apply Coupon
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Checkout;
