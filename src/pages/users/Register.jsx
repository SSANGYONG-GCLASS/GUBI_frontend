import { useState } from "react";
import { httpRequest_axios, VITE_SERVER_HOST, httpRequest } from "../../api/api";
import { useLocation } from "react-router-dom";
import styles from "./MemberRegister.module.css";

function Register() {

    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [name, setName] = useState("");
    const [birth, setBirth] = useState("");
    const [email, setEmail] = useState("");
    const [emailAuth, setEmailAuth] = useState("");
    const [hp1, setHp1] = useState("010");
    const [hp2, setHp2] = useState("");
    const [hp3, setHp3] = useState("");
    const [postcode, setPostcode] = useState("");
    const [address, setAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [agree, setAgree] = useState(false);

    const goRegister = () => {
        alert('회원가입')
    }
    



  return (
    <div className="container mt-5">
        <h4>JOIN US</h4>

        <form name="registerFrm">
            <div className="row justify-content-center">
                <div className="col-lg-5 col-md-7" style={{ margin: '3% 0 1% 0' }}>
                    아이디&nbsp;<span className={styles.star}>*</span>
                </div>
                <div className="w-100"></div>
                <div className="col-lg-5 col-md-7" style={{ position: 'relative', margin: '0px' }}>
                    <input
                        type="text"
                        name="userid"
                        id="userid"
                        maxLength="16"
                        className={`${styles.requiredInfo} ${styles.underline}`}
                        placeholder="영문소문자/숫자 4~16 자"
                        onChange={(e) => setUserid(e.target.value)}
                        value={userid}
                    />
                    <button
                        type="button"
                        id="idcheck"
                        className={styles.checkbutton}
                        style={{ position: 'absolute', right: '15px', display: 'inline-block' }}
                    >
                        아이디 중복검사
                    </button>
                </div>
                <div className="w-100"></div>
                <div id="idcheckResult" className={`error col-lg-5 col-md-7 ${styles.hide_Result}`}></div>
                <div className="w-100"></div>
                <div id="useriderror" className={`error col-lg-5 col-md-7`}></div>
                <div className="w-100"></div>

                <div className="col-lg-5 col-md-7" style={{ margin: '3% 0 1% 0' }}>
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
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <div className="w-100"></div>
                <div id="passwderror" className={`col-lg-5 col-md-7 error`}></div>
                <div className="w-100"></div>

                <div className="col-lg-5 col-md-7" style={{ margin: '3% 0 1% 0' }}>
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
                        onChange={(e) => setPasswordCheck(e.target.value)}
                        value={passwordCheck}
                    />
                </div>
                <div className="w-100"></div>
                <div id="passwdcheckerror" className={`col-lg-5 col-md-7 error`}></div>
                <div className="w-100"></div>

                <div className="col-lg-5 col-md-7" style={{ margin: '3% 0 1% 0' }}>
                    이름&nbsp;<span className={styles.star}>*</span>
                </div>
                <div className="w-100"></div>
                <div className="col-lg-5 col-md-7">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        maxLength="20"
                        className={`${styles.requiredInfo} ${styles.underline}`}
                        placeholder="이름을 입력하세요."
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>
                <div className="w-100"></div>
                <div id="nameerror" className={`col-lg-5 col-md-7 error`}></div>
                <div className="w-100"></div>

                <div className="col-lg-5 col-md-7" style={{ margin: '3% 0 1% 0' }}>
                    생년월일&nbsp;<span className={styles.star}>*</span>
                </div>
                <div className="w-100"></div>
                <div className="col-lg-5 col-md-7">
                    <input
                        type="text"
                        name="birth"
                        id="datepicker"
                        maxLength="10"
                        className={styles.underline}
                        onChange={(e) => setBirth(e.target.value)}
                        value={birth}
                    />
                </div>
                <div className="w-100"></div>
                <div id="birtherror" className={`col-lg-5 col-md-7 error`}></div>
                <div className="w-100"></div>

                <div className="col-lg-5 col-md-7" style={{ margin: '3% 0 1% 0' }}>
                    이메일&nbsp;<span className={styles.star}>*</span>
                </div>
                <div className="w-100"></div>
                <div className="col-lg-5 col-md-7" style={{ position: 'relative', margin: '0px' }}>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        maxLength="60"
                        className={`${styles.requiredInfo} ${styles.underline}`}
                        placeholder="이메일을 입력하세요."
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <button
                        type="button"
                        id="emailcheck"
                        className={styles.checkbutton}
                        style={{ position: 'absolute', right: '15px', display: 'inline-block' }}
                    >
                        인증번호 발송
                    </button>
                </div>
                <div className="w-100"></div>
                <div id="emailCheckResult" className={`error col-lg-5 col-md-7 ${styles.hide_Result}`}></div>
                <div className="w-100"></div>
                <div id="emailerror" className={`error col-lg-5 col-md-7`}></div>
                <div className="w-100"></div>

                <div className={`col-lg-5 col-md-7 ${styles.hide_emailAuth}`} style={{ margin: '3% 0 1% 0' }}>
                    인증번호&nbsp;<span className={styles.star}>*</span>
                </div>
                <div className={`w-100 ${styles.hide_emailAuth}`}></div>
                <div className={`col-lg-5 col-md-7 ${styles.hide_emailAuth}`} style={{ position: 'relative', margin: '0px' }}>
                    <input
                        type="text"
                        name="email_auth"
                        id="email_auth"
                        maxLength="60"
                        className={`${styles.requiredInfo} ${styles.underline} ${styles.hide_emailAuth}`}
                        placeholder="발송된 인증번호를 입력하세요."
                        onChange={(e) => setEmailAuth(e.target.value)}
                        value={emailAuth}
                    />
                    <button
                        type="button"
                        id="btn_email_auth"
                        className={`${styles.checkbutton} ${styles.hide_emailAuth}`}
                        style={{ position: 'absolute', right: '15px', display: 'inline-block' }}
                    >
                        인증번호 확인
                    </button>
                </div>
                <div className={`w-100 ${styles.hide_emailAuth}`}></div>
                <div id="email_authResult" className={`error col-lg-5 col-md-7 ${styles.hide_emailAuth}`}></div>
                <div className={`w-100 ${styles.hide_emailAuth}`}></div>

                <div className="col-lg-5 col-md-7" style={{ margin: '3% 0 1% 0' }}>
                    연락처&nbsp;<span className={styles.star}>*</span>
                </div>
                <div className="w-100"></div>
                <div className="col-lg-5 col-md-7">
                    <input type="text" name="hp1" id="hp1" size="6" maxLength="3" value="010" readOnly
                        className={styles.telunderline} />&nbsp;-&nbsp;
                    <input type="text" name="hp2" id="hp2" size="6" maxLength="4" className={`${styles.telunderline} ${styles.requiredInfo}`} onChange={(e) => setHp2(e.target.value)} value={hp2}/>&nbsp;-&nbsp;
                    <input type="text" name="hp3" id="hp3" size="6" maxLength="4" className={`${styles.telunderline} ${styles.requiredInfo}`} onChange={(e) => setHp3(e.target.value)} value={hp3}/>
                </div>
                <div className="w-100"></div>
                <div id="telerror" className={`col-lg-5 col-md-7 error`}></div>
                <div className="w-100"></div>

                <div className="col-lg-5 col-md-7" style={{ margin: '3% 0 1% 0' }}>
                    우편번호&nbsp;<span className={styles.star}>*</span>
                </div>
                <div className="w-100"></div>
                <div className="col-lg-5 col-md-7" style={{ position: 'relative', margin: '0px' }}>
                    <input
                        type="text"
                        name="postcode"
                        id="postcode"
                        size="6"
                        maxLength="5"
                        className={`${styles.postcodeunderline} ${styles.requiredInfo}`}
                    />
                    <button
                        type="button"
                        id="zipcodeSearch"
                        className={styles.checkbutton}
                        style={{ position: 'absolute', right: '260px', display: 'inline-block' }}
                    >
                        우편번호찾기
                    </button>
                </div>
                <div className="w-100"></div>
                <div id="postcodeerror" className={`col-lg-5 col-md-7 error`}></div>
                <div className="w-100"></div>

                <div className="col-lg-5 col-md-7" style={{ margin: '0 0 1% 0' }}>
                    주소&nbsp;<span className={styles.star}>*</span>
                </div>
                <div className="w-100"></div>
                <div className="col-lg-5 col-md-7">
                    <input type="text" name="address" id="address" size="40" maxLength="200" placeholder="주소"
                        className={`${styles.underline} ${styles.requiredInfo}`} /><br />
                    <input type="text" name="detail_address" id="detail_Address" size="40" maxLength="200"
                        placeholder="상세주소" className={`${styles.underline} ${styles.requiredInfo}`} />
                </div>
                <div className="w-100"></div>
                <div id="addresserror" className={`col-lg-5 col-md-7 ${styles.error}`}></div>
                <div className="w-100"></div>

                <div style={{ margin: '1% 0 5% 0' }}></div>

                <div className="col-lg-5 col-md-7">
                    <label htmlFor="agree">이용약관에 동의합니다.</label>&nbsp;&nbsp;
                    <input type="checkbox" id="agree" />
                </div>
                <div className="w-100"></div>

                <div className="col-lg-10 col-md-7">
                    <iframe src="" width="100%" height="150px"
                        style={{ border: 'solid 1px navy' }}></iframe>
                </div>
                <div className="w-100"></div>

                <div style={{ margin: '5% 0 5% 0' }}></div>

                <div className="col-lg-5 col-md-7">
                    <input type="button" className={styles.btnstyle} value="가입하기" onClick={goRegister} />
                </div>
                <div className="w-100"></div>
                <div style={{ marginBottom: '10%' }}></div>
            </div>
        </form>
    </div>



  )
}

export default Register
