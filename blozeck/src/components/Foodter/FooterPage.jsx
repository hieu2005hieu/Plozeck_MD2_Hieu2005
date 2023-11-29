

import React from "react";
import "../Foodter/FooterPage.scss"
// import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbootstrap";
const FooterPage = () => {
  return (
    <>
      <footer className="text-center text-lg-start bg-light text-muted containers">
        {/* Section: Social media */}
        {/* Section: Links  */}
        <section>
          <div className="container text-center text-md-start mt-5 ">
            {/* Grid row */}
            <div className="row mt-3">
              {/* Grid column */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 jjjjjj">
                {/* Content */}
                <h6 className="text-uppercase fw-bold mb-4 ">
                  <img
                    src="https://www.lotteria.vn/grs-static/images/lotteria_logo.svg"
                    alt=""
                    className="imgsss"
                  />
                </h6>
                <p className="p_logindddd">ĐĂNG KÝ NHẬN KHUYẾN MÃI</p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 jjjjjj">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">THÔNG TIN</h6>
                <p className="title_hovers">
                  <span href="#!" className="text-reset">
                    Tin tức
                  </span>
                </p>
                <p className="title_hovers">
                  <span href="#!" className="text-reset">
                    Khuyến mãi
                  </span>
                </p>
                <p className="title_hovers">
                  <span href="#!" className="text-reset">
                    Tuyển dụng
                  </span>
                </p>
                <p className="title_hovers">
                  <span href="#!" className="text-reset">
                    Nhượng quyền
                  </span>
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 jjjjjj">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">HỖ TRỢ</h6>
                <p className="title_hovers">
                  <span href="#!" className="text-reset">
                    Điều khoản sử dụng
                  </span>
                </p>
                <p className="title_hovers">
                  <span href="#!" className="text-reset">
                    Chính sách bảo mật
                  </span>
                </p>
                <p className="title_hovers">
                  <span href="#!" className="text-reset">
                    Chính sách giao hàng
                  </span>
                </p>
                <p className="title_hovers">
                  <span href="#!" className="text-reset">
                    Chăm Sóc Khách Hàng
                  </span>
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 jjjjjj">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">THEO DÕI</h6>
                <p className="imgsnpm">
                  <img
                    src="https://www.lotteria.vn/grs-static/images/icon-fb-2.svg"
                    alt=""
                    className="imgfczl"
                  />
                  Facebook
                </p>
                <p className="imgsnpm">
                  {" "}
                  <img
                    src="https://www.lotteria.vn/grs-static/images/icon-instagram.svg"
                    alt=""
                    className="imgfczl"
                  />
                  Instagram
                </p>
                <div className="imgnpm">
                  <img
                    src="https://www.lotteria.vn/grs-static/images/icon-appstore.png"
                    alt=""
                    className="immm"
                  />
                  <img
                    src="https://www.lotteria.vn/grs-static/images/icon-googleplay.png"
                    alt=""
                    className="immm"
                  />
                </div>
              </div>
              {/* Grid column */}
            </div>

            {/* Grid row */}
          </div>
        </section>
        {/* Section: Links  */}
        {/* Copyright */}
        <div
          className="text-center p-4 foooter"
          style={{
            backgroundColor: "#FF9EA2",
            fontSize: "20px",
            fontWeight: 600,
          }}
        >
          © 2023 Lotteria All Rights Reserved
          <span style={{ fontWeight: 200 }}> Site by LDCC</span>
        </div>
        {/* Copyright */}
      </footer>
      {/* Footer */}
    </>
  );
};

export default FooterPage;
