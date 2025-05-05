import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function AdminIndex() {
    return (
        <>
            <p>관리자페이지 입니당</p>
            <button onClick={()=> {
                Swal.fire({
                    icon: 'info',
                    title: "관리자페이지",
                    timer: 1500,
                    timerProgressBar: true,     // 진행 게이지바
                    didOpen: () => {
                        Swal.showLoading();     // 로딩 애니메이션, 이거 사용 시 버튼 비활성화 되어서 보이지 않음
                    }
                })
            }}>어서오세용</button>
            <br/>
            <br/>
            <br/>
            <Link to='/'>메인페이지로 이동</Link>
        </>
    )
}

export default AdminIndex;