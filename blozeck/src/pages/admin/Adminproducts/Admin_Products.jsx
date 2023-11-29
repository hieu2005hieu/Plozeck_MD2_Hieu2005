import React, { useEffect } from "react";
import "../Adminuser/ADMIN.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import imgsa from "../../../../public/img/Logo2.jpg";
import { useState } from "react";
import { storage } from "../../config/firebase.js";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { Pagination } from "antd";
import axios from "axios";
export default function Admin_Products() {
   useEffect(() => {
     window.scrollTo(0, 0);
   }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState([]);
  const [imgUpload, setImgUpload] = useState(null);
  const [co, setCo] = useState(true);
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  let [products, setProducts] = useState([]);
  const handleGetProducts = () => {
    fetch("http://localhost:8000/products?_sort=id&_order=desc")
      .then((res) => res.json())
      .then((products) => {
        setProducts([...products]);
      });
  };

  const [urlImage, setUrlImage] = useState(null);
  const handlOnchangeADMIN = (e) => {
    setSearch(e.target.value.toLowerCase());
  };
  const changeImage = (e) => {
    let file = e.target.files[0];
    setImgUpload(file);
    const reader = new FileReader();
    reader.onload = () => {
      setUrlImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const renderProducts = () => {
    return products.filter((item) => item.name.toLowerCase().includes(search));
  };
  const newArr = renderProducts();
  const itemsPerPage = 6;
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const displayedProducts = newArr.slice(startIndex, endIndex);
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  let [data, setData] = useState([]);
  const handleGetCategory = () => {
    fetch("http://localhost:8000/category")
      .then((res) => res.json())
      .then((datas) => {
        setData([...datas]);
      });
  };
  const [newproducst, setNewproducst] = useState({
    id: "",
    name: "",
    price: "",
    category_id: "",
    stock: "",
  });
  const onADDproducst = (e) => {
    setNewproducst({ ...newproducst, [e.target.name]: e.target.value });
  };
  const ADDPRODUCSTs = async () => {
    if (imgUpload == null) return;
    const imageRef = ref(storage, `images/${imgUpload.name}`);
    uploadBytes(imageRef, imgUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        // Gửi yêu cầu POST đến API và lưu kết quả trả về
        const response = await axios.post("http://localhost:8000/products", {
          ...newproducst,
          img: url,
          price: +newproducst.price,
          category_id: +newproducst.category_id,
        });
        // Cập nhật state để thêm sản phẩm mới vào danh sách
        setProducts((dataCurrent) => [...dataCurrent, response.data]);
        // Reset dữ liệu của sản phẩm mới
        setNewproducst({
          id: "",
          name: "",
          price: "",
          category_id: "",
          stock: "",
        });
        setCo(!co);
        setImgUpload(null);
        setUrlImage(null);
      });
    });
  };

  let [isEditing, setIsEditing] = useState([]);

  const handleEditStart = (product) => {
    setNewproducst({ ...product });
    setIsEditing(true);
    setUrlImage(product.img);
  };

  const handleEdit = async () => {
    try {
      // Xử lý upload ảnh mới nếu có
      let updatedProduct = { ...newproducst };
      if (imgUpload) {
        const imageRef = ref(storage, `images/${imgUpload.name}`);
        await uploadBytes(imageRef, imgUpload);
        const url = await getDownloadURL(imageRef);
        updatedProduct.img = url;
      }
      // Gửi yêu cầu PUT
      const response = await axios.put(
        `http://localhost:8000/products/${updatedProduct.id}`,
        updatedProduct
      );

      // Cập nhật state
      setData((dataCurrent) =>
        dataCurrent.map((item) =>
          item.id === updatedProduct.id ? response.data : item
        )
      );
      setNewproducst({
        name: "",
        price: "",
        category_id: "",
        quantity: "",
        stock: "",
      });
      setImgUpload(null);
      setUrlImage(null);
      setIsEditing(false);
      setCo(!co);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async (idproducts) => {
    let confirma = window.confirm("Bạn có muốn xóa không?");
    if (confirma) {
      try {
        await axios.delete(`http://localhost:8000/products/${idproducts}`);
        // Cập nhật state để loại bỏ sản phẩm đã xóa
        setData((curendata) =>
          curendata.filter((item) => item.id !== idproducts)
        );
        setCo(!co);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };
  useEffect(() => {
    handleGetProducts();
    handleGetCategory();
  }, [co]);
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
            <h2>Quản Lí Sản Phẩm</h2>
          </div>
        </header>
        <main className="main--">
          <div id="banner1">
            <h3>NAVICATION</h3>
            <div className="menu1">
              <div
                className="menu-one1"
                style={{ backgroundColor: "whitesmoke", borderRadius: 20 }}
              >
                <Link to="/AdminProduct">
                  <i className="fa-brands fa-codepen" />
                </Link>
                <Link to="/AdminProduct">
                  <h2>Quản lí sản phẩm</h2>
                </Link>
              </div>
              <div className="menu-one1">
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
          <div className="main-content98">
            <h1>Giao diện</h1>

            <input
              type="text"
              onChange={handlOnchangeADMIN}
              className="input_searchProducts"
              placeholder="Tìm kiếm"
            />
            <div className="product">
              <div className="crud">
                <h3>Thông tin sản phẩm</h3>
                <p className="input-Erorr" />
                <p className="" />
                <p className="input-Erorr" />
                <p className="input-Erorr" />
                <table
                  style={{ fontSize: 20, color: "#000000" }}
                  className="table-title"
                >
                  <tbody>
                    <tr>
                      <td style={{ paddingBottom: 20 }}>Loại sản phẩm:</td>
                      <td style={{ paddingBottom: 20 }}>
                        <select
                          id="categorySelect"
                          onChange={onADDproducst}
                          name="category_id"
                          value={newproducst.category_id}
                        >
                          <option>Loại Sản Phẩm</option>
                          {data.map((item, index) => {
                            return (
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingBottom: 20 }}>Tên sản phẩm:</td>
                      <td style={{ paddingBottom: 20 }}>
                        <input
                          type="text"
                          id="nameProduct"
                          name="name"
                          value={newproducst.name}
                          onChange={onADDproducst}
                          style={{
                            outline: "none",
                            padding: "2px 10px",
                            fontSize: "15px",

                            border: "1px solid black",
                          }}
                          className="input_admin"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="imgProduct">Ảnh sản phẩm</label>
                      </td>
                      <td style={{ paddingBottom: 20 }}>
                        <input
                          type="file"
                          hidden=""
                          id="imgProduct"
                          style={{ outline: "none", display: "none" }}
                          onChange={changeImage}
                        />{" "}
                        <br />
                        <img
                          id="image"
                          src={urlImage}
                          alt=""
                          width="100px"
                          height="100px"
                          style={{ border: "1px solid black" }}
                        />
                      </td>
                      <td>
                        {/* <button className="butn_adds" onClick={handleAdd}>
                          add
                        </button> */}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingBottom: 20 }}>Giá sản phẩm:</td>
                      <td style={{ paddingBottom: 20 }}>
                        <input
                          type="number"
                          id="priceProduct"
                          name="price"
                          value={newproducst.price}
                          onChange={onADDproducst}
                          style={{
                            outline: "none",
                            padding: "2px 10px",
                            fontSize: "15px",
                            border: "1px solid black",
                          }}
                          className="input_admin"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingBottom: 20 }}>Số lượng:</td>
                      <td style={{ paddingBottom: 20 }}>
                        <input
                          type="text"
                          id="sl"
                          name="stock"
                          value={newproducst.stock}
                          onChange={onADDproducst}
                          className="input_admin"
                          style={{
                            outline: "none",
                            padding: "2px 10px",
                            fontSize: "15px",
                            border: "1px solid black",
                          }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="buttonSave">
                  <button onClick={ADDPRODUCSTs}>Save</button>
                  <button onClick={handleEdit}>Chỉnh sửa</button>
                </div>
              </div>
              <div className="productAdded">
                <h3>Sản phẩm đã được thêm</h3>
                <table id="tableAdded-Products" style={{ textAlign: "center" }}>
                  <thead>
                    <tr>
                      <th className="td1PROduct">id</th>
                      <th className="td1PROduct">Tên</th>
                      <th className="td1PROduct">Ảnh</th>
                      <th className="td1PROduct">Giá</th>
                      <th className="td1PROduct">ID Category</th>
                      <th className="td1PROduct">Số Lượng</th>
                      <th className="td1PROduct">Chức Năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedProducts
                      .filter((item) =>
                        item.name.toLowerCase().includes(search)
                      )
                      .map((item) => {
                        return (
                          <tr>
                            <td className="td1PROduct">{item.id}</td>
                            <td className="td1PROduct">{item.name}</td>
                            <td className="td1PROduct">
                              <img src={item.img} alt="" />
                            </td>
                            <td className="td1PROduct">
                              {VND.format(item.price)}
                            </td>
                            <td className="td1PROduct">{item.category_id}</td>
                            <td className="td1PROduct">{item.stock}</td>
                            <td className="td1PROduct_btn">
                              <button onClick={() => handleEditStart(item)}>
                                Edit
                              </button>
                              <button onClick={() => handleDelete(item.id)}>
                                DELETE
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <Pagination
                  current={currentPage}
                  onChange={onPageChange}
                  pageSize={itemsPerPage}
                  total={newArr.length}
                />
              </div>
            </div>
          </div>
        </main>
      </>
    </>
  );
}
