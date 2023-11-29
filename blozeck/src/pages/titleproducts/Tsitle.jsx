import React, { useEffect, useState } from "react";
import "../titleproducts/title.scss";
import Heatder from "../../components/Heatder/Heatder";
import FooterPage from "../../components/Foodter/FooterPage";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { successNoti } from "../../utils/notifycation";
import { saveCart } from "../../store/redux-toolkit/cartSlice";
import { useDispatch } from "react-redux";

export default function title() {
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    const dispatch = useDispatch();
   const currentUser = JSON.parse(localStorage.getItem("userLogin"));
   const [cart, setCart] = useState(currentUser?.cart);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const handleGetProduct = async () => {
    const info = await axios.get(`http://localhost:8000/products/${id}`);
    setProduct(info.data);
  };
const handlCLickAddtoCart = (product) => {
  let index = cart.findIndex((item) => item.id === product.id);
  if (index > -1) {
    successNoti("Sản Phẩm Đã Có Trong Giỏ Hàng,Tăng Số Lượng");
    cart[index].quantity += 1;
    setCart([...cart]);
  } else {
    successNoti("Thêm Vào Giỏ Hàng Thành Công");
    cart.push({ ...product, quantity: 1 });
    dispatch(saveCart(cart));
    setCart([...cart]);
  }
  };
    useEffect(() => {
      localStorage.setItem(
        "userLogin",
        JSON.stringify({ ...currentUser, cart })
      );
    }, [cart]);
  useEffect(() => {
    handleGetProduct();
  }, []);
  return (
    <>
      <Heatder></Heatder>
      
      <Link to={`/details/${product.id}`}>
        <div className="title_producsts_title">
          <div className="imgwh_scss">
            <img src={product.img} alt="" />
          </div>
          <div className="flex_titleProducst">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <h3>Giá: {VND.format(product.price)}</h3>
            <div className="btn_titel_producscsc">
              <p>Kho: {product.stock ? product.stock : "Hết Hàng"}</p>
            </div>
            <div className="btn_titel_producscsc2">
              <div>
                <button
                  className={`btn_category_producsts ${
                    product.stock === 0 ? "disabled" : ""
                  }`}
                  onClick={() => handlCLickAddtoCart(product)}
                  disabled={product.stock === 0 ? true : false}
                >
                  Thêm Vào Giỏ Hàng
                </button>
              </div>
              <div>
                <Link to="/Produc">
                  <button>--Xem Thêm Sản Phẩm Khác--</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        </Link>
  
      <FooterPage></FooterPage>
    </>
  );
}
