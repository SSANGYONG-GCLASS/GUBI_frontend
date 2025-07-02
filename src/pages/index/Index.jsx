import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { httpRequest, httpRequest_axios, VITE_SERVER_HOST } from "../../api/api";
import { useState } from "react";


function Index() {

    const [info, setInfo] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [data, setData] = useState(''); // 문자열이라 '' 로 적음

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


    /* 
        console.log 찍는 방법
        useEffect(()=>{console.log("name -> ", name + "email -> ", email + "tel -> ", tel)});
        useEffect(()=>{console.log("id 확인 오류 확인 ==>>>", id)});
    */
    // 데이터 값 insert 시작 //
    const goData = () => {

        const userData = JSON.stringify({"name" : name, "email" : email, "tel" : tel})

        function success(data) {
            setData(data);
        }
        
        function fail(err) {
            alert("통신실패"+ err);
        }

        httpRequest(`${VITE_SERVER_HOST}/api/user`, "Post", userData, success, fail);
    };
    // 데이터 값 insert 끝 //


    // 데이터 값 update 시작 //
    const updateData = () => {

        const userData = JSON.stringify({"id" : data.id, "name" : name, "email" : email, "tel" : tel})

        function success(data) {
            setData(data);
        }
        
        function fail(err) {
            alert("통신실패"+ err);
        }

        httpRequest(`${VITE_SERVER_HOST}/api/user`, "Put", userData, success, fail);
    };
    // 데이터 값 update 시작 //


    // 데이터 값 delete 시작 //
    const deleteData = () => {

        function success(data) {
            setData(data);
        }
        
        function fail(err) {
            alert("통신실패"+ err);
        }
        
        httpRequest(`${VITE_SERVER_HOST}/api/user/${data.id}`, "Delete", null, success, fail);
    }
    // 데이터 값 delete 끝 //

    const logout = () => {

        function success(data) {
            console.log(data);
            alert(data.message)
        }
        
        function fail(err) {
            alert("통신실패"+ err);
        }

        httpRequest(`${VITE_SERVER_HOST}/api/user/logout`, "POST", null, success, fail);
    }

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
            {/*<button onClick={saveInfo}>회원 등록</button>
            <button onClick={updateInfo}>회원 수정</button>
            <button onClick={deleteInfo}>회원 삭제</button> */}
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

            <br/>
            <br/>
            <br/>

            <input type="text" name="name" onChange={(event)=>{setName(event.target.value)}} placeholder="이름"></input><br/> {/* 이렇게 하는 이유? 이게 리액트 */}
            <input type="text" name="email" onChange={(event)=>{setEmail(event.target.value)}} placeholder="이메일"></input><br/>
            <input type="text" name="tel" onChange={(event)=>{setTel(event.target.value)}} placeholder="전화번호"></input><br/>
            <br/>
            <br/>
            <button onClick={goData}>회원가입</button>
            <button onClick={updateData}>수정하기</button>
            <button onClick={deleteData}>삭제</button>

            {data && ( // && 은 왼쪽의 피연산자가 참이라면 오른쪽의 컴포넌트나 엘리먼트가 랜더링된다는 뜻이다.
                <>
                    <p>번호: {data.id}</p>
                    <p>이름: {data.name}</p>
                    <p>이메일: {data.email}</p>
                    <p>전화번호: {data.tel}</p>
                </>
            )}

            <br />
            <br />
            <br />

            <Link to='/login'>로그인 페이지 이동</Link>
            <br />
            <Link to='/myPage'>마이 페이지 이동</Link>
            <br />
            <button onClick={logout}>로그아웃</button>
        </>
    );
};

export default Index;