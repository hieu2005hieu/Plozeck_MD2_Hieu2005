import { BiLeftArrowAlt } from "react-icons/bi"; 
import React, { useEffect } from "react";
import Heatder from "../../../components/Heatder/Heatder";
import FooterPage from "../../../components/Foodter/FooterPage";
import "./Promotion.scss"
import { useNavigate } from "react-router-dom";
export default function Promotion1() {
     useEffect(() => {
       window.scrollTo(0, 0);
     }, []);
    const navigate = useNavigate();
    const hanldclicktoup=() => {
          navigate("/Produc");
    }
  return (
      <>
          <Heatder></Heatder>
          <div className="Promtion">
              <div >
                  <img
          src="https://cdn.lotteria.vn/media/mageplaza/blog/post/n/s/nsp_thang_11-01.jpg"
          alt=""
        />
              </div>
        
        <h2>THÁNG 11 - RỘN RÃ CÙNG NHAU</h2>
        <p>
          Super Idol "Gà Tứ vị" đã trở lại, Fans thoả thích "mix and match" đủ
          loại gà sốt để thưởng thức cùng nhau chỉ với 130.000đ thui nè
        </p>
        <p>
          Có tới 4 lựa chọn nha: Gà Mê Mật ngọt ngào quyến rũ - Gà H&S cay ngọt
          siêu cuốn - Gà Sốt Phô Mai béo thơm - Gà Sốt Đậu trọn vị mặn - ngọt
          -cay
        </p>
        <p>
          Fans nào thích "nhâm nhi" một mình thì đừng bỏ qua Combo 81.000 này
          nha: Ga rán + Mỳ Ý + Pepsi + Kem tornado (1 trong 3 vị:
          Matcha/Strawberry/Chocolate) - tiết kiệm đến 20.000đ
        </p>
        <p>
          Combo Couple "cùng nhau" 2 Gà rán + Burger tôm + Khoai tây chiên (M) +
          2 Pepsi (M) giá chỉ 142.000đ - tiết kiệm 32.000đ
        </p>
        <p>
          "Vơ-đét" cho cuộc dzui nè: Combo 3 Gà rán + Burger Bulgogi + Khoai tây
          lắc + 3 Pepsi (M) = Giá chỉ 183.000đ - tiết kiệm đến 51.000đ.
        </p>
        <p>Chill Gà ngon hơn - vui hơn với ưu đãi thanh toán qua ví điện tử:</p>
        <h3>
          Giảm ngay 15.000đ cho hoá đơn từ 142.000đ khi thanh toán bằng Zalopay
        </h3>
        <h3>
          Giảm 10.000đ cho hoá đơn từ 79.000đ khi thanh toán bằng VNPay - áp
          dụng vào ngày thứ 6 hằng tuần
        </h3>
        <p>
          Đến liền Lotteria gần nhất "dựt" liền ưu đãi tháng 11 này nha Fans ơi!
              </p>
              <div className="btn_protionss">
                  <button className="byn_promtion" onClick={hanldclicktoup}><BiLeftArrowAlt />Mua Ngay</button>
              </div>
          </div>
          <FooterPage></FooterPage>
    </>
  );
}
