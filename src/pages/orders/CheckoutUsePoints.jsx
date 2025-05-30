import { useEffect } from "react";
import styles from './Checkout.module.css';

function CheckoutUsePoints({userDetail, usePoint, setUsePoint}) {

    const handleUsePoint = (e) => {
        const value = e.target.value;
        const number = value === '' ? 0 : Number(value);

        if(isNaN(number) || number < 0) {
            setUsePoint(0);
        }
        else if(userDetail.point < number) {
            setUsePoint(userDetail.point);
        }
        else {
            setUsePoint(number);
        }
    };

    useEffect(() => {
        document.title = "GUBI - 주문 포인트 사용";
        if(usePoint == null) {
            setUsePoint(0);
        }
    }, []);

    return (
        <>
            <div className="h6 mb-2">2/3</div>
            <hr/>
            <div className="h6 my-4">포인트 사용</div>
            <ul>
                <li className="my-2">
                    <label>보유</label>
                    <div id="memberPoint">{userDetail && userDetail.point.toLocaleString('ko-KR')}P</div>
                </li>
                <li className="my-3">
                    <label htmlFor="usePoint">사용</label>
                    <div style={{position: 'relative'}}>
                        {usePoint != null && <input className={styles.input} type="number" name="usePoint" maxLength="10" onChange={handleUsePoint} value={usePoint}/>}
                        <button className={styles.useAllPointBtn} type="button" style={{position: 'absolute', right: '0px'}} onClick={e => setUsePoint(userDetail.point)}>전액 사용</button>
                    </div>
                </li>
            </ul>
        </>
    )
}

export default CheckoutUsePoints;