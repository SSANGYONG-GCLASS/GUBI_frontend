import { useState } from "react";
import { httpRequest_axios, VITE_SERVER_HOST } from "../../api/api";
import { useLocation } from "react-router-dom";
import styles from "./PasswordUpdate.module.css";

function PasswordUpdate() {
  const location = useLocation();
  const useridFromLocation = location.state?.userId;
  const emailFromLocation = location.state?.email;

  const [userId] = useState(useridFromLocation || "");
  const [email] = useState(emailFromLocation || "");
  const [passwd, setPasswd] = useState("");
  const [passwdCheck, setPasswdCheck] = useState("");
  const [emailAuthVerified, setEmailAuthVerified] = useState(false);

  const [showEmailAuth, setShowEmailAuth] = useState(false);

  const [emailAuth, setEmailAuth] = useState("");
  const [emailAuthResult, setEmailAuthResult] = useState("");

  // 비밀번호 수정 요청
  const handleSubmit = () => {

    const userData = JSON.stringify({"password" : passwd, "newPassword" : passwdCheck, "userid" : userId});

    const regExp_passwd = new RegExp(/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).*$/g);

    if (!userId) {
      alert("사용자 ID가 없습니다.");
      return;
    }

    if (!emailAuthVerified && email) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    if (passwd === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (passwdCheck === "") {
      alert("비밀번호 확인을 입력해주세요.");
      return;
    }

    if(!regExp_passwd.test(passwdCheck)){
      alert("비밀번호는 숫자/문자/특수문자 포함하여 8~16자리로 입력하세요.");
      return;
    }

    if (passwd !== passwdCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    function success(data) {
        alert(data.message)

        if(data.message == "이전 패스워드 값과 동일합니다."){
          alert('이전 데이터랑 같잖어 다시해')
        }
        else{
          alert('로그인페이지 이동한다!')
          navigate("/login");
        }
    }
    
    function fail(err) {
      if(err.status == 404) {
        alert(err.status)
      }
    }

    httpRequest_axios(`${VITE_SERVER_HOST}/api/user/updatePassword`, "PUT", userData, success, fail);
  };



  const handleEmailSend = () => {

    const userData = JSON.stringify({"userid" : userId, "email" : email})

        function success(data) {
            alert('성공했슈')
            setShowEmailAuth(true);
        }
        
        function fail(err) {
            alert('실패했슈')
            console.log(err)
        }

    httpRequest_axios(`${VITE_SERVER_HOST}/api/user/emailSend`, "POST", userData, success, fail);
    
    
  };

  const handleEmailAuthCheck = () => {
    const authData = JSON.stringify({ "code" : emailAuth, "email" : email});

        function success(data) {
            alert('체크성공했슈')
            setEmailAuthResult("인증 완료되었습니다.");
            setEmailAuthVerified(true);
        }
        
        function fail(err) {
            console.error(err);
            alert('체크실패했슈' + err)
        }

    httpRequest_axios(`${VITE_SERVER_HOST}/api/user/emailCodeAuthCheck`, "POST", authData, success, fail);
    
  };

  return (
    <div className="container mt-5">
      <h4>비밀번호 수정</h4>
      <form name="passwdUpdateFrm">
        <div className="row justify-content-center">
          {/* 아이디 표시 */}
          <div className="col-lg-5 col-md-7" style={{ margin: "3% 0 1% 0" }}>
            아이디&nbsp;<span className={styles.star}>*</span>
          </div>
          <div className="w-100"></div>
          <div className="col-lg-5 col-md-7" style={{ position: "relative", margin: 0 }}>
            <input
              type="text"
              name="userid"
              id="userid"
              maxLength="16"
              className={`${styles.requiredInfo} ${styles.underline} ${styles.input_background} ${styles.disabled}`}
              value={userId}
              readOnly
            />
          </div>

          <div className="w-100"></div>

          {/* 새 비밀번호 */}
          <div className="col-lg-5 col-md-7" style={{ margin: "3% 0 1% 0" }}>
            비밀번호&nbsp;<span className={styles.star}>*</span>
          </div>
          <div className="w-100"></div>
          <div className="col-lg-5 col-md-7">
            <input
              type="password"
              name="passwd"
              id="passwd"
              maxLength="15"
              className={`${styles.requiredInfo} ${styles.underline}`}
              placeholder="영문자/숫자/특수기호 조합하여 8~16글자"
              value={passwd}
              onChange={(e) => setPasswd(e.target.value)}
            />
          </div>
          <div className="w-100"></div>
          {/* <div id="passwderror" className={`col-lg-5 col-md-7 ${styles.error}`}></div> */}

          {/* 새 비밀번호 확인 */}
          <div className="col-lg-5 col-md-7" style={{ margin: "3% 0 1% 0" }}>
            비밀번호 확인&nbsp;<span className={styles.star}>*</span>
          </div>
          <div className="w-100"></div>
          <div className="col-lg-5 col-md-7">
            <input
              type="password"
              name="passwdcheck"
              id="passwdcheck"
              maxLength="15"
              className={`${styles.requiredInfo} ${styles.underline}`}
              placeholder="비밀번호 확인"
              value={passwdCheck}
              onChange={(e) => setPasswdCheck(e.target.value)}
            />
          </div>
          <div className="w-100"></div>
          {/* <div id="passwdcheckerror" className={`col-lg-5 col-md-7 ${styles.error}`}></div> */}

          {/* 이메일 */}
          <div className="col-lg-5 col-md-7" style={{ margin: "3% 0 1% 0" }}>
            이메일&nbsp;<span className={styles.star}>*</span>
          </div>
          <div className="w-100"></div>
          <div className="col-lg-5 col-md-7" style={{ position: "relative", margin: 0 }}>
            <input
              type="email"
              name="email"
              id="email"
              maxLength="60"
              className={`${styles.requiredInfo} ${styles.underline} ${styles.disabled}`}
              value={email}
              readOnly
            />
            <button
              type="button"
              id="emailSend"
              className={styles.checkbutton}
              style={{ position: "absolute", right: "15px", display: "inline-block" }}
              onClick={handleEmailSend}
            >
              이메일 인증
            </button>
          </div>
          <div className="w-100"></div>{/* 
          <div id="emailSendResult" className={` ${styles.error}`}>
            {emailSendResult}
          </div>*/}

          {/* 인증번호 입력 */}
          {showEmailAuth && (
            <>
              <div className={`col-lg-5 col-md-7 ${styles.hide_emailAuth}`} style={{ margin: "3% 0 1% 0" }}>
                인증번호&nbsp;<span className={styles.star}>*</span>
              </div>
              <div className={`w-100 ${styles.hide_emailAuth}`}></div>
              <div className={`col-lg-5 col-md-7 ${styles.hide_emailAuth}`} style={{ position: "relative", margin: 0 }}>
                <input
                  type="text"
                  name="email_auth"
                  id="email_auth"
                  maxLength="60"
                  className={`${styles.requiredInfo} ${styles.underline} ${styles.hide_emailAuth}`}
                  placeholder="발송된 인증번호를 입력하세요."
                  value={emailAuth}
                  onChange={(e) => setEmailAuth(e.target.value)}
                />
                <button
                  type="button"
                  id="btn_email_auth"
                  className={`${styles.checkbutton} ${styles.hide_emailAuth}`}
                  style={{ position: "absolute", right: "15px", display: "inline-block" }}
                  onClick={handleEmailAuthCheck}
                >
                  인증번호 확인
                </button>
              </div>
              <div className={`w-100 ${styles.hide_emailAuth}`}></div>
              <div id="email_authResult" className={`col-lg-5 col-md-7 ${styles.error} ${styles.hide_emailAuth}`}>
                {emailAuthResult}
              </div>
            </>
          )}
          {/* 하단 여백 */}
          <div style={{ marginBottom: "7%" }}></div>

          {/* 비밀번호 변경 버튼 */}
          <div className="col-lg-5 col-md-7">
            <input
              type="button"
              className={styles.btnstyle}
              value="비밀번호 변경하기"
              onClick={handleSubmit}
            />
          </div>
          <div className="w-100"></div>
          <div style={{ marginBottom: "10%" }}></div>
        </div>
      </form>
    </div>
  );
}

export default PasswordUpdate;
