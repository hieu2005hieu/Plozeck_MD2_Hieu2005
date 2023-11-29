import React, { useEffect, useState } from "react";
import Heatder from "../../components/Heatder/Heatder";
import "../Cart/Cart.scss";
import FooterPage from "../../components/Foodter/FooterPage";
import { Link, useNavigate } from "react-router-dom";
import { errorNoti, successNoti } from "../../utils/notifycation";
import apiProduct from "../../service/api.product";
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveCart } from "../../store/redux-toolkit/cartSlice";

export default function Cart() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("userLogin"));
  const [dataCity, setDataCity] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataWard, setDataWard] = useState([]);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [cart, setCart] = useState(currentUser?.cart);
  const [phone, setPhone] = useState("");
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const hanldOderCart = async () => {
    let address = city + "," + district + "," + ward;
    if (cart.length == 0) {
      errorNoti("Chưa Có Sản Phẩm Để Thanh Toán");
      return;
    }
    if (city == "" || district == "" || ward == "") {
      errorNoti("Địa Chỉ Không Được Để Trống");
      return;
    }
    const regexPhone = /^(0|\+84)\d{9,10}$/;
    if (phone == "") {
      errorNoti("Số Điện Thoại Không Được Để Trống");
      return;
    }
    if (!regexPhone.test(phone)) {
      errorNoti("Số Điện Thoại Phải Có 10 Số,Đầu 09 ");
      return;
    }
    let newOrder = {
      user_id: currentUser.id,
      user_name: currentUser.name,
      address,
      phone,
      orderDetails: cart,
      status: "Wait",
      total,
    };
    apiProduct.updateStocks(cart);
    await axios.post("http://localhost:8000/bills", newOrder);
    setCart([]);
    //dua cart tren local ve rong
    let getCart = JSON.parse(localStorage.getItem("userLogin"));
    getCart.cart = [];
    localStorage.setItem("userLogin", JSON.stringify(getCart));
    dispatch(saveCart([]));
    successNoti("Thanh Toán Thành Công");
    navigate(`/titleoder/${currentUser.id}`);
  };
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const Btn_addtoCartspolist = () => {
    navigate("/Produc");
  };
  const handleTotalCart = () => {
    let result = cart?.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotal(result);
  };
  const handleProvinces = async () => {
    let data = await axios.get(`https://provinces.open-api.vn/api/`);
    setDataCity(data.data);
  };
  const handleCity = async (e) => {
    let idCity = +e.target.value;
    const nameCity = dataCity.find((item) => item.code == idCity);
    let data = await axios.get(
      `https://provinces.open-api.vn/api/p/${idCity}?depth=2`
    );
    setCity(nameCity.name);
    setDataDistrict(data.data.districts);
  };
  const handleDistrict = async (e) => {
    let idDistrict = +e.target.value;
    const nameDistrict = dataDistrict.find((item) => item.code == idDistrict);
    let data = await axios.get(
      `https://provinces.open-api.vn/api/d/${idDistrict}?depth=2`
    );
    setDistrict(nameDistrict.name);
    setDataWard(data.data.wards);
  };
  const handlDelete = (id) => {
    let index = cart.findIndex((item) => item.id === id);
    if (index > -1) {
      if (cart[index].quantity > 0) {
        if (confirm("Bạn Có Muốn Xóa Không")) {
          cart.splice(index, 1);
        }
      }
      dispatch(saveCart(cart));
      setCart([...cart]);
    }
  };
  const handleMinus = (index) => {
    const currentUser = JSON.parse(localStorage.getItem("userLogin"));
    const newCart = currentUser?.cart;
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
    } else {
      if (confirm("Bạn Có Muốn Xóa Không")) {
        newCart.splice(index, 1);
      }
    }
    dispatch(saveCart(newCart));
    setCart([...newCart]);
  };
  const handlePlus = (index) => {
    const currentUser = JSON.parse(localStorage.getItem("userLogin"));
    const newCart = currentUser.cart;
    newCart[index].quantity += 1;
    if (newCart[index].quantity > newCart[index].stock) {
      errorNoti("Không Đủ Số Lượng Trong Kho");
      return;
    }
    setCart([...newCart]);
  };
  useEffect(() => {
    localStorage.setItem("userLogin", JSON.stringify({ ...currentUser, cart }));
    handleTotalCart();
  }, [cart]);
  useEffect(() => {
    handleProvinces();
    handleCity();
    handleDistrict();
  }, [dataDistrict, dataWard]);
  return (
    <>
      <Heatder></Heatder>
      <div className="Cart_producsts">
        <hr />
        <h2>GIỎ HÀNG</h2>
        <hr />
      </div>
      <main className="mani_Cart">
        <div id="Contact_Cart">
          <table className="table_Cart">
            <thead className="theat_Cart">
              <tr>
                <th>Hình Ảnh</th>
                <th>Tên</th>
                <th>Giá</th>
                <th>Số Lượng</th>
                <th>Tổng Cộng</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="table_body_addtoCart">
              {cart?.map((item, index) => (
                <tr>
                  <td>
                    <img src={item.img} alt="" />
                  </td>
                  <td>
                    <p>{item.name}</p>
                  </td>
                  <td>
                    <p>{VND.format(item.price)}</p>
                  </td>
                  <td>
                    <div className="div_btn_toCart">
                      <button onClick={() => handleMinus(index)}>-</button>
                      <p>{item.quantity}</p>
                      <button onClick={() => handlePlus(index)}>+</button>
                    </div>
                  </td>
                  <td>
                    <p>{VND.format(item.quantity * item.price)}</p>
                  </td>
                  <td>
                    <button
                      className="btn_AddtoCartlitsto"
                      onClick={() => handlDelete(item.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>
                  <Link to="/Produc">
                    <button
                      className="Btn_addtoCartspolist"
                      onClick={Btn_addtoCartspolist}
                    >
                      -- Tiếp Tục xem sản phẩm--
                    </button>
                  </Link>
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="the_payable_amount">
            <h2 className="h2Cart">Tổng Thanh Toán</h2>
            <div className="payable_amount">
              <div className="total_Address_Phone">
                <p>Tổng Cộng: {VND.format(total)}</p>
                <p id="total_price_1" />
              </div>
              <div className="total_Address_Phone">
                <p>Địa chỉ:</p>
                <div>
                  <div className="address_Cart">
                    <select onChange={handleCity} id="city_Cart">
                      <option>Chọn tỉnh thành</option>
                      {dataCity.map((item, index) => (
                        <option value={item.code} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <select onChange={handleDistrict} id="district_Cart">
                      <option value="" defaultValue="">
                        Chọn quận huyện
                      </option>
                      {dataDistrict.map((item, index) => (
                        <option key={index} value={item.code}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <select
                      onChange={(e) => setWard(e.target.value)}
                      id="ward_Cart"
                    >
                      <option>Chọn phường xã</option>
                      {dataWard.map((item, index) => (
                        <option key={index}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                  <p id="Erorr_Cart" />
                </div>
              </div>
              <div className="total_Address_Phone">
                <p>SDT:</p>
                <div>
                  <p>
                    <input
                      id="phone_Cart"
                      type="number"
                      placeholder="Nhập Số Điện Thoại"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </p>
                  <p id="phoneError_Cart" />
                </div>
              </div>
              <div className="total_Address_Phone">
                <p>Tổng Số Tiền: {VND.format(total)}</p>
                <p id="total_price" />
              </div>
              <button type="button" onClick={hanldOderCart}>
                Tiến Hành Thanh Toán
              </button>
            </div>
          </div>
        </div>
      </main>

      <FooterPage></FooterPage>
    </>
  );
}
