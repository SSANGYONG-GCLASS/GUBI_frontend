import { useState, useEffect } from "react";
import { httpRequest_axios, VITE_SERVER_HOST, httpRequest } from "../../api/api";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./IdFind.module.css";


function IdFindEnd() {
  const navigate = useNavigate();
  const location = useLocation();

  const { userId, name } = location.state || {};

  const goLoginPage = () => {
    alert("로그인 페이지로 이동합니다!");
    navigate("/login");
  };

  const goPasswdFindPage = () => {
    alert("비밀번호 페이지로 이동합니다!");
    navigate("/login/passwd-find");
  };

    return (
        <div className="container mt-5" style={{ border: "solid 0px red" }}>
      <h4>아이디 찾기 출력</h4>

      <div className="row justify-content-center">
        <div
          className="col-lg-5 col-md-7"
          style={{
            margin: "3% 0 1% 0",
            textAlign: "center",
            fontSize: "18pt",
            color: "red",
          }}
        >
          <span id="idResult">
            {name ? `${name}님의 아이디는 ${userId} 입니다.` : "정보를 불러오는 중입니다..."}
          </span>
        </div>

        <div className="w-100" />
        <div style={{ marginBottom: "10%" }} />

        <div
          className="col-lg-5 col-md-7"
          style={{ margin: "3% 0 1% 0" }}
        >
          바로 로그인 하시겠습니까?
        </div>
        <div className="w-100" />
        <div className="col-lg-5 col-md-7">
          <input
            type="button"
            className={styles.btnstyle}
            value="로그인 하러가기"
            onClick={goLoginPage}
          />
        </div>

        <div className="w-100" />
        <div
          className="col-lg-5 col-md-7"
          style={{ margin: "3% 0 1% 0" }}
        >
          비밀번호를 잊으셨습니까?
        </div>
        <div className="w-100" />
        <div className="col-lg-5 col-md-7">
          <input
            type="button"
            className={styles.btnstyle}
            value="비밀번호 찾기"
            onClick={goPasswdFindPage}
          />
        </div>

        <div style={{ marginBottom: "10%" }} />
      </div>
      <Link to="/">메인페이지 이동</Link>
    </div>
    );
}

export default IdFindEnd;
