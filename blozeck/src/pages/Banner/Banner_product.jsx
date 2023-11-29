import React, { Component } from "react";
import Slider from "react-slick";
import "../Banner/Banner_product.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
export default class AutoPlayMethods extends Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }
  play() {
    this.slider.slickPlay();
  }
  pause() {
    this.slider.slickPause();
  }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1500,
    };
    return (
      <div style={{ overflow: "hidden", width: "80%", margin: "0 auto" }}>
        <Slider ref={(slider) => (this.slider = slider)} {...settings}>
          <Link to="/Produc" className="product_title">
            <div>
              <img
                src="https://cdn.lotteria.vn/media/catalog/product/m/e/menu_combo_183k.jpg"
                alt=""
              />
            </div>
            <div className="title">
              <h2>Combo 1</h2> <hr />
              <h4>03 Gà rán </h4>
              <h4>01 Burger Bulgogi</h4>
            </div>
          </Link>
          <Link to="/Produc" className="product_title">
            <div>
              <img
                src="https://cdn.lotteria.vn/media/catalog/product/m/e/menu_combo_81k_1_.jpg"
                alt=""
              />
            </div>
            <div className="title">
              <h2>Combo 2</h2> <hr />
              <h4>01 Gà rán </h4>
              <h4> 01 Mì ý (cỡ vừa)</h4>
            </div>
          </Link>
          <Link to="/Produc" className="product_title">
            <div>
              <img
                src="https://cdn.lotteria.vn/media/catalog/product/m/e/menu_ga_tu_vi_1.jpg"
                alt=""
              />
            </div>
            <div className="title">
              <h2>Gà Tứ Vị</h2>
              <hr />
              <h4>01 Gà mê mật</h4>
              <h4>01 Gà sốt HS</h4>
            </div>
          </Link>
          <Link to="/Produc" className="product_title">
            <div>
              <img
                src="https://cdn.lotteria.vn/media/catalog/product/m/e/menu_menu_1_.jpg"
                alt=""
              />
            </div>
            <div className="title">
              <h2>CB 75k Tặng Lon Pepsi/1 7Up Chanh</h2> <hr />
              <h4>02 Gà mê mật</h4>
              <h4>01 Pepsi (M)</h4>
            </div>
          </Link>
          <Link to="/Produc" className="product_title">
            <div>
              <img
                src="https://cdn.lotteria.vn/media/catalog/product/m/e/menu_menu_copy_2.jpg"
                alt=""
              />
            </div>
            <div className="title">
              <h2>Gà Mê Mật Phần Upsize</h2> <hr />
              <h4>02 Gà mê mật</h4>
              <h4>01 Khoai tây lắc</h4>
            </div>
          </Link>
          <Link to="/Produc" className="product_title">
            <div>
              <img
                src="https://cdn.lotteria.vn/media/catalog/product/m/e/menu_combo_142k.jpg"
                alt=""
              />
            </div>
            <div className="title">
              <h2>Combo 3</h2>
              <hr />
              <h4>02 Gà rán </h4>
              <h4>01 Burger tôm </h4>
            </div>
          </Link>
        </Slider>
      </div>
    );
  }
}
