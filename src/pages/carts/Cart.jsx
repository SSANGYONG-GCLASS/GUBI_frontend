import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { httpRequest, httpRequest_axios, VITE_SERVER_HOST } from "../../api/api";
import { useEffect, useState, useRef } from "react";
import styles from './Cart.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTruckFast, faFileLines } from "@fortawesome/free-solid-svg-icons";

function Cart() {
    const navigate = useNavigate();

    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);
    const checkAll = useRef(null);

    // 선택한 장바구니 목록
    const [selectedCartNos, setSelectedCartNos] = useState([]);

    // 총합 계산 결과
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalPoint, setTotalPoint] = useState(0);
    const [totalDelivery, setTotalDelivery] = useState(0);

    const handleImageOnError = (e) =>{
        e.target.src = "/gubi_null.png";
    };

    // 장바구니 전체 선택
    const handleSelectAll = (e) => {
        const checked = e.target.checked;

        if(checked) {
            setSelectedCartNos(carts
                .filter(cart => cart.optionInStock)
                .map(cart => cart.cartNo));
        }
        else {
            setSelectedCartNos([]);
        }
    };

    // 장바구니 1개 선택
    const handleSelectCart = (cartNo) => {
        setSelectedCartNos((prevSelectedCartNos) =>
            prevSelectedCartNos.includes(cartNo)
                ? prevSelectedCartNos.filter((id) => id !== cartNo) // 체크 해제 시 제거
                : [...prevSelectedCartNos, cartNo] // 체크 시 추가
        );
    };

    // 총합 계산
    const calculateTotal = () => {
        const selectedCarts = carts.filter((cart) =>
            selectedCartNos.includes(cart.cartNo)
        );

        const totalPriceResult = selectedCarts.reduce((sum, cart) => sum + (cart.productPrice * cart.cartCnt), 0);
        const totalPointResult = selectedCarts.reduce((sum, cart) => sum + (cart.cartCnt * cart.productPoint), 0);

        let totalDeliveryResult = 0;

        // 총 주문금액이 30만원 이상이면 무료, 아니면 가장 저렴한 배송비 부담
        if(totalPriceResult < 30 * 10000) {
            const max = selectedCarts.reduce((max, cart) => {
                return cart.productDeliveryPrice > max ? cart.productDeliveryPrice : max
            }, 0);

            totalDeliveryResult = selectedCarts.reduce((min, cart) => {
                return cart.productDeliveryPrice < min ? cart.productDeliveryPrice : min
            }, max);
        }

        setTotalPrice(totalPriceResult);
        setTotalPoint(totalPointResult);
        setTotalDelivery(totalDeliveryResult);
    };

    // 장바구니 개수 수정
    const handleCntChange = (cartNo, cnt) => {
        
        // API 통신 성공 시 콜백함수
        function success(data) {
            setCarts((prevCarts) =>
                prevCarts.map((cart)=> 
                    cart.cartNo === cartNo ? {...cart, cartCnt : cnt} : cart
                )
            );
        }
        
        // API 통신 실패 시 콜백함수
        function fail(err) {
            Swal.fire({
                    icon: 'info',
                    title: err,
                    timer: 1000,
                    timerProgressBar: true,     // 진행 게이지바
                    didOpen: () => {
                        Swal.showLoading();     // 로딩 애니메이션, 이거 사용 시 버튼 비활성화 되어서 보이지 않음
                    }
                });
        }
        
        const body = JSON.stringify({"cnt":cnt});

        httpRequest(`${VITE_SERVER_HOST}/api/carts/${cartNo}`, "PUT", body, success, fail);
    };

    const deleteCart = (cartNo) => {
        
        // API 통신 성공 시 콜백함수
        function success(data) {
            setCarts((prevCarts) => prevCarts.filter((cart) => cart.cartNo !== cartNo));
            setSelectedCartNos((prevCartNos) => prevCartNos.filter((selectedCartNo) => selectedCartNo !== cartNo));
        }
        
        // API 통신 실패 시 콜백함수
        function fail(err) {
            Swal.fire({
                    icon: 'info',
                    title: err,
                    timer: 1000,
                    timerProgressBar: true,     // 진행 게이지바
                    didOpen: () => {
                        Swal.showLoading();     // 로딩 애니메이션, 이거 사용 시 버튼 비활성화 되어서 보이지 않음
                    }
                });
        }

        httpRequest(`${VITE_SERVER_HOST}/api/carts/${cartNo}`, "DELETE", null, success, fail);
    };

    // 장바구니 목록 조회
    const fetchCarts = async () => {

        // API 통신 성공 시 콜백함수
        function success(data) {
            setCarts(data.carts.sort((a, b) => {
                return b.optionInStock - a.optionInStock; // 재고가 있는 상품이 먼저 오도록 정렬
            }));
            setLoading(false);

            // 기본으로 전체 선택
            setSelectedCartNos(data.carts
                .filter(cart => cart.optionInStock)
                .map(cart => cart.cartNo));
        }
        
        // API 통신 실패 시 콜백함수
        function fail(err) {
            alert("통신실패"+ err);
        }
        
        setLoading(true);

        httpRequest_axios(`${VITE_SERVER_HOST}/api/carts`, "GET", null, success, fail);
    };

    // 주문 페이지로 이동
    const goToOrderPage = () => {
        const params = new URLSearchParams();   // 쿼리스트링 객체 생성
        params.append("cartNoList", selectedCartNos);

        navigate(`/checkout?${params}`);
    }

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
    }, [selectedCartNos, carts]);

    return (
        <>
            <div className={`${styles.container} container pt-5`}>
                <div className="row">
                    
                    <div className={`col-lg-6 px-4 py-4 ${styles.cartContainer}`}>
                        <div className="h5 mb-4">Items in basket</div>

                        {/* 장바구니 상품 목록 출력 */}
                        {loading ? (
                            <p>Loading...</p>
                        ) : carts.length === 0 ? (
                            <p>장바구니에 담긴 상품이 없습니다.</p>
                        ) : (
                            <>
                                {/* 전체 선택 체크박스 */}
                                <input type="checkbox" ref={checkAll} id="check-all" className={styles.checkbox} style={{marginLeft:'20px', marginRight:'10px'}} onChange={handleSelectAll}
                                checked={selectedCartNos.length === carts.filter((cart)=>cart.optionInStock).length}/>
                                <label htmlFor="check-all" style={{cursor:'pointer'}}>Select all items</label>

                                <ul>
                                    {carts.map((cart) => (
                                        <li className={`my-2 position-relative ${styles.productContainer} ${(!cart.optionInStock)?styles.outOfStock:''}`} key={cart.cartNo}>
                                                    <button type="button" className={styles.deleteProductBtn} onClick={e => deleteCart(cart.cartNo)}>×</button>{/*  삭제버튼 */}

                                            <input type="checkbox" disabled={!cart.optionInStock} name="cartno" className={styles.checkbox}
                                                checked={selectedCartNos.includes(cart.cartNo)}
                                                value={cart.cartNo} onChange={e => handleSelectCart(cart.cartNo)}/>{/* 장바구니 일련번호를 담아서 주문 */}

                                            <div className={`mx-3 ${styles.productImgContainer}`}><img src={`${VITE_SERVER_HOST}/uploads/options/${cart.optionImg}`} onError={handleImageOnError}/></div>
                                            <div className={styles.productInfoContainer}>
                                                <div className="flex mb-2">
                                                    <span className={styles.productName}>{cart.productName}</span>{/*  상품명  */}
                                                </div>
                                                <div className={`${styles.productOption} my-1`}>{cart.optionName}</div>{/* 상품옵션명 */}
                                                <div className={styles.inStock}>{(cart.optionInStock)?'In Stock':'Sold Out'}</div>{/* 판매중이면 In Stock, 품절이면 Sold Out */}
                                                <div className={styles.point} align="end">{(cart.productPoint * cart.cartCnt).toLocaleString('ko-KR')}P</div>{/* 적립 포인트 */}
                                                <div className={styles.flex}>
                                                    <div className={styles.productCntContainer}>
                                                        <button type="button" disabled={!cart.optionInStock || cart.cartCnt == 1} className={styles.productMinusBtn} onClick={e => handleCntChange(cart.cartNo, --cart.cartCnt)}><FontAwesomeIcon icon={faMinus} /></button>{/* 개수 줄이기버튼 */}
                                                        <span className={styles.productCnt}>{cart.cartCnt}</span>{/* 장바구니에 담은 개수 */}
                                                        <button type="button" disabled={!cart.optionInStock || cart.cartCnt >= cart.optionCnt} className={styles.productPlusBtn} onClick={e => handleCntChange(cart.cartNo, ++cart.cartCnt)}><FontAwesomeIcon icon={faPlus} /></button>{/* 개수 늘리기버튼 */}
                                                    </div>
                                                    <span className={styles.productPrice}>₩&nbsp;{(cart.productPrice * cart.cartCnt).toLocaleString('ko-KR')}</span>{/* 가격을 상품가격 * 장바구니담긴개수로 출력 */}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                    <div className="offset-lg-1 col-lg-5 px-4 py-4">
                        <div className="position-sticky" style={{top:'4.1rem'}}>
                            <div className="h5 mb-4">Order details</div>
                            <div className={`${styles.flex} mb-2`} style={{fontSize: '11pt', color: 'rgb(85, 85, 85)'}}>
                                <span>Delivery</span>
                                <span id="totalDelivery">{totalDelivery == 0 ? 'Free' : '₩ '+ totalDelivery.toLocaleString('ko-KR')}</span>
                            </div>
                            <div className={styles.flex} style={{fontWeight: 600}}><span>Amount total</span><span id="totalPrice">₩&nbsp;{totalPrice.toLocaleString('ko-KR')}</span></div>
                            <div className={styles.flex} style={{fontSize: '11pt', color: 'rgb(85, 85, 85)'}}><span>Reward Points</span><span id="totalPoint">{totalPoint.toLocaleString('ko-KR')}P</span></div>
                            
                            <hr/>

                            {selectedCartNos.length > 0 && <button className={styles.goCheckoutBtn} type="button" onClick={e => goToOrderPage()}>Secure Checkout ({selectedCartNos.length})</button>}{/* 폼 전송 버튼 */}
                            <button className={styles.goProductsBtn} type="button" >Continue shopping</button>{/* 상품목록 페이지로 돌아가기 */}
                        </div>
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
        </>
    );
};

export default Cart;