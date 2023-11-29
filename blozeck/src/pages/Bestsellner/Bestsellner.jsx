import React, { useEffect, useState } from "react";
import Heatder from "../../components/Heatder/Heatder";
import FooterPage from "../../components/Foodter/FooterPage";
import { successNoti } from "../../utils/notifycation";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveCart } from "../../store/redux-toolkit/cartSlice";

export default function Bestsellner() {
  const dispatch = useDispatch();
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const currentUser = JSON.parse(localStorage.getItem("userLogin"));
  const [cart, setCart] = useState(currentUser?.cart);
  const [products, setProducts] = useState([]);
  const handleGetProducts = () => {
    fetch("http://localhost:8000/products?_sort=stock&_order=asc&_limit=8")
      .then((res) => res.json())
      .then((products) => {
        setProducts([...products]);
      });
  };
  useEffect(() => {
    handleGetProducts();
  }, []);
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
    localStorage.setItem("userLogin", JSON.stringify({ ...currentUser, cart }));
  }, [cart]);
  return (
    <>
      <Heatder></Heatder>
      <div className="container_bestseller">
        <hr />
        <h2>BESTSELLER</h2>
        <hr />
      </div>
      <div className="products_category_scss">
        {products.map((item) => {
          return (
            <div className="producsts_title">
              <Link to={`/details/${item.id}`}>
                <img src={item.img} alt="" />
                <hr />
              </Link>

              <div className="titele_products">
                <p>{item.name}</p>
                <p>Kho:{item.stock ? item.stock : "Hết Hàng"}</p>
                <p className="producst_price">{VND.format(item.price)}</p>
                <button
                  className={`btn_category_producsts ${
                    item.stock === 0 ? "disabled" : ""
                  }`}
                  onClick={() => handlCLickAddtoCart(item)}
                  disabled={item.stock === 0 ? true : false}
                >
                  Thêm Vào Giỏ Hàng
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <FooterPage></FooterPage>
    </>
  );
}
