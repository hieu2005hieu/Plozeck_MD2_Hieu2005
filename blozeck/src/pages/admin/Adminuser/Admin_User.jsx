import React, { useEffect, useState } from "react";
import "../Adminuser/ADMIN.scss";
import { Link } from "react-router-dom";
import imgsa from "../../../../public/img/Logo2.jpg";

export default function Admin_User() {
   useEffect(() => {
     window.scrollTo(0, 0);
   }, []);
  let [user, setUser] = useState([]);
  
  const handleGetUser = () => {
    fetch("http://localhost:8000/User")
      .then((res) => res.json())
      .then((user) => {
        setUser([...user]);
      });
  };
  const hanldBan = (id) => {
    const infoUser = user.find((e) => e.id == id);
    fetch(`http://localhost:8000/User/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Các headers khác nếu cần
      },
      body: JSON.stringify({ status: !infoUser.status }),
    }).then(() => handleGetUser());
  };
  useEffect(() => {
    handleGetUser();
  }, []);
  return (
    <>
      <>
        <header className="headeradmin">
          <div className="logo_admin">
            <div className="logoADMIN">
              <img src={imgsa} alt="" />
            </div>
          </div>
          <div className="title1-header">
            <h2>Quản lí người dùng</h2>
          </div>
        </header>
        <main className="main--">
          <div id="title9">
            <div id="banner1">
              <h3>NAVICATION</h3>
              <div className="menu1">
                <div className="menu-one1">
                  <Link to="/AdminProduct">
                    <i className="fa-brands fa-codepen" />
                  </Link>
                  <Link to="/AdminProduct">
                    <h2>Quản lí sản phẩm</h2>
                  </Link>
                </div>
                <div
                  className="menu-one1"
                  style={{ backgroundColor: "whitesmoke", borderRadius: 20 }}
                >
                  <Link to="/AdminUser">
                    <i className="fa-solid fa-user" />
                  </Link>
                  <Link to="/AdminUser">
                    <h2>Quản lí người dùng</h2>
                  </Link>
                </div>
                <div className="menu-one1">
                  <Link to="/AdminManagement">
                    <i className="fa-solid fa-cart-shopping" />
                  </Link>
                  <Link to="/AdminManagement">
                    <h2>Quản lí đơn hàng</h2>
                  </Link>
                </div>
                <div className="menu-one1">
                  <Link to="/AdminCategory">
                    <i className="fa-brands fa-stack-overflow" />
                  </Link>
                  <Link to="/AdminCategory">
                    <h2>Phân loại sản phẩm</h2>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content98_user">
            <h3>Giao diện</h3>
            <div className="table-title_user">
              <table
                id="tableAdded_user "
                style={{ textAlign: "center", fontSize: 20 }}
              >
                <thead>
                  <tr className="tr1">
                    <th className="td1">id</th>
                    <th className="td1">Tên</th>
                    <th className="td1">Email</th>
                    <th className="td1">Tinh trạng</th>
                    <th className="td1">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {user.map((item) => {
                    return (
                      <tr className="tr1">
                        <td className="td1">{item.id}</td>
                        <td className="td1">{item.name}</td>
                        <td className="td1">{item.email}</td>
                        <td className="td1">
                          {item.status ? "active" : "ban"}
                        </td>
                        <td className="td1_btn_user">
                          <button onClick={() => hanldBan(item.id)}>
                            {item.role == "admin" ? <></> : item.status ? "Ban" : "Active"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </>
    </>
  );
}
