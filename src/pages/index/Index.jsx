import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { httpRequest_axios, VITE_SERVER_HOST } from "../../api/api";
import { useState } from "react";



function Index() {

    const [name, setName] = useState('기본값');

    const getServerData = () => {

        // API 통신 성공 시 콜백함수 (여기서 성공 후처리, 데이터 핸들링 하면 됨)
        function success(data) {
            setName(data.name);
        }
        
        // API 통신 실패 시 콜백함수 (여기서 실패 후처리, 에러 핸들링 하면 됨)
        function fail(err) {
            alert("통신실패"+ err);
        }

        httpRequest_axios(`${VITE_SERVER_HOST}/api/user`, "GET", null, success, fail);
    };

    return (
        <>
            <p>메인페이지 입니당</p>
            <button onClick={()=> {
                Swal.fire({
                    icon: 'info',
                    title: "메인페이지",
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
            <Link to='/admin'>관리자페이지로 이동</Link>


            <br/>
            <br/>
            <br/>
            <button onClick={getServerData}>서버에 회원 정보 요청</button>
            <button onClick={()=> setName('기본값')}>초기화</button>

            <p>회원명: {name}</p>
        </>
    );
};

export default Index;