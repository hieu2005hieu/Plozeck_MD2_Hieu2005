import React from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import Heatder from "../../../components/Heatder/Heatder";
import FooterPage from "../../../components/Foodter/FooterPage";
import { useEffect } from "react";
import "./Promotion.scss";
import { useNavigate } from "react-router-dom";

export default function Promotion3() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
     const navigate = useNavigate();
     const hanldclicktoup = () => {
       navigate("/Produc");
     };
  return (
    <>
      <Heatder></Heatder>
      <div className="Promtion">
        <img
          src="https://cdn.lotteria.vn/media/mageplaza/blog/post/t/h/th_ng_11_ch_11k_ctkm.jpg"
          alt=""
        />
        <h2>GIAO HÀNG LIỀN TAY- NHẬN NGAY ƯU ĐÃI 11K</h2>
        <p>Nhanh tay đặt hàng nhận ngay ưu đãi :</p>
        <p>
          Hóa đơn 140k, bạn có thể mua số lượng tối đa là 3 sản phẩm dưới đây
          chỉ với giá 11k
        </p>
        <li>Khoai tây chiên 11k</li>
        <li>Mực rán (3 miếng) 11k</li>
        <li>Cá nugget (3 miếng) 11k</li>
        <p>Điều kiện áp dụng:</p>
        <p>- Chương trình áp dụng từ ngày 01/11 đến hết 30/11/2023</p>
        <p> Chương trình áp dụng qua Hotline (19006778), App_Web Lotteria </p>
        <p>
          - Chương trình áp dụng ở một số cửa hàng. Bạn có thể xem danh sách cửa
          hàng áp dụng "ƯU ĐÃI" tại khu vực tìm kiếm cửa hàng bên dưới nhé
        </p>
        <h3>Lưu ý: Mỗi sản phẩm số lượng tối đa là 1 nhé</h3>

        <div className="btn_protionss">
          <button className="byn_promtion" onClick={hanldclicktoup}>
            <BiLeftArrowAlt />
            Mua Ngay
          </button>
        </div>
      </div>
      <FooterPage></FooterPage>
    </>
  );
}
