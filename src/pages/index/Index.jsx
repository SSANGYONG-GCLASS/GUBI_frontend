import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { httpRequest, httpRequest_axios, VITE_SERVER_HOST } from "../../api/api";
import { useEffect, useState } from "react";



function Index() {

    const [info, setInfo] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');

    const getServerData = () => {

        // API 통신 성공 시 콜백함수 (여기서 성공 후처리, 데이터 핸들링 하면 됨)
        function success(data) {
            setInfo(data);
        }
        
        // API 통신 실패 시 콜백함수 (여기서 실패 후처리, 에러 핸들링 하면 됨)
        function fail(err) {
            alert("통신실패"+ err);
        }

        httpRequest_axios(`${VITE_SERVER_HOST}/api/user`, "GET", null, success, fail);
    };

    const saveInfo = () => {

        // API 통신 성공 시 콜백함수 (여기서 성공 후처리, 데이터 핸들링 하면 됨)
        function success(data) {
            setInfo(data);
        }
        
        // API 통신 실패 시 콜백함수 (여기서 실패 후처리, 에러 핸들링 하면 됨)
        function fail(err) {
            alert("통신실패"+ err);
        }

        const body = JSON.stringify({"id":1, "name":name, "email":email, "tel":tel})

        httpRequest(`${VITE_SERVER_HOST}/api/test`, "POST", body, success, fail);
    };

    const deleteInfo = () => {

        // API 통신 성공 시 콜백함수 (여기서 성공 후처리, 데이터 핸들링 하면 됨)
        function success(data) {
            setInfo(null);
            alert(data.message);
        }
        
        // API 통신 실패 시 콜백함수 (여기서 실패 후처리, 에러 핸들링 하면 됨)
        function fail(err) {
            alert("통신실패"+ err);
        }
        
        httpRequest(`${VITE_SERVER_HOST}/api/test/${1}`, "DELETE", null, success, fail);
    }

    const updateInfo = () => {

        // API 통신 성공 시 콜백함수 (여기서 성공 후처리, 데이터 핸들링 하면 됨)
        function success(data) {
            setInfo(data);
        }
        
        // API 통신 실패 시 콜백함수 (여기서 실패 후처리, 에러 핸들링 하면 됨)
        function fail(err) {
            alert("통신실패"+ err);
        }

        const body = JSON.stringify({"id":1, "name":name, "email":email, "tel":tel})
        
        httpRequest(`${VITE_SERVER_HOST}/api/test`, "PUT", body, success, fail);
    }

    useEffect(()=> {
        console.log("name:", name);
        console.log("email:", email);
        console.log("tel:", tel);
    });

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
            {/* react는 항상 함수로 처리해줘야 한다. */}
            <input type="text" name="name" onChange={(e) => setName(e.target.value)} placeholder="이름"/>
            <br/>
            <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="이메일"/>
            <br/>
            <input type="text" name="tel" onChange={(e) => setTel(e.target.value)} placeholder="연락처"/>
            <br/>
            <button onClick={saveInfo}>회원 등록</button>
            <button onClick={updateInfo}>회원 수정</button>
            <button onClick={deleteInfo}>회원 삭제</button>
            <br/>
            <br/>
            <Link to='/admin'>관리자페이지로 이동</Link>


            <br/>
            <br/>
            <br/>
            <button onClick={getServerData}>서버에 회원 정보 요청</button>
            <button onClick={()=> setInfo(null)}>초기화</button>

            {/* info 정보가 존재할 때에만 표시 */}
            {info && (
                <>
                    <p>등록된 정보</p>
                    <p>번호: {info.id}</p>
                    <p>회원명: {info.name}</p>
                    <p>이메일: {info.email}</p>
                    <p>연락처: {info.tel}</p>
                </>
            )}
        </>
    );
};

export default Index;