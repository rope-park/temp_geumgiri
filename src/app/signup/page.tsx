import React, { useState } from 'react';
// layout.tsx 구성 완료되면 header, navbar, footer import하기
// style/gloabals.css 구성 완료되면 import하기 (or bootstrap 이용)

import axios from 'axios'; // 서버와 통신하기 위함
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.NEXT_PUBLIC_API_URL; // 환경 변수에서 API URL 가져오기

const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        // 비밀번호 확인
        if (password !== confirmPassword) {
            setMessage('비밀번호와 일치하지 않습니다.');
            return;
        }

        try {
            const response = await axios.post(API_URL + 'signup', {
                username,
                email,
                password,
            });

            // 회원가입 성공 시 로그인 페이지로 리디렉션
            setMessage('회원가입이 완료되었습니다.')
            setTimeout(() => {
                navigate('../login');
            }, 2000);
        } catch (error) {
            setMessage('회원가입에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <div>
            <h2>회원가입</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSignup}>
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
                    <label>이메일</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <div>
                    <label>비밀번호 확인</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default Signup;