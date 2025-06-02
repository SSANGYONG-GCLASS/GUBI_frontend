import { httpRequest_axios, VITE_SERVER_HOST } from "../../api/api";
import styles from './Checkout.module.css';
import { useEffect } from "react";

function CheckoutUserDetails({userDetail, setUserDetail, delivery, setDelivery}) {

    const fetchUserDetail = () => {

        // API 통신 성공 시 콜백함수
        function success(data) {
            setUserDetail(data);
        }
        
        // API 통신 실패 시 콜백함수
        function fail(err) {
            alert("통신실패"+ err);
        }

        const params = new URLSearchParams();   // 쿼리스트링 객체 생성
        params.append("userNo", 1);

        httpRequest_axios(`${VITE_SERVER_HOST}/api/orders/user-detail?${params.toString()}`, "GET", null, success, fail);
    };

    useEffect(() => {
        fetchUserDetail();
    }, []);

    useEffect(() => {
        document.title = "GUBI - 주문 배송지 선택";
    }, []);

    return (
        <>
            <div className="h6 mb-2">1/3</div>
            <hr/>
            <div className="h6 mb-4">USER DETAILS</div>
            {userDetail && <ul>
                <li className="my-2">
                    <label>Name</label>
                    <div id="userName">{userDetail.name}</div>
                </li>
                <li className="my-2">
                    <label>Email</label>
                    <div id="userEmail">{userDetail.email}</div>
                </li>
                <li className="my-2">
                    <label>Phone number</label>
                    <div id="userTel">{userDetail.tel}</div>
                </li>
            </ul>}
            <div className="h6 my-4">DELIVERY DETAILS<button className={styles.selectDelivery} type="button" >배송지 변경</button></div>
            
            <input type="hidden" name="deliveryno" value=""/>
            
            {/* 기본 배송지가 존재하면 숨기기 */}
            <div className={`${styles.deliveryEmpty} ${(!delivery)?'':'visually-hidden'}`}>기본 배송지가 없습니다. 배송지를 선택하세요.</div>
            
            {/* 기본 배송지가 존재하지 않으면 숨기기 */}
            <ul id="deliveryInfo" className={(delivery)?'':'visually-hidden'}>
                <li className="my-3">
                    <label htmlFor="receiver">Name</label>
                    <input type="text" className={styles.input} id="receiver" value="" readOnly/>
                    {/* <!-- <span className="error">수령인 성명은 필수입력 사항입니다.</span> --> */}
                </li>
                <li className="my-3">
                    <label htmlFor="reciver_tel">Phone number</label>
                    <input type="text" className={styles.input} id="receiver_tel" value="" readOnly/>
                    {/* <!-- <span className="error">휴대전화는 필수입력 사항입니다.</span> --> */}
                </li>
                <li className="my-3">
                    <label htmlFor="postcode">Zip code / Postcode</label>
                    <input type="text" className={styles.input} id="postcode" value="" readOnly/>
                    {/* <!-- <span className="error">우편번호는 필수입력 사항입니다.</span> --> */}
                </li>
                <li className="my-3">
                    <label htmlFor="address">Address line 1</label>
                    <input type="text" className={styles.input} id="address" value="" readOnly/>
                    {/* <!-- <span className="error">주소는 필수입력 사항입니다.</span> --> */}
                </li>
                <li className="my-3">
                    <label htmlFor="detail_address">Address line 2</label>
                    <input type="text" className={styles.input} id="detail_address" value="" readOnly/>
                    {/* <!-- <span className="error">상제주소는 필수입력 사항입니다.</span> --> */}
                </li>
                <li className="my-3">
                    <label htmlFor="memo">Additional notes for delivery</label>
                    <input type="text" className={styles.input} id="memo" value="" readOnly/>
                </li>
            </ul>
        </>
    )
}

export default CheckoutUserDetails;