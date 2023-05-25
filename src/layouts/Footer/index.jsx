function Footer() {
  return (
    <div className="footer-container">
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-4 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left mr-auto">
              <div className="footer-widget">
                <h4 className="mb-4">ShuShu</h4>
                <div className="">
                  <p className="mb-0">
                    <strong>Location : </strong>Đà Nẵng, Việt Nam
                  </p>
                  <p>
                    <strong>Email hỗ trợ: </strong> support@email.com
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-2 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left">
              <div className="footer-widget">
                <h4 className="mb-4">Danh mục</h4>
                <ul className="pl-0 list-unstyled mb-0">
                  <li>
                    <a href="#">sandal</a>
                  </li>
                  <li>
                    <a href="#">Giày cao gót</a>
                  </li>
                  <li>
                    <a href="#">Giày tây</a>
                  </li>
                  <li>
                    <a href="#">Giày Low top</a>
                  </li>
                  <li>
                    <a href="#">Giày Mid top</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-6 col-lg-2 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left">
              <div className="footer-widget">
                <h4 className="mb-4">Liên kết hữu ích</h4>
                <ul className="pl-0 list-unstyled mb-0">
                  <li>
                    <a href="#">Tin tức &amp; Mẹo</a>
                  </li>
                  <li>
                    <a href="#">Về chúng tôi</a>
                  </li>
                  <li>
                    <a href="#">Hỗ trợ</a>
                  </li>
                  <li>
                    <a href="#">Cửa hàng của chúng tôi</a>
                  </li>
                  <li>
                    <a href="#">Liên hệ</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 col-sm-6 text-center text-sm-left">
              <div className="footer-widget">
                <h4 className="mb-4">Giờ mở cửa</h4>
                <ul className="pl-0 list-unstyled mb-5">
                  <li className="d-lg-flex justify-content-between">
                    Thứ 2 - Thứ 6 <span>8.00-20.00</span>
                  </li>
                  <li className="d-lg-flex justify-content-between">
                    Thứ 7 <span>10.00-20.00</span>
                  </li>
                  <li className="d-lg-flex justify-content-between">
                    Chủ nhật <span>12-20.00</span>
                  </li>
                </ul>

                <h5>Gọi ngay : +84 0899 856 105</h5>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="footer-btm py-4 ">
        <div className="container">
          <div className="row ">
            <div className="col-lg-6">
              <p className="copyright mb-0 ">
                @ Copyright Reserved to therichpost &amp; made by{' '}
                <a href="https://therichpost.com/">therichpost</a>
              </p>
            </div>
            <div className="col-lg-6">
              <ul className="list-inline mb-0 footer-btm-links text-lg-right mt-2 mt-lg-0">
                <li className="list-inline-item">
                  <a href="#">Chính sách bảo mật</a>
                </li>
                <li className="list-inline-item">
                  <a href="#">Điều khoản &amp; Điều kiện</a>
                </li>
                <li className="list-inline-item">
                  <a href="#">Chính sách Cookie</a>
                </li>
                <li className="list-inline-item">
                  <a href="#">Hạn bán</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
