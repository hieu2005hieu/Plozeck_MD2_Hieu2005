import React, { useEffect } from 'react'
import Heatder from '../../../components/Heatder/Heatder';
import FooterPage from '../../../components/Foodter/FooterPage';
import { BiLeftArrowAlt } from 'react-icons/bi';
import "./Promotion.scss";
import { useNavigate } from 'react-router-dom';

export default function Promotion5() {
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
          src="https://cdn.lotteria.vn/media/mageplaza/blog/post/t/_/t_i_app_t_ng_g_-_banner_web_banner_web.jpg"
          alt=""
        />
        <h2>TẢI APP LIỀN TAY NHẬN NGAY GÀ RÁN</h2>
        <h3>
          KHI BẠN ĐẶT ĐƠN ĐẦU TIÊN TẠI APP LOTTERIA, CHÚNG MÌNH DÀNH TẶNG BẠN 1
          MIẾNG GÀ RÁN{" "}
        </h3>
        <p>
          Chỉ cần tải app bạn sẽ nhận được ưu đãi khủng và đừng quên gửi đánh
          giá 5 sao cho trải nghiệm App của mình nhé.
        </p>
        <p>Điều kiện áp dụng:</p>
        <p>- Chương trình áp dụng từ ngày 01/11 đến hết 31/12/2023</p>
        <p>- Chương trình áp dụng duy nhất cho đơn đầu tiên</p>
        <p>- Chỉ áp dụng đặt hàng qua App Lotteria</p>
        <h3>
          - Chương trình áp dụng tại 1 số cửa hàng. Bạn có thể xem danh sách cửa
          hàng áp dụng "ƯU ĐÃI" tặng gà rán tại khu vực tìm kiếm cửa hàng bên
          dưới nhé
        </h3>
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
