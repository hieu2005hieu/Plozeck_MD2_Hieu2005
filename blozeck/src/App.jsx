import React from "react";
import "./App.css";
// import { Login } from '@mui/icons-material'
import Login from "./pages/Login_signup/Login";
import SignUp from "./pages/Login_signup/Singup";

import { Route, Routes } from "react-router-dom";
import Produc from "./pages/Products/Produc.jsx";
import Index from "./pages/index/Index.jsx";
import Promotion from "./pages/Promotion/Promotion.jsx";
import Bestsellner from "./pages/Bestsellner/Bestsellner.jsx";
import Promotion1 from "./pages/Promotion/Promotion_title/Promotion1.jsx";
import Promotion2 from "./pages/Promotion/Promotion_title/Promotion2.jsx";
import Promotion3 from "./pages/Promotion/Promotion_title/Promotion3.jsx";
import Promotion4 from "./pages/Promotion/Promotion_title/Promotion4.jsx";
import Promotion5 from "./pages/Promotion/Promotion_title/Promotion5.jsx";
import Admin_Category from "./pages/admin/Admincategory/Admin_Category.jsx";
import Admin_Management from "./pages/admin/Admin_Management/Admin_Management.jsx";
import Admin_User from "./pages/admin/Adminuser/Admin_User.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Title_Oder from "./pages/titleoder/Title_Oder.jsx";
import Admin_Products from "./pages/admin/Adminproducts/Admin_Products.jsx";
import Tsitle from "./pages/titleproducts/Tsitle.jsx";
import PrivateRouter from "./pages/flaguser/PrivateRouter.jsx";

// import { Routes, Route, Link, NavLink, useNavigate } from "react-router-dom";
// import Product from "./router/product";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Singup" element={<SignUp />}></Route>
        <Route path="/Produc" element={<Produc />}></Route>
        <Route path="/details/:id" element={<Tsitle />}></Route>
        <Route path="/Promotion" element={<Promotion />}></Route>
        <Route path="/Bestsellner" element={<Bestsellner />}></Route>
        <Route path="/Promotion1" element={<Promotion1 />}></Route>
        <Route path="/Promotion2" element={<Promotion2 />}></Route>
        <Route path="/Promotion3" element={<Promotion3 />}></Route>
        <Route path="/Promotion4" element={<Promotion4 />}></Route>
        <Route path="/Promotion5" element={<Promotion5 />}></Route>
        <Route path="/Cart" element={<Cart></Cart>}></Route>
        <Route path="/title" element={<Tsitle></Tsitle>}></Route>
        <Route
          path="/titleoder/:user_id"
          element={<Title_Oder></Title_Oder>}
        ></Route>

        <Route path="/AdminCategory" element={<PrivateRouter></PrivateRouter>}>
          <Route
            path="/AdminCategory"
            element={<Admin_Category></Admin_Category>}
          ></Route>
        </Route>

        <Route
          path="/AdminManagement"
          element={<PrivateRouter></PrivateRouter>}
        >
          <Route
            path="/AdminManagement"
            element={<Admin_Management></Admin_Management>}
          ></Route>
        </Route>
        <Route path="/AdminProduct" element={<PrivateRouter></PrivateRouter>}>
          <Route path="/AdminProduct" element={<Admin_Products />}></Route>
        </Route>
        <Route path="/AdminUser" element={<PrivateRouter></PrivateRouter>}>
          <Route path="/AdminUser" element={<Admin_User></Admin_User>}></Route>
        </Route>
      </Routes>
    </>
  );
}
