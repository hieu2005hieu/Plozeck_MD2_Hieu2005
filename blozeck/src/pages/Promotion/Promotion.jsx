import React, { useEffect } from "react";
import FooterPage from "../../components/Foodter/FooterPage";
import Heatder from "../../components/Heatder/Heatder";
import "../Banner/BannerTitle.scss";
import { Link } from "react-router-dom";
export default function Promotion() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Heatder></Heatder>
      <div className="containertitle">
        <Link to="/Promotion1" className="title">
          <img
            src="https://cdn.lotteria.vn/media/mageplaza/blog/post/resize/324.94152923538x208/n/s/nsp_thang_11-01_1.jpg"
            alt=""
          />
          <h4 className="dete">THÁNG 11 - RỘN RÃ CÙNG NHAU</h4>
          <div className="dete">31/10/2023</div>
          <hr />
          <div className="click_title">
            <p>XEM THÊM</p>
          </div>
        </Link>
        <Link to="/Promotion2" className="title">
          <img
            src="https://cdn.lotteria.vn/media/mageplaza/blog/post/resize/369.47003994674x208/c/o/cover_ga_me_mat-01_1.jpg"
            alt=""
          />
          <h4 className="dete">HONEYHOLIC CHICKEN - GÀ MẬT</h4>
          <div className="dete">25/10/2023</div>
          <hr />
          <div className="click_title">
            <p>XEM THÊM</p>
          </div>
        </Link>
        <Link to="/Promotion3" className="title">
          <img
            src="https://cdn.lotteria.vn/media/mageplaza/blog/post/resize/296.72448x208/t/h/thang_11_-_11k_1070x750mm_-01_1_.jpg"
            alt=""
          />
          <h4 className="dete">GIAO HÀNG LIỀN TAY- NHẬN ƯU ĐÃI</h4>
          <div className="dete">30/10/2023</div>
          <hr />
          <div className="click_title">
            <p>XEM THÊM</p>
          </div>
        </Link>
        <Link to="/Promotion4" className="title">
          <img
            src="https://cdn.lotteria.vn/media/mageplaza/blog/post/resize/296.79104x208/l/o/loya_card_1070x750-01.jpg"
            alt=""
          />
          <h4 className="dete">Chương Trình Loyalty Card</h4>
          <div className="dete">14/11/2023</div>
          <hr />
          <div className="click_title">
            <p>XEM THÊM</p>
          </div>
        </Link>
      </div>
      <div className="containerrs">
        <Link to="/Promotion5">
          <div className="title12">
            <img
              src="https://cdn.lotteria.vn/media/mageplaza/blog/post/resize/296.77196351416x208/t/_/t_i_app_t_ng_g_.jpg"
              alt=""
            />
            <h4 className="dete12">TẢI APP LIỀN TAY NHẬN GÀ RÁN</h4>
            <div className="dete12">31/08/2023</div>
            <hr />
            <div className="click_title12">
              <p>XEM THÊM</p>
            </div>
          </div>
        </Link>
      </div>

      <FooterPage></FooterPage>
    </>
  );
}
