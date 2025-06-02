import { Link, useLocation, useNavigate } from "react-router-dom";
import { httpRequest, VITE_SERVER_HOST } from "../../api/api";
import styles from './Checkout.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import CheckoutCarts from "./CheckoutCarts";
import CheckoutUserDetails from "./CheckoutUserDetails";
import CheckoutUsePoints from "./CheckoutUsePoints";
import CheckoutPayment from "./CheckoutPayment";

function Checkout() {
    
    const navigate = useNavigate();

    const [userDetail, setUserDetail] = useState(null);
    const [delivery, setDelivery] = useState(null);
    const [usePoint, setUsePoint] = useState(null);
    const [productName, setProductName] = useState(null);
    const [amountPaid, setAmountPaid] = useState(0);

    const [checkoutStep, setCheckoutStep] = useState(1);

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const cartNoList = params.get("cartNoList");

    const addOrder = () => {

        // API 통신 성공 시 콜백함수
        function success(data) {
            navigate(`/checkout-result?orderNo=${data.orderNo}`);
        }
        
        // API 통신 실패 시 콜백함수
        function fail(err) {
            alert("통신실패"+ err);
        }
                
        // const body = JSON.stringify({"userNo":1, "deliveryNo":delivery.deliveryNo, "usePoint":usePoint, "status":"ORDER_COMPLETED", "cartNoList":cartNoList.split(",")});
        const body = JSON.stringify({"userNo":1, "deliveryNo":1, "usePoint":usePoint, "status":"ORDER_COMPLETED", "cartNoList":cartNoList.split(",")});

        httpRequest(`${VITE_SERVER_HOST}/api/orders`, "POST", body, success, fail);

    };

    useEffect(() => {
        if(checkoutStep == 4) {
            addOrder(); // 결제 진행
        }
    }, [checkoutStep]);

    return (
        <div style={{backgroundColor: "rgb(250, 250, 250)"}}>
            <div className={`${styles.container} container`}>
                <div className={`${styles.checkoutHeaderContainer} py-4`}>
                    <h4>Complete your order</h4>
                </div>
                
                <div className="row">
                    
                    <div className={`${styles.checkoutOrderContainer} col-lg-6 px-4 py-4`}  style={{ '--progress': checkoutStep/3*100+'%' }}>
                        {checkoutStep === 1 && <CheckoutUserDetails userDetail={userDetail} setUserDetail={setUserDetail} delivery={delivery} setDelivery={setDelivery}/>}
                        {checkoutStep === 2 && <CheckoutUsePoints userDetail={userDetail} usePoint={usePoint} setUsePoint={setUsePoint}/>}
                        {checkoutStep === 3 && <CheckoutPayment userDetail={userDetail} productName={productName} amountPaid={amountPaid} onPrev={() => setCheckoutStep(2)} onComplete={() => setCheckoutStep(4)} className="fade show"/>}
                    </div>
                    <div className={`${styles.checkoutProductContainer} offset-lg-1 col-lg-5 px-4 py-4`}>
                        <CheckoutCarts cartNoList={cartNoList} usePoint={usePoint} setProductName={setProductName} amountPaid={amountPaid} setAmountPaid={setAmountPaid}/>
                    </div>
                </div>
                <div className="row">
                    <div className={`${styles.nextPrevButtonContainer} col-lg-6 px-0`}>
                        <button className={styles.PrevButton} style={{display:(checkoutStep==1)?'none':'block'}} type="button" onClick={() => setCheckoutStep((prev) => prev-1)}>Prev</button>
                        <span></span>
                        <button className={styles.NextButton} style={{display:(checkoutStep==3)?'none':'block'}} type="button" onClick={() => setCheckoutStep((prev) => prev+1)}>Next</button>
                    </div>
                </div>
                
                <div className="row my-4">
                    <div className="col-md-4 px-4">
                        <hr/>
                        <div><FontAwesomeIcon icon={faTruckFast} className="fs-4" /></div>
                        <div className="my-3" style={{fontWeight: 500}}>SHIPPING AND RETURN</div>
                        <div>If you shop with us, you can return it for a refund within 30 days of receiving your product.</div>
                    </div>
                    <div className="col-md-4 px-4">
                        <hr/>
                        <div><FontAwesomeIcon icon={faFileLines} className="fs-4" /></div>
                        <div className="my-3" style={{fontWeight: 500}}>FREE SHIPPING</div>
                        <div>The shipping method for your purchase is determined by the type of item ordered. Smaller items ship with UPS; larger parcels and furniture ship with either Curbside delivery. Your basket will reflect the lowest applicable delivery charges for your order.</div>
                    </div>
                    <div className="col-md-4 px-4">
                        <hr/>
                        <div><FontAwesomeIcon icon={faFileLines} className="fs-4" /></div>
                        <div className="my-3" style={{fontWeight: 500}}>WARRANTY</div>
                        <div>2 year warranty on all products.</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Checkout;