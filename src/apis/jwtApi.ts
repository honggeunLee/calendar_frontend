import api from './api';

// 로그인 요청 (JWT 토큰을 반환)
export const login = async (data: { email: string, password: string }) => {
    const response = await api.post('/api/users/login', data);
    const { accessToken } = response.data; // JWT 토큰 추출
    localStorage.setItem('accessToken', accessToken); // 토큰을 로컬스토리지에 저장
    return response.data;
};

// 로그아웃 요청 (JWT 토큰 삭제)
export const logout = () => {
    localStorage.removeItem('accessToken'); // 로컬스토리지에서 토큰 제거
};
