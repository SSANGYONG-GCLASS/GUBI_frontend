import { useState } from "react";
import { httpRequest_axios, VITE_SERVER_HOST } from "../../api/api";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "./IdFind.module.css";


function IdFind() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isEmailOk, setIsEmailOk] = useState(false);


    const [emailAuth, setEmailAuth] = useState("");
    const [showEmailAuth, setShowEmailAuth] = useState(false);

    const goidFind = () => {
        // 여기에 아이디 찾기 요청 로직 추가 (예: fetch/axios)
        console.log("아이디 찾기 버튼 클릭:", { name, email, emailAuth });
    };


    // name 블러 처리
    const handleBlur = (e) => {
        const inputName = e.target.value.trim();

        if (inputName === "") {
            setName("");
            setNameError("성명은 필수입력 사항입니다.");
            return;
        }

        const regExpName = /^[가-힣]{2,10}$|^[a-zA-Z]{2,10}[a-zA-Z]{2,10}$/;
        const isValid = regExpName.test(inputName);

        if (!isValid) {
            setName("");
            setNameError("성명은 한글, 영어로 최대 20글자까지 가능합니다.");
        } else {
            setNameError("");
        }
    };



    // 이메일 메소드
    const handleEmailBlur = () => {
    const trimmedEmail = email.trim();

    if (trimmedEmail === "") {
        setEmail("");          // 공백 입력시 초기화
        setEmailError("이메일은 필수입력 사항입니다.");
        setIsEmailOk(false);
        return;
    }

    const regExpEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (!regExpEmail.test(trimmedEmail)) {
      setEmail("");          // 형식 틀리면 초기화
      setEmailError("이메일 형식이 아닙니다.");
      setIsEmailOk(false);
    } else {
      setEmailError("");
      setIsEmailOk(true);
    }
  };


    const handleEmailSend = () => {

        const userData = JSON.stringify({"name" : name, "email" : email})

        function success(data) {
            alert('성공했슈')
            setShowEmailAuth(true);
        }
        
        function fail() {
            alert('실패했슈')
        }

        httpRequest_axios(`${VITE_SERVER_HOST}/api/user/emailCheckAndSend`, "POST", userData, success, fail);
        
    };

    const handleEmailAuthCheck = () => {
        
        const authData = JSON.stringify({ "code" : emailAuth, "email" : email, "name" : name });

        function success(data) {
            alert('체크성공했슈')
            setShowEmailAuth(true);

            navigate("/idFindEnd", { state: { userId: data.userId, name: name } });
        }
        
        function fail(err) {
            console.error(err);
            alert('체크실패했슈' + err)
        }

        httpRequest_axios(`${VITE_SERVER_HOST}/api/user/emailAuthCheck`, "POST", authData, success, fail);
        
    };

    return (
        <div className="container mt-5" style={{ border: "solid 0px red" }}>
            <h4>아이디 찾기</h4>

            <form name="idFindFrm">
                <div className="row justify-content-center">

                {/* 성명 */}
                <div className="col-lg-5 col-md-7" style={{ margin: "3% 0 1% 0" }}>
                    성명&nbsp;<span className={styles.star}>*</span>
                </div>
                <div className="w-100"></div>
                <div className="col-lg-5 col-md-7">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        maxLength="15"
                        className={`${styles.requiredInfo} ${styles.underline}`}
                        placeholder="성명"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={handleBlur}
                    />
                    <div id="nameerror" className={styles.error}>
                        {nameError}
                    </div>
                </div>
                <div className="w-100"></div>
                <div id="nameerror" className={`col-lg-5 col-md-7 ${styles.error}`}></div>
                <div className="w-100"></div>

                {/* 이메일 */}
                <div className="col-lg-5 col-md-7" style={{ margin: "3% 0 1% 0" }}>
                    이메일&nbsp;<span className={styles.star}>*</span>
                </div>
                <div className="w-100"></div>
                <div className="col-lg-5 col-md-7" style={{ position: "relative", margin: "0px" }}>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        maxLength="60"
                        className={`${styles.requiredInfo} ${styles.underline} ${emailError ? styles.isInvalid : ""}`}
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={handleEmailBlur}
                    />
                    <div id="emailerror" className={styles.error}>
                        {emailError}
                    </div>
                    <button
                        type="button"
                        id="emailSend"
                        className={styles.checkbutton}
                        style={{ position: "absolute", right: "15px", top: "0px" }}
                        onClick={handleEmailSend}
                        disabled={!name || !email || !!nameError || !!emailError}
                    >
                    이메일 인증
                    </button>
                </div>
                <div className="w-100"></div>
                <div id="emailSendResult" className={`col-lg-5 col-md-7 ${styles.error} ${styles.hide_Result}`}></div>
                <div id="emailerror" className={`col-lg-5 col-md-7 ${styles.error}`}></div>
                <div className="w-100"></div>

                {/* 인증번호 */}
                {showEmailAuth && (
                    <>
                    <div className="col-lg-5 col-md-7" style={{ margin: "3% 0 1% 0" }}>
                        인증번호&nbsp;<span className={styles.star}>*</span>
                    </div>
                    <div className="w-100"></div>
                    <div className="col-lg-5 col-md-7" style={{ position: "relative", margin: "0px" }}>
                        <input
                            type="text"
                            name="email_auth"
                            id="email_auth"
                            maxLength="60"
                            className={`${styles.requiredInfo} ${styles.underline}`}
                            placeholder="발송된 인증번호를 입력하세요."
                            value={emailAuth}
                            onChange={(e) => setEmailAuth(e.target.value)}
                        />
                        <button
                            type="button"
                            id="btn_email_auth"
                            className={styles.checkbutton}
                            style={{ position: "absolute", right: "15px", display: "inline-block" }}
                            onClick={handleEmailAuthCheck}
                        >
                        인증번호 확인
                        </button>
                    </div>
                    <div className="w-100"></div>
                    <div id="email_authResult" className={`col-lg-5 col-md-7 ${styles.error}`}></div>
                    <div className="w-100"></div>
                    </>
                )}

                <div style={{ marginBottom: "7%" }}></div>

                {/* 아이디 찾기 버튼 */}
                <div className="col-lg-5 col-md-7">
                    <input
                        type="button"
                        className={styles.btnstyle}
                        value="아이디 찾기"
                        onClick={goidFind}
                    />
                </div>
                <div className="w-100"></div>
                <div style={{ marginBottom: "10%" }}></div>

                </div>
            </form>
        </div>
    );
}

export default IdFind;
