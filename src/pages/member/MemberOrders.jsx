import Swal from "sweetalert2";
import { Link, useLocation } from "react-router-dom";
import { httpRequest, httpRequest_axios, VITE_SERVER_HOST } from "../../api/api";
import { useEffect, useState, useRef, Fragment } from "react";
import styles from './MemberOrders.module.css';
import Pagination from "../../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTruckFast, faFileLines } from "@fortawesome/free-solid-svg-icons";

const statusMap = {
    PAYMENT_PENDING: '결제대기',
    ORDER_COMPLETED: '결제완료',
    ORDER_CANCELLED: '주문취소',
    SHIPPING: '배송중',
    DELIVERED: '배송완료',
    PURCHASE_CONFIRMED: '구매확정완료',
    REFUND_REQUESTED: '환불접수',
    REFUND_COMPLETED: '환불완료',
};

function OrderStatus({ status }) {
    return statusMap[status] || '알 수 없음';
}

function MemberOrderList() {

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    let requestOrderStatus = "ordered";
    if(params.get("status") != null) { requestOrderStatus = params.get("status"); }

    const [orders, setOrders] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);

    const handleImageOnError = (e) =>{
        e.target.src = "/gubi_null.png";
    };

    const handleOrderStatus = (orderNo, orderStatus) => {

        // API 통신 성공 시 콜백함수
        function success(data) {
            fetchOrders();
            Swal.fire({
                icon: 'success',
                title: "주문 상태 변경 완료",
                text: "요청이 성공적으로 수행되었습니다.",
                timer: 2000,
                timerProgressBar: true,     // 진행 게이지바
                didOpen: () => {
                    Swal.showLoading();     // 로딩 애니메이션, 이거 사용 시 버튼 비활성화 되어서 보이지 않음
                }
            });
        }
        
        // API 통신 실패 시 콜백함수
        function fail(err) {
            alert("통신실패"+ err);
        }

        const body = JSON.stringify({"status":orderStatus});

        httpRequest(`${VITE_SERVER_HOST}/api/orders/${orderNo}/status`, "PUT", body, success, fail);
    };

    const fetchOrders = () => {

        // API 통신 성공 시 콜백함수
        function success(data) {
            setOrders(data.orders);
            setPagination(data.pagination);
        }
        
        // API 통신 실패 시 콜백함수
        function fail(err) {
            alert("통신실패"+ err);
        }

        let statuses = [];
        if(requestOrderStatus == "ordered") {
            statuses = ["PAYMENT_PENDING", "ORDER_COMPLETED", "SHIPPING", "DELIVERED", "PURCHASE_CONFIRMED"];
        }
        else {
            statuses = ["ORDER_CANCELLED", "REFUND_REQUESTED", "REFUND_COMPLETED"];
        }

        const params = new URLSearchParams();   // 쿼리스트링 객체 생성
        params.append("statuses", statuses);
        params.append("page", page);
        params.append("size", 50);

        httpRequest(`${VITE_SERVER_HOST}/api/orders?${params}`, "GET", null, success, fail);
    };
    
    useEffect(() => {
        fetchOrders();
    }, [requestOrderStatus]);

    return (
        <>
            
            <div className={styles.content}>
                
                <h2 className={styles.title}>ORDER</h2>
                <div className="container d-flex">
                    <div>
                        <div className={styles.sidebar}>
                            <h2><Link to={`/member/my-page`} className={styles.link}>마이페이지</Link></h2>
                            <hr/>
                            <div className={styles.section}>
                                <h3>나의 쇼핑 정보</h3>
                                <ul>
                                    <li><Link to={`/member/orders?status=ordered`} style={{fontWeight:(requestOrderStatus == "ordered")?"bold":""}}>주문/배송</Link></li>
                                    <li><Link to={`/member/orders?status=cancelled`} style={{fontWeight:(requestOrderStatus != "ordered")?"bold":""}}>취소/반품/교환</Link></li>
                                </ul>
                            </div>
                            <div className={styles.section}>
                                <h3>나의 활동 정보</h3>
                                <ul>
                                    <li><Link to={`/member/edit`}>회원정보 수정</Link></li>
                                    <li><Link to={`/member/delete`}>회원 탈퇴</Link></li>
                                    <li><Link to={`/deliverys`}>배송지 관리</Link></li>
                                    <li><Link to={`/reviews`}>나의 리뷰</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.container} flex-fill`}>
                        <h6>주문 상품 정보</h6>
                        <hr className={styles.hr}/>
                        {!orders || orders.length == 0 && <div>주문한 상품이 없습니다.</div>}
                        {orders && orders.length > 0 &&
                        <>
                        <table className={`${styles.table} table table-bordered`}>
                            <thead>
                                <tr>
                                    <th>주문일자 (주문번호)</th>
                                    <th>상품정보</th>
                                    <th>수량</th>
                                    <th>주문금액</th>
                                    <th>적립 포인트</th>
                                    <th>주문 처리상태</th>
                                    {requestOrderStatus == "ordered" && <th>주문변경 / 리뷰</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                <Fragment key={order.id}>
                                    <tr className={styles.start}><th colSpan="7"></th></tr>

                                    {order.orderDetails.map((orderDetail, index) => (
                                        <tr key={orderDetail.id}>
                                            {index == 0 && <td rowSpan={`${order.orderDetails.length}`}>{order.orderDay.split("T")[0]}&nbsp;({order.id})</td>}
                                            <td style={{display:"flex", gap:"1rem"}}>
                                                <Link to='#'>
                                                    <div className={`${styles.ProductImgContainer} mr-1`}><img src={`${VITE_SERVER_HOST}/uploads/options/${orderDetail.optionImg}`} onError={handleImageOnError}/></div>
                                                </Link>
                                                <div className={styles.ProductInfoContainer}>
                                                    <Link to='#'>
                                                        <div className={`${styles.ProductName} mb-2`}>{orderDetail.productName}</div>
                                                    </Link>
                                                    <div className={`${styles.ProductOption} my-1`}>{orderDetail.optionName}</div>
                                                </div>
                                            </td>
                                            <td>{orderDetail.cnt}</td>
                                            <td>₩&nbsp;{orderDetail.price.toLocaleString('ko-KR')}</td>
                                            {index == 0 &&
                                            <>
                                                <td rowSpan={`${order.orderDetails.length}`}>{order.rewardPoint.toLocaleString('ko-KR')}P</td>
                                                <td rowSpan={`${order.orderDetails.length}`}>
                                                    <OrderStatus status={order.status}/>
                                                </td>
                                                {/* 결제대기 상태일 때 결제 버튼 표시 */}
                                                {order.status === 'PAYMENT_PENDING' &&
                                                <td rowSpan={`${order.orderDetails.length}`}>
                                                    <button type="button" id="orderPayment">결제</button>
                                                </td>
                                                }
                                                {/* 주문완료 상태일 때 주문취소 버튼 표시 */}
                                                {order.status === 'ORDER_COMPLETED' &&
                                                <td rowSpan={`${order.orderDetails.length}`}>
                                                    <button type="button" onClick={() => {if(confirm("주문을 취소하시겠습니까?")) handleOrderStatus(order.id, "ORDER_CANCELLED");}}>주문취소</button>
                                                </td>
                                                }
                                                {/* 배송완료 상태일 때 구매확정, 환불신청 버튼을 표시 */}
                                                {order.status === 'DELIVERED' &&
                                                <td rowSpan={`${order.orderDetails.length}`}>
                                                    <button type="button" onClick={() => {if(confirm("구매 확정을 하시겠습니까?")) handleOrderStatus(order.id, "PURCHASE_CONFIRMED")}} className="black">구매확정</button>
                                                    <button type="button" onClick={() => {if(confirm("환불 신청을 하시겠습니까?")) handleOrderStatus(order.id, "REFUND_REQUESTED")}}>환불신청</button>
                                                </td>
                                                }
                                            </>}

                                            {/* 구매확정 상태일 때 작성된 리뷰가 없다면 리뷰작성 버튼을 표시 */}
                                            {order.status === 'PURCHASE_CONFIRMED' && orderDetail.reviewNo == null &&
                                            <td>
                                                <div className="button-wrapper">
                                                    <button type="button" className={styles.black} data-toggle="modal" data-target="#addReviewModal" data-value={orderDetail.optionNo}>
                                                    리뷰작성
                                                    </button>
                                                </div>
                                            </td>
                                            }
                                            {/* 구매확정 상태일 때 작성된 리뷰가 있다면 리뷰확인 버튼을 표시 */}
                                            {order.status === 'PURCHASE_CONFIRMED' && orderDetail.reviewNo != null &&
                                            <td>
                                                <Link to='#'>
                                                    <button type="button">리뷰확인</button>
                                                </Link>
                                            </td>
                                            }
                                        </tr>
                                    ))}

                                </Fragment>))}
                            </tbody>
                        </table>
                        </>}
                    </div>
                </div>

                {/* 페이지 바 */}
                {pagination && pagination.totalPages > 0 && (
                    <div style={{margin: '0 0 1rem 0'}}>
                        <Pagination pageInfo={pagination} onPageChange={setPage} />
                    </div>
                )}
            </div>
        </>
    );
};

export default MemberOrderList;