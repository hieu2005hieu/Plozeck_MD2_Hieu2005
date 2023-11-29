import React from "react";
import Heatder from "../../components/Heatder/Heatder";
import FooterPage from "../../components/Foodter/FooterPage";
import { useState } from "react";
import { useEffect } from "react";
import "../Products/Produc.scss";
import { successNoti } from "../../utils/notifycation";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveCart } from "../../store/redux-toolkit/cartSlice";
export default function Produc() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("userLogin"));
  const [cart, setCart] = useState(currentUser?.cart);
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(6);
  const handleGetCategory = () => {
    fetch("http://localhost:8000/category")
      .then((res) => res.json())
      .then((datas) => {
        setData([...datas]);
      });
  };
  const handleGetProducts = () => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((products) => {
        setProducts([...products]);
      });
  };
  useEffect(() => {
    handleGetCategory();
    handleGetProducts();
  }, []);

  const handleClick_category = (id) => {
    setSelectedCategory(id);
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
    localStorage.setItem("userLogin", JSON.stringify({ ...currentUser, cart }));
  }, [cart]);
  return (
    <>
      <Heatder></Heatder>
      <div className="category">
        {data.map((item, index) => {
          return (
            <div
              style={{
                borderColor: `${selectedCategory == item.id ? "#ff5b6a" : ""}`,
                borderWidth: `${selectedCategory == item.id ? "3px" : "1px"}`,
              }}
              key={index}
              className="categpry_css"
              onClick={() => handleClick_category(item.id)}
            >
              <img src={item.category_name} alt="" className="img_category" />
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
      <div className="products_category_scss">
        {products
          .filter((product) => product.category_id == selectedCategory)
          .map((item) => (
            <>
              <div className="producsts_title" key={item.id}>
                <Link to={`/details/${item.id}`}>
                  <img src={item.img} alt="" />
                  <hr />
                </Link>
                <div className="titele_products">
                  <p>{item.name}</p>
                  <p>Kho: {item.stock ? item.stock : "Hết Hàng"}</p>
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
            </>
          ))}
      </div>
      <FooterPage></FooterPage>
    </>
  );
}
