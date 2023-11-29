import React, { useEffect, useState } from "react";
import "../Adminuser/ADMIN.scss";
import imgsa from "../../../../public/img/Logo2.jpg";
import { Link } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";
import axios from "axios";
import { Pagination } from "antd";
export default function Admin_Category() {
   useEffect(() => {
     window.scrollTo(0, 0);
   }, []);
  const [imgUpload, setImgUpload] = useState(null);
  const [urlImage, setUrlImage] = useState(null);
  const [co, setCo] = useState(true);
  const [newproducst, setNewproducst] = useState({
    id: "",
    category_name: "",
    name: "",
  });
  const changeImage = (e) => {
    let file = e.target.files[0];
    setImgUpload(file);
    const reader = new FileReader();
    reader.onload = () => {
      setUrlImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onADDproducst = (e) => {
    setNewproducst({ ...newproducst, [e.target.name]: e.target.value });
  };

  let [data, setData] = useState([]);
  const handleGetCategory = () => {
    fetch("http://localhost:8000/category")
      .then((res) => res.json())
      .then((datas) => {
        setData([...datas]);
      });
  };
  const ADDPRODUCSTs = async () => {
    if (imgUpload == null) return;
    const imageRef = ref(storage, `images/${imgUpload.name}`);
    uploadBytes(imageRef, imgUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        // Gửi yêu cầu POST đến API và lưu kết quả trả về
        const response = await axios.post("http://localhost:8000/category", {
          ...newproducst,
          category_name: url,
          name: newproducst.name,
        });
        // Cập nhật state để thêm sản phẩm mới vào danh sách
        setData((dataCurrent) => [...dataCurrent, response.data]);
        // Reset dữ liệu của sản phẩm mới
        setNewproducst({
          id: "",
          name: "",
          category_name: "",
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
    setUrlImage(product.category_name);
  };
  const handleEdit = async () => {
    try {
      // Xử lý upload ảnh mới nếu có
      let updatedProduct = { ...newproducst };
      if (imgUpload) {
        const imageRef = ref(storage, `images/${imgUpload.name}`);
        await uploadBytes(imageRef, imgUpload);
        const url = await getDownloadURL(imageRef);
        updatedProduct.category_name = url;
      }
       
      // Gửi yêu cầu PUT
      const response = await axios.put(
        `http://localhost:8000/category/${updatedProduct.id}`,
        updatedProduct
      );

      // Cập nhật state
      setData((dataCurrent) =>
        dataCurrent.map((item) =>
          item.id === updatedProduct.id ? response.data : item
        )
      );
      setNewproducst({
        id: "",
        name: "",
        category_name: "",
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
        await axios.delete(`http://localhost:8000/category/${idproducts}`);
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const displayedProducts = data.slice(startIndex, endIndex);
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
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
            <h2>Phân loại sản phẩm</h2>
          </div>
        </header>
        <main className="main--">
          <div id="title9">
            <div id="banner1">
              <h3>NAVICATION</h3>
              <div className="menu1">
                <div className="menu-one1">
                  <Link to=" /AdminProduct">
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
                <div
                  className="menu-one1"
                  style={{ backgroundColor: "whitesmoke", borderRadius: 20 }}
                >
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
          <div className="main-content98_cartegoey">
            <h3>Giao diện</h3>
            <div id="category98_Category">
              <input
                type="text"
                id="categoryUsername"
                name="name"
                value={newproducst.name}
                onChange={onADDproducst}
                placeholder="userNameCategory"
              />
              <div className="btn98">
                <button onClick={ADDPRODUCSTs}>Lưu</button>
                <button onClick={handleEdit}>Chỉnh sửa</button>
              </div>
              <label htmlFor="imgProduct">Ảnh sản phẩm</label>
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
              <table
                id="tableAdded_AdminCategory"
                style={{ textAlign: "center", fontSize: 20 }}
              >
                <thead>
                  <tr className="tr1">
                    <th className="td1">id</th>
                    <th className="td1">Tên</th>
                    <th className="td1">Ảnh</th>
                    <th className="td1">Chức Năng</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedProducts.map((item) => {
                    return (
                      <tr className="tr1">
                        <td className="td1">{item.id}</td>
                        <td className="td1">{item.name}</td>
                        <td className="td1_caetegorys">
                          <img src={item.category_name} alt="" />
                        </td>
                        <td className="td1 lllllll">
                          <button onClick={() => handleEditStart(item)}>
                            Sửa
                          </button>
                          <hr />
                          <button onClick={() => handleDelete(item.id)}>
                            Xóa
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
                total={data.length}
              />
            </div>
          </div>
        </main>
      </>
    </>
  );
}
