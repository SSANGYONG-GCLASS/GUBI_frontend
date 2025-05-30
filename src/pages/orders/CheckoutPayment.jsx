import Swal from "sweetalert2";
import { useEffect, useState, useRef } from "react";

function CheckoutPayment({userDetail, productName, amountPaid, onPrev, onComplete}) {

    const [showPopup, setShowPopup] = useState(false);

    const modalRef = useRef(null);
    const backdropRef = useRef(null);

    useEffect(() => {
        document.title = "GUBI - 주문 결제";
        setShowPopup(true);
        
        const script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
        script.async = true;
        document.body.appendChild(script);
        const script2 = document.createElement('script');
        script2.src = 'https://service.iamport.kr/js/iamport.payment-1.1.2.js';
        script2.async = true;
        document.body.appendChild(script2);

        script2.onload = () => {
            handlePayment();
        };

        return () => {
            document.body.removeChild(script); // 컴포넌트 unmount 시 script 제거
        };
    }, []);

    useEffect(() => {
        if(showPopup) {
            if (modalRef.current) modalRef.current.classList.add('show');
            if (backdropRef.current) backdropRef.current.classList.add('show');
        }
    }, [showPopup]);

    const handlePayment = () => {

        // 참고 링크 http://www.iamport.kr/getstarted
        const { IMP } = window;
        const apiKey = import.meta.env.VITE_IMP_API_KEY;
        IMP.init(apiKey);  // 아임포트에 가입시 부여받은 "가맹점 식별코드". .env.development에 VITE_IMP_API_KEY 값이 설정되어 있음
            
        // 결제요청하기
        IMP.request_pay({
            pg : 'html5_inicis', // 결제방식 PG사 구분
            pay_method : 'card',	// 결제 수단
            merchant_uid : 'merchant_' + new Date().getTime(), // 가맹점에서 생성/관리하는 고유 주문번호
            name : productName,   // 코인충전 또는 order 테이블에 들어갈 주문명 혹은 주문 번호. (선택항목)원활한 결제정보 확인을 위해 입력 권장(PG사 마다 차이가 있지만) 16자 이내로 작성하기를 권장
            // amount : amountPaid,  // 결제 금액 number 타입. 필수항목.
            amount : 100,  // 테스트를 위해 100원으로 설정
            buyer_email : userDetail.email,  // 구매자 email
            buyer_name : userDetail.name,	   // 구매자 이름
            buyer_tel : userDetail.tel,   // 구매자 전화번호 (필수항목)
            buyer_addr : '',
            buyer_postcode : '',
            m_redirect_url : ''  // 휴대폰 사용시 결제 완료 후 action : 컨트롤러로 보내서 자체 db에 입력시킬것!
        }, function(rsp) {
            /*
                if ( rsp.success ) {
                    var msg = '결제가 완료되었습니다.';
                    msg += '고유ID : ' + rsp.imp_uid;
                    msg += '상점 거래ID : ' + rsp.merchant_uid;
                    msg += '결제 금액 : ' + rsp.paid_amount;
                    msg += '카드 승인번호 : ' + rsp.apply_num;
                } else {
                    var msg = '결제에 실패하였습니다.';
                    msg += '에러내용 : ' + rsp.error_msg;
                }
                alert(msg);
            */

            if ( rsp.success ) {
                Swal.fire({
                    icon: 'success',
                    title: "결제 완료",
                    text: "결제가 완료되었습니다.",
                    timer: 2000,
                    timerProgressBar: true,     // 진행 게이지바
                    didOpen: () => {
                        Swal.showLoading();     // 로딩 애니메이션, 이거 사용 시 버튼 비활성화 되어서 보이지 않음
                    }
                }).then(() => {
                    onComplete();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: "결제 실패",
                    text: '결제가 취소되었습니다.',
                    timer: 2000,
                    timerProgressBar: true,     // 진행 게이지바
                    didOpen: () => {
                        Swal.showLoading();     // 로딩 애니메이션, 이거 사용 시 버튼 비활성화 되어서 보이지 않음
                    }
                }).then(() => {
                    onPrev();
                });
            }

        }); // end of IMP.request_pay()----------------------------

    };

    return (
        <>
            <div className="h6 mb-2">3/3</div>
            <hr/>
            <div className="h6 my-4">결제</div>
            <div>결제가 진행 중입니다.</div>
        </>
    )
}

export default CheckoutPayment;