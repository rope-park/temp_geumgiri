// 사용자 관련 기능 처리하는 서비스 클래스 정의

import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class UserService {
    // 사용자 등록(회원가입)
    async signup(userData: { username:string; email:string; password:string}) {
        const response = await axios.post(API_URL + 'signup', userData);
        return response.data;
    }

    // 사용자 로그인
    async login(username:string, password:string) {
        const response = await axios.post(API_URL + 'login', { username, password });
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    }

    // 사용자 정보 조회
    async getUserProfile() {
        const response = await axios.get(API_URL + 'profile', { headers: authHeader() });
        return response.data;
    }

    // 사용자 정보 업데이트
    async updateUserProfile(updatedData:any) {
        const response = await axios.put(API_URL + 'profile', updatedData, { headers: authHeader() });
        return response.data;
    }

    // 사용자 삭제
    async deleteUser() {
        const response = await axios.delete(API_URL + 'delete', { headers: authHeader() });
        return response.data;
    }
};

export default new UserService();
