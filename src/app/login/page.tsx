import React, { useState, useEffect } from 'react';
// layout.tsx 구성 완료되면 header, navbar, footer import하기
// style/gloabals.css 구성 완료되면 import하기 (or bootstrap 이용)
import useAuthStore from '@/store/authStore';
import { AxiosError } from 'axios'; // 서버와 통신하기 위함
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '@/utils/tokenUtils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'; // 환경 변수에서 API URL 가져오기

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // 로딩 상태 추가
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    // 로그인 상태 유지 및 토큰 검사
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            useAuthStore.getState().setUser(user); // Zustand에 사용자 상태 업데이트
        }

        const handleTokenExpiration = () => {
            const user = useAuthStore.getState().user;
            if (user && isTokenExpired(user.token)) {
                useAuthStore.getState().clearUser(); // 토큰 만료 시 상태 초기화
                navigate('/login'); // 로그아웃 후 로그인 페이지로 리디렉션
            }
        };

        // 토큰 만료 시 자동 로그아웃 처리
        handleTokenExpiration();
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // 로딩 시작

        // 유효성 검사
        if (!username || !password) {
            setMessage('아이디와 비밀번호를 모두 입력해 주세요.');
            setLoading(false); // 로딩 종료
            return;
        }
        
        try {
            const response = await axios.post(API_URL + 'login', { username, password });
            const { token } = response.data;
            useAuthStore.getState().setUser(response.data); // Zustand에 사용자 정보 저장

            // 로그인 성공 시 토큰 저장
            localStorage.setItem('authToken', token);
            // 로그인 성공 시 대시보드로 리디렉션
            navigate('/myPage/dashboard');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // AxiosError일 때만 처리
                if (error.response && error.response.status === 401) {
                    setMessage('잘못된 비밀번호입니다.');
                } else if (error.response && error.response.status === 404) {
                    setMessage('존재하지 않는 사용자입니다.');
                } else {
                    setMessage('로그인 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
                }
            } else {
                // AxiosError가 아닌 경우 처리
                setMessage('예상치 못한 오류가 발생했습니다.');
            }
        } finally {
            setLoading(false); // 로딩 종료
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
                {loading ? (
                    <p>로딩 중...</p>
                ) : (
                    <button type="submit">로그인</button>
                )}
            </form>
        </div>
    );
};

export default Login;
