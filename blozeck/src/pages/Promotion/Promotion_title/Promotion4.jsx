import React, { useEffect } from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi';
import Heatder from '../../../components/Heatder/Heatder';
import FooterPage from '../../../components/Foodter/FooterPage';
import "./Promotion.scss";
import { useNavigate } from 'react-router-dom';

export default function Promotion4() {
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
          src="https://cdn.lotteria.vn/media/mageplaza/blog/post/b/a/banner_banner_app_8_.jpg"
          alt=""
        />
        <h2>CHƯƠNG TRÌNH LOYALTY CARD</h2>
        <p>
          Nhanh tay đặt hàng, để trở thành khách hàng thân thiết của Lotteria
          nào. Bạn chỉ cần đặt hàng để nhận ngay quà miễn phí nhé.
        </p>
        <p>Với hóa đơn 130,000đ khi:</p>
        <p>- Đặt hàng lần thứ 2 tặng miễn phí 01 khoai tây chiên (FF)</p>
        <p>- Đặt hàng lần thứ 3 tặng miễn phí 01 miếng gà rán</p>
        <p>- Đặt hàng lần thứ 4 tặng miễn phí 01 cơm gà sốt đậu</p>
        <p>- Đặt hàng lần thứ 5 tặng miễn phí 01 burger Tôm</p>
        <p>Điều kiện áp dụng:</p>
        <p>- Chương trình áp dụng từ ngày 15/11 đến hết 31/12/2023</p>
        <p>- Chương trình áp dụng qua Hotline (19006778), App_Web Lotteria</p>
        <p>- Khách đặt đủ 5 lần sẽ quay lại lần thứ nhất </p>
        <p>
          - Chương trình áp dụng ở một số cửa hàng. Bạn có thể xem danh sách cửa
          hàng áp dụng "ƯU ĐÃI" tại khu vực tìm kiếm cửa hàng bên dưới nhé
        </p>
        <h3>Chương Trình dành cho khách hàng thân thiết</h3>
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
