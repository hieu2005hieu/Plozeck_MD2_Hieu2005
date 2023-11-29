import React, { useEffect } from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi';
import Heatder from '../../../components/Heatder/Heatder';
import FooterPage from '../../../components/Foodter/FooterPage';
import "./Promotion.scss";
import { useNavigate } from 'react-router-dom';

export default function Promotion2() {
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
          src="https://cdn.lotteria.vn/media/mageplaza/blog/post/c/o/cover_ga_me_mat-01.jpg"
          alt=""
        />
        <h2>HONEYHOLIC CHICKEN - GÀ MÊ MẬT</h2>
        <p>Ngọt ngào từ hương hoa - Bạn đã thử chưa?</p>
        <p>
          Lần đầu tiên, Lotteria mang đến cho bạn hương vị ngọt ngào đến từ
          thiên nhiên
        </p>
        <p>
          Hoà quyện trong từng thớ thịt gà là sốt mật ong cao nguyên, khiến cho
          bao con tim mê Gà đều xao xuyến.
        </p>
        <p>
          Dù bạn là ai - Dù mang phong cách nào - Gà Mê Mật cũng chiều được hết
        </p>
        <p>
          Thưởng thức ngay vị ngon tuyệt đỉnh - Gà Mê Mật tại các cửa hàng
          Lotteria trên toàn quốc, giá "đáng iu" chỉ 40.000/miếng
        </p>
        <p>Đặc biệt - trong 3 ngày đầu tiên ra mắt</p>
        <h3>
          Mua 2 Gà Mê Mật - MIỄN PHÍ 1 Gà cùng loại nữa nha - Mua 2 được 3 - Quá
          đã
        </h3>
        <p>
          Tặng ngay 1 Pepsi Zero/7UP soda chanh (lon) khi dùng Combo Ưu dãi: 2
          Gà Mê Mật + Pepsi (M) giá chỉ 75.000.
        </p>
        <p>
          Chưa hết đâu nha: khi dùng Gà Mê Mật Chicken set giá 93.000: ⚡️MIỄN
          PHÍ Upsize - Khoai tây chiên = Khoai tây lắc & Pepsi (M) = Pepsi (L)
        </p>
        <h3>
          Nhắn cho Hội mê gà đến Lotteria "check" liền chiếc Gà siêu "quyến rũ"
          này nha!
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
