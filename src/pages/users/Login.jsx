import { useEffect, useState } from "react";
import { httpRequest_axios, VITE_SERVER_HOST } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { Tabs, Tab, Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';


function Login() {
    const navigate = useNavigate();

    const [key, setKey] = useState('user');
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [adminId, setAdminId] = useState('');
    const [adminPass, setAdminPass] = useState('');
    const [saveId, setSaveId] = useState(false);
    


    useEffect(() => {
        const savedId = localStorage.getItem('saveid');
        if (savedId) {
        setUserId(savedId);
        setSaveId(true);
        }
    }, []);

    const handleUserLogin = (e) => {
        e.preventDefault();

        if (saveId) {
            localStorage.setItem('saveid', userId);
        } else {
            localStorage.removeItem('saveid');
        }

        const userData = JSON.stringify({ "userid" : userId, "password" : userPassword });
        
        function success() {
            // 성공 시 로그인 데이터 처리
            setLoginError("");  // 에러 초기화
            alert("로그인 성공!");
            // 로그인 후 추가 처리

            navigate("/"); // 로그인 성공시 홈으로 이동합니다.
        }
        
        function fail(err) {
            
            console.log(err)

            if (err.status === 401 || err.status === 404) {
                setLoginError("아이디 또는 비밀번호가 잘못되었습니다.");
            } else if (err.status === 403) {
                if(err.code === 'U3'){
                    alert('휴면계정입니다. 휴면해제 페이지로 이동합니다.')
                    navigate("/memberReactivation");
                } else if(err.code === 'U4') {
                    alert('비밀번호를 변경한지 3개월이 지났습니다.')
                }
                
            } else if (err.status === 500) {
                setLoginError("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
            } else {
                setLoginError("예상치 못한 오류가 발생했습니다.");
            }
            
        }

        httpRequest_axios(`${VITE_SERVER_HOST}/api/user/login`, "POST", userData, success, fail);
    };


    const handleAdminLogin = () => {
        console.log('관리자 로그인 요청:', { adminId, adminPass });
        // navigate('/admin/dashboard');
    };


    const goToRegister = () => {
        navigate('/register');
    };

    return (
        <Container className="pt-5" style={{ height: 'calc(100vh - 123px)' }}>
            <h4>LOGIN / JOIN US</h4>

            <Row className="justify-content-center">
                <Col lg={5} md={7}>
                <Tabs id="login-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3" fill>
                    <Tab eventKey="user" className={styles.navLink} title="회원으로 로그인">
                    <Form>
                        <Form.Group className="mb-2">
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="아이디"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            autoComplete="off"
                            isInvalid={!!loginError}
                        />
                        </Form.Group>

                        <Form.Group className="mb-2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="비밀번호"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            autoComplete="off"
                            isInvalid={!!loginError}
                        />
                        </Form.Group>

                        

                        <div className="d-flex justify-content-between align-items-center mb-3">
                        <Form.Check
                            type="checkbox"
                            label="아이디 저장하기"
                            checked={saveId}
                            onChange={(e) => setSaveId(e.target.checked)}
                        />
                        <div>
                            <Link to="/idFind" style={{ color: 'black' }}>아이디찾기</Link> /{' '}
                            <a href="/passwordFind" style={{ color: 'black' }}>비밀번호찾기</a>
                        </div>
                        </div>

                        {loginError && (
                            <Alert variant="danger" className="mb-3">
                                {loginError}
                            </Alert>
                        )}

                        <Button type="button" variant="dark" className="w-100 mb-2" onClick={handleUserLogin}>LOGIN</Button>
                        <Button type="button" variant="secondary" className="w-100" onClick={goToRegister}>JOIN US</Button>
                    </Form>
                    </Tab>

                    <Tab eventKey="admin" title="관리자로 로그인">
                    <Form>
                        <Form.Group className="mb-2">
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="아이디"
                            value={adminId}
                            onChange={(e) => setAdminId(e.target.value)}
                            autoComplete="off"
                        />
                        </Form.Group>

                        <Form.Group className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="비밀번호"
                            value={adminPass}
                            onChange={(e) => setAdminPass(e.target.value)}
                            autoComplete="off"
                        />
                        </Form.Group>

                        <Button type="button" variant="dark" className="w-100" onClick={handleAdminLogin}>LOGIN</Button>
                    </Form>
                    </Tab>
                </Tabs>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
