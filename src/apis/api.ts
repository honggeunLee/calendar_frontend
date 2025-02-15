import axios from 'axios';

// 기본 API 인스턴스 설정
const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터: 로컬스토리지에서 JWT 토큰을 가져와 헤더에 추가
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken'); // 로컬스토리지에서 토큰 가져오기
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // JWT 토큰을 Authorization 헤더에 추가
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
