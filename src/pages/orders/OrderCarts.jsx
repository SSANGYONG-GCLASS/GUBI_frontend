import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { httpRequest, httpRequest_axios, VITE_SERVER_HOST } from "../../api/api";
import { useEffect, useState, useRef } from "react";
import styles from './OrderCart.module.css';

function OrderCart({cartNoList}) {

    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);

    // 총합 계산 결과
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalPoint, setTotalPoint] = useState(0);
    const [totalDelivery, setTotalDelivery] = useState(0);

    const handleImageOnError = (e) =>{
        e.target.src = "/gubi_null.png";
    };

    // 총합 계산
    const calculateTotal = () => {

        const totalPriceResult = carts.reduce((sum, cart) => sum + (cart.productPrice * cart.cartCnt), 0);
        const totalPointResult = carts.reduce((sum, cart) => sum + (cart.cartCnt * cart.productPoint), 0);

        let totalDeliveryResult = 0;

        // 총 주문금액이 30만원 이상이면 무료, 아니면 가장 저렴한 배송비 부담
        if(totalPriceResult < 30 * 10000) {
            const max = carts.reduce((max, cart) => {
                return cart.productDeliveryPrice > max ? cart.productDeliveryPrice : max
            }, 0);

            totalDeliveryResult = carts.reduce((min, cart) => {
                return cart.productDeliveryPrice < min ? cart.productDeliveryPrice : min
            }, max);
        }

        setTotalPrice(totalPriceResult);
        setTotalPoint(totalPointResult);
        setTotalDelivery(totalDeliveryResult);
    };
    
    // 장바구니 목록 조회
    const fetchCarts = async () => {

        // API 통신 성공 시 콜백함수
        function success(data) {
            setCarts(data.carts.sort((a, b) => {
                return b.optionInStock - a.optionInStock; // 재고가 있는 상품이 먼저 오도록 정렬
            }));
            setLoading(false);
        }
        
        // API 통신 실패 시 콜백함수
        function fail(err) {
            alert("통신실패"+ err);
        }
        
        setLoading(true);
        const params = new URLSearchParams();   // 쿼리스트링 객체 생성
        params.append("userNo", 1);
        params.append("cartNoList", cartNoList);

        httpRequest_axios(`${VITE_SERVER_HOST}/api/carts/for-order?${params.toString()}`, "GET", null, success, fail);
    };

    useEffect(() => {

        document.title = "GUBI - 장바구니";

        fetchCarts();

        if(!loading && carts) {
            handleCntChange();
        }
    }, []);

    useEffect(() => {
        if(!loading && carts) {
            calculateTotal();
        }
    }, [carts]);

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : carts.length === 0 ? (
                <p>장바구니에 담긴 상품이 없습니다.</p>
            ) : (
                <ul>
                    {carts.map((cart) => (
                        <li className={`my-2 ${styles.productContainer} ${(!cart.optionInStock)?styles.outOfStock:''}`} key={cart.cartNo}>

                            <div className={`mx-3 ${styles.productImgContainer}`}><img src={`${VITE_SERVER_HOST}/uploads/options/${cart.optionImg}`} onError={handleImageOnError}/></div>
                            <div className={styles.productInfoContainer}>
                                <div className="flex mb-2">
                                    <span className={styles.productName}>{cart.productName}</span>{/*  상품명  */}
                                </div>
                                <div className={`${styles.productOption} my-1`}>{cart.optionName}</div>{/* 상품옵션명 */}
                                <div className={`${styles.flex} `}>
                                    <span className={styles.productCnt}>Qty {cart.cartCnt}</span>{/* 장바구니에 담은 개수 */}
                                    <div className={styles.point} align="end">{(cart.productPoint * cart.cartCnt).toLocaleString('ko-KR')}P</div>{/* 적립 포인트 */}
                                </div>
                                <div align="end">
                                    <span className={styles.productPrice}>₩&nbsp;{(cart.productPrice * cart.cartCnt).toLocaleString('ko-KR')}</span>{/* 가격을 상품가격 * 장바구니담긴개수로 출력 */}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className={`${styles.flex} mb-2`} style={{fontSize: '11pt', color: 'rgb(85, 85, 85)'}}>
                <span>Delivery</span>
                <span id="totalDelivery">{totalDelivery == 0 ? 'Free' : '₩ '+ totalDelivery.toLocaleString('ko-KR')}</span>
            </div>
            <div className={styles.flex} style={{fontWeight: 600}}><span>Amount total</span><span id="totalPrice">₩&nbsp;{totalPrice.toLocaleString('ko-KR')}</span></div>
            <div className={styles.flex} style={{fontSize: '11pt', color: 'rgb(85, 85, 85)'}}><span>Reward Points</span><span id="totalPoint">{totalPoint.toLocaleString('ko-KR')}P</span></div>
        </>
    )
}

export default OrderCart;