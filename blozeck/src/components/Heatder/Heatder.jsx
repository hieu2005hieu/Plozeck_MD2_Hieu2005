import { GiShoppingCart } from "react-icons/gi";
import { CgArrowsExchange } from "react-icons/cg";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import React, { useEffect, useRef, useState } from "react";
import "../Heatder/Header.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import img from "../../../public/img/Logo.jpg";
import { successNoti } from "../../utils/notifycation";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../pages/config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { saveCart } from "../../store/redux-toolkit/cartSlice";
// import { useSelector, useDispatch } from "react-redux";

export default function Heatder() {
  const [userLogin, setUserLogin] = useState(
    JSON.parse(localStorage.getItem("userLogin")) || {}
  );
  const [open, setOpen] = useState("0");
  const [hiddenInfo, setHiddenInfo] = useState(true);
  const [imgUpload, setImgUpload] = useState(null);
  const [urlImage, setUrlImage] = useState(null);
  const cart = useSelector((state) => state.cartSlice.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlCLick = () => {
    navigate("/Login");
  };
  const handleScroll = () => {
    window.scrollTo(0, 0);
    navigate("/");
  };
  const handlCLickCArt = () => {
    navigate("/Cart");
  };
  const handleLogout = async () => {
    await axios.put(`http://localhost:8000/User/${userLogin.id}`, userLogin);
    setUserLogin({});
    setOpen("0");
    setHiddenInfo(true);
    dispatch(saveCart([]));
    localStorage.removeItem("userLogin");
    successNoti("Đã Đăng Xuất");
    navigate("/");
  };

  const changeAvatar = async (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setUrlImage(reader.result);
    };
    reader.readAsDataURL(file);
    console.log(file);
    if (file == null) return;
    const imageRef = ref(storage, `images/${file.name}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        const newInfoUser = {
          ...userLogin,
          avatar: url,
        };
        localStorage.setItem("userLogin", JSON.stringify(newInfoUser));
        axios.patch(`http://localhost:8000/User/${userLogin.id}`, {
          avatar: url,
        });
        setUserLogin(newInfoUser);
        setImgUpload(null);
        setUrlImage(null);
      });
    });
  };

  const status = useRef(true);
  const openInfo = () => {
    if (status.current) {
      setOpen("200px");
      status.current = false;
    } else {
      setOpen("0px");
      status.current = true;
    }
  };

  return (
    <>
      <div id="container1">
        <header>
          <div className="innerheader conten">
            <div onClick={handleScroll}>
              <span className="logo">
                <img src={img} alt="" className="imgs" />
              </span>
            </div>
            <nav>
              <ul id="menu">
                <li>
                  <NavLink to="/" className="menu-title">
                    Trang Chủ
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Bestsellner" className="menu-title">
                    BESTSELLER
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Produc" className="menu-title">
                    Đặt Hàng
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Promotion" className="menu-title">
                    Khuyến Mãi
                  </NavLink>
                </li>
              </ul>
            </nav>
            <nav style={{ position: "relative" }}>
              {userLogin && userLogin.name ? (
                <div id="card_login">
                  <div>
                    <span onClick={openInfo}>
                      <span>{userLogin.name}</span>
                      <span
                        style={{
                          display: "inline-block",
                          borderRadius: "50%",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          width={40}
                          height={40}
                          src={userLogin.avatar}
                          alt="img"
                        />
                      </span>
                      <CgArrowsExchangeAlt />
                    </span>
                    <span className="Stock_toCart">{cart.length}</span>
                    <GiShoppingCart
                      className="cart_LOgins hoverss"
                      onClick={handlCLickCArt}
                    />
                  </div>
                </div>
              ) : (
                <div id="card_login">
                  <div onClick={handlCLick} className="hoverbbbb">
                    Đăng Nhập
                    <CgArrowsExchangeAlt />
                  </div>
                </div>
              )}

              <div
                id="btn_info"
                // className={`${hiddenInfo ? "hidden" : ""}`}
                style={{
                  overflow: "hidden",
                  width: 150,
                  textAlign: "center",
                  padding: "10px 0",
                  height: open,
                  transition: "0.5s",
                }}
              >
                <div>
                  <Link to={`/titleoder/${userLogin.id}`}>
                    <button>Đơn Hàng</button>
                  </Link>
                </div>
                <button type="button">
                  <label style={{ cursor: "pointer" }} htmlFor="input_avatar">
                    Thay Đổi Avatar
                  </label>
                </button>
                <input
                  hidden
                  id="input_avatar"
                  type="file"
                  onChange={(e) => changeAvatar(e)}
                  accept="image/jpeg, image/png"
                />
                <button className="logins" onClick={handleLogout}>
                  Đăng Xuất
                </button>
              </div>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
}
