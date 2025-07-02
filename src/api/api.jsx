import axios from "axios";
import { isBusinessError } from '../util/handleHttpError';

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
            data: body,
            headers: {
                'Content-Type': 'application/json' // 요청 헤더에 Content-Type 설정
            }
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



// react interceptors 요청
api.interceptors.request.use((config) => {
  // HttpOnly 쿠키는 자동으로 헤더에 포함되므로, 별도로 추가할 필요 없음
  // config 는 위에서 create 해서 만든 설정 정보인데 이걸 보내는 이유는 쿠키를 보내기 위함
  return config;
});


// react interceptors 응답
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const errorCode = error.response?.data?.code;

    // 🔒 토큰 재발급 요청 자체가 실패한 경우 → 로그인 페이지로 이동
    if (originalRequest.url === '/api/token-refresh') {
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // 🔑 로그인 요청 자체는 그대로 컴포넌트에 넘김
    if (originalRequest.url === '/api/user/login') {
      return Promise.reject(error);
    }

    // 🔄 accessToken 만료 → refresh 토큰으로 재발급 시도
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post('/api/token-refresh'); // refreshToken은 쿠키에서 자동 전송
        return api(originalRequest); // 원래 요청 재시도
      } catch (refreshError) {
        console.error('🔁 토큰 재발급 실패:', refreshError);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // ⛔ 403 권한 문제 → 비즈니스 에러면 넘기고, 아닌 경우만 메인으로 이동
    if (status === 403) {
      if (isBusinessError(errorCode)) {
        return Promise.reject(error); // 컴포넌트에서 메시지 표시하도록 넘김
      }

      alert('권한이 없습니다. 메인 페이지로 이동합니다.');
      window.location.href = '/';
      return Promise.reject(error);
    }

    // 💥 그 외 에러는 기본 처리
    return Promise.reject(error);
  }
);






