import React, { useState } from 'react';
// layout.tsx 구성 완료되면 header, navbar, footer import하기
// style/gloabals.css 구성 완료되면 import하기 (or bootstrap 이용)
import useAuthStore from '@/store/authStore';
import axios from 'axios'; // 서버와 통신하기 위함
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.NEXT_PUBLIC_API_URL; // 환경 변수에서 API URL 가져오기

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // 유효성 검사
        if (!username || !password) {
            setMessage('아이디와 비밀번호를 모두 입력해 주세요.');
            return;
        }
        
        try {
            const response = await axios.post(API_URL + 'login', { username, password });
            const { token } = response.data;
            useAuthStore.getState().setUser(response.data); // Zustand에 사용자 정보 저장

            // 로그인 성공 시 토큰 저장 // Zustand 이용 추가 및 수정
            localStorage.setItem('authToken', token);

            // 로그인 성공 시 대시보드로 리디렉션
            navigate('../myPage/dashboard');
        } catch (error) { // 아이디 또는 비밀번호 잘못 입력할 경우
            setMessage('아이디 또는 비밀번호가 일치하지 않습니다. 아이디와 비밀번호를 정확히 입력해 주세요.');
        }
    };

    return (
        <div>
            <h2>로그인</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>아이디</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>비밀번호</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">로그인</button>
            </form>
        </div>
    );
};

export default Login;