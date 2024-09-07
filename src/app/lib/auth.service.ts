// 로그인/로그아웃/회원가입 등 사용자 정보 관리

import axios from 'axios';
import useAuthStore from '@/store/authStore'; 

const API_URL = process.env.NEXT_PUBLIC_API_URL; // 백엔드 API URL 

// signup 함수
export const signup = async (username: string, email: string, password: string) => {
    try {
        const response = await axios.post('${API_URL}signin', { username, email, password });
        return response.data; // 회원가입 결과 반환
    } catch (error) { // 회원가입 실패할 경우
        console.error('회원가입에 실패하였습니다:', error);
        throw error;
    }
};

// login 함수
export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post('${API_URL}login', { username, password });
        const user = response.data; 

        // Zustland 스토어(/store/authStore.ts)에 사용자 정보 저장
        useAuthStore.getState().setUser(user);

        return user;
    } catch (error) { // 로그인 실패할 경우
        console.error('로그인에 실패하였습니다:', error);
        throw error;
    }
};

// logout 함수
export const logout = () => {
    // Zustland 스토어에서 사용자 정보 삭제
    useAuthStore.getState().clearUser();
};

// 사용자 정보 가져오기 함수
export const getCurrentUser = () => {
    return useAuthStore.getState().user;
};
