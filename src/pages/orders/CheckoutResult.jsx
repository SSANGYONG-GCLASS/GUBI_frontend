import { Link, useLocation } from "react-router-dom";
import { httpRequest_axios, VITE_SERVER_HOST } from "../../api/api";
import styles from './CheckoutResult.module.css';
import { useState, useEffect } from "react";

function CheckoutComplete() {

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const orderNo = params.get("orderNo");

    const [order, setOrder] = useState(null);

    const handleImageOnError = (e) =>{
        e.target.src = "/gubi_null.png";
    };

    const fetchOrder = () => {

        // API 통신 성공 시 콜백함수
        function success(data) {
            setOrder(data.order);
        }
        
        // API 통신 실패 시 콜백함수
        function fail(err) {
            alert("통신실패"+ err);
        }

        const params = new URLSearchParams();   // 쿼리스트링 객체 생성
        params.append("userNo", 1);

        httpRequest_axios(`${VITE_SERVER_HOST}/api/orders/${orderNo}?${params.toString()}`, "GET", null, success, fail);
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    return (
        <div style={{backgroundColor: "rgb(250, 250, 250)"}}>
            <div className={`${styles.checkoutResultContainer} container`}>
                <div className={`${styles.CheckoutHeaderContainer} py-4`}>
                    <h4>Your order has been completed.</h4>
                </div>
                    
                <div className={styles.CheckoutBodyContainer}>
                    <div className={`${styles.CheckoutProductContainer} px-4 py-4`}>
                        <div className="h6 mb-2">ORDER SUMMARY</div>
                        <hr/>
                        {order &&
                        <>
                            <ul>
                                {/* 주문상세 목록 출력*/}
                                {order.orderDetails.map((orderDetail) => (
                                    <li className={`${styles.flex} my-2`} key={orderDetail.id}>
                                        <Link to={`/products/${orderDetail.productNo}`} style={{textDecoration:'none'}}>
                                            <div className={`${styles.ProductImgContainer} mr-1`}><img src={`${VITE_SERVER_HOST}/uploads/options/${orderDetail.optionImg}`} onError={handleImageOnError}/></div>
                                        </Link>
                                        <div className={styles.ProductInfoContainer}>
                                            <Link to={`/products/${orderDetail.productNo}`} style={{textDecoration:'none'}}>
                                                <div className={`${styles.ProductName} mb-2`}>{orderDetail.productName}</div>
                                            </Link>
                                            <div className={`${styles.ProductOption} my-1`}>{orderDetail.optionName}</div>
                                            <div className={styles.flex}><span className={styles.ProductCnt}>Qty&nbsp;{orderDetail.cnt}</span><span className={styles.ProductPrice}>₩&nbsp;{orderDetail.price.toLocaleString('ko-KR')}</span></div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className={`${styles.flex} mb-2`} style={{fontSize: '11pt', color: 'rgb(85, 85, 85)'}}>
                                <span>Delivery</span>
                                <span>{(order.deliveryPrice === 0)?'Free':'₩ '+order.deliveryPrice.toLocaleString('ko-KR')}</span>
                            </div>
                            <div className={styles.flex} style={{fontWeight: 600}}><span>Amount total</span><span>₩&nbsp;{order.totalPrice.toLocaleString('ko-KR')}</span></div>
                            <div className={styles.flex} style={{fontSize: '11pt', color: 'rgb(85, 85, 85)'}}><span>Reward Points</span><span>{order.rewardPoint.toLocaleString('ko-KR')}P</span></div>
                        
                            <div className="h6 mt-5">DELIVERY DETAILS</div>
                            <hr/>
                            <ul>
                                <li className="mt-3">
                                    <label>Name</label>
                                </li>
                                <li className="mb-3">
                                    <div>{order.delivery.receiver}</div>
                                </li>
                                <li className="mt-3">
                                    <label>Phone number</label>
                                </li>
                                <li className="mb-3">
                                    <div>{order.delivery.receiverTel}</div>
                                </li>
                                <li className="mt-3">
                                    <label>Zip code / Postcode</label>
                                </li>
                                <li className="mb-3">
                                    <div>{order.delivery.address.zipcode}</div>
                                </li>
                                <li className="mt-3">
                                    <label>Address line 1</label>
                                </li>
                                <li className="mb-3">
                                    <div>{order.delivery.address.address}</div>
                                </li>
                                <li className="mt-3">
                                    <label>Address line 2</label>
                                </li>
                                <li className="mb-3">
                                    <div>{order.delivery.address.detailAddress}</div>
                                </li>
                                <li className="mt-3">
                                    <label>Additional notes for delivery</label>
                                </li>
                                <li className="mb-3">
                                    <div>{order.delivery.memo}</div>
                                </li>
                            </ul>
                        </>}
                    </div>
                </div>
                
                <div className={styles.buttonContainer}>
                    <Link to='/orders' style={{textDecoration:'none'}}>
                        <button className={styles.white}>Order list</button>
                    </Link>
                    <Link to='/products' style={{textDecoration:'none'}}>
                        <button >Continue shopping</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CheckoutComplete;