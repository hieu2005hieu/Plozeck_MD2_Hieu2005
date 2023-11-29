import React, { useEffect } from "react";
import "./Index.scss";
import Banner from "../Banner/Banner";
import BannerProduct from "../Banner/Banner_product";
import Heatder from "../../components/Heatder/Heatder";
import BannerTitle from "../Banner/BannerTitle";
import FooterPage from "../../components/Foodter/FooterPage.jsx";
import { useNavigate } from "react-router-dom";
// import { Footer } from "antd/es/layout/layout";

export default function Index() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const hanldClick1 = () => {
    navigate("/Bestsellner");
  };
  const hanldClick2 = () => {
    navigate("/Produc");
  };
  const hanldClick3 = () => {
    navigate("/Promotion");
  };
  const hanldClick4 = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <Heatder />
      <Banner />
      <div className="btn_menu">
        <div className="border-partial">
          <button className="btn_1" onClick={hanldClick1}>
            <img
              src="https://www.lotteria.vn/grs-static/images/icon-7.svg"
              alt=""
            />
            BESTSELLER
          </button>
        </div>
        <div className="border-partial">
          <button onClick={hanldClick2}>
            <img
              src="https://www.lotteria.vn/grs-static/images/icon-8.svg"
              alt=""
            />
            Đặt Hàng
          </button>
        </div>
        <div className="border-partial">
          <button onClick={hanldClick3}>
            {" "}
            <img
              src="https://www.lotteria.vn/grs-static/images/icon-9.svg"
              alt=""
            />
            Khuyến Mãi
          </button>
        </div>
        <div>
          <button className="btn_2" onClick={hanldClick4}>
            <img
              src="https://www.lotteria.vn/grs-static/images/icon-10.svg"
              alt=""
            />
            Cửa Hàng
          </button>
        </div>
      </div>
      <div className="title-female_male">
        <hr />
        <h2>Ưu Đãi Đặc Biệt</h2>
      </div>
      <BannerProduct />
      <main>
        <div className="title-female_male">
          <hr />
          <h2>Tin Tức</h2>
        </div>
        <BannerTitle />
      </main>
      <FooterPage></FooterPage>
    </>
  );
}
