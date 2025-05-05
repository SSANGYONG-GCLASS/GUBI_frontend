import axios from "axios";

// 백엔드 서버 URL
export const VITE_SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

export const api = axios.create({
    baseURL: VITE_SERVER_HOST,
    withCredentials: true,      // 쿠키 전송
    headers: {
        "Cache-Control": "no-cache",
        "X-Requested-With": "XMLHttpRequest"    // 서버에 AJAX 통신 요청이라는 것을 서버에 인식시켜주기 위한 헤더 설정
    }
});


// http요청 axios 버전
export const httpRequest_axios = async (url, method, body, success, fail) => {
    try {
        const config = {
            method,
            url,
            data: body
        };

        const response = await api(config);
        success(response.data);

    } catch (error) {
        fail(error.response?.data || error);    // response.data 가 없으면 error 를 콜백
    }
};


// http 요청 함수
export const httpRequest = async (url, method, body, success, fail) => await fetch(url, {
    method: method,
    credentials: 'include',
    headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "X-Requested-With": "XMLHttpRequest"    // 서버에 AJAX 통신 요청이라는 것을 서버에 인식시켜주기 위한 헤더 설정
    },
    body: body
})
.then(response => {
    if (response.status === 200 || response.status === 201) {
        return response.json();
    }
    else {
        throw new Error(`요청실패: ${response.status}`);
    }
})
.then(data => {
    success(data);
})
.catch(error => fail(error));