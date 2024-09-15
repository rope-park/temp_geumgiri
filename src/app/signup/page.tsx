import React, { useState } from 'react';
import axios from 'axios'; // 서버와 통신하기 위함
import { useNavigate } from 'react-router-dom';
// layout.tsx 구성 완료되면 header, navbar, footer import하기
// style/gloabals.css 구성 완료되면 import하기 (or bootstrap 이용)

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/'; // 환경 변수에서 API URL 가져오기

const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false); // 로딩 상태 추가
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // 로딩 상태 시작

        // 유효성 검사
        if (!username || !email || !password || !confirmPassword) {
            setMessage('모든 필드를 입력해 주세요.');
            setLoading(false);
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setMessage('유효한 이메일을 입력해 주세요.');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setMessage('비밀번호는 6자리 이상이어야 합니다.');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setMessage('비밀번호가 일치하지 않습니다.');
            setLoading(false);
            return;
        }

        // 비밀번호 보안 강화 (선택 사항)
        const passwordStrengthRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // 최소 1개의 문자, 1개의 숫자 포함
        if (!passwordStrengthRegex.test(password)) {
            setMessage('비밀번호는 최소 1개의 문자와 1개의 숫자를 포함해야 합니다.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(API_URL + '/signup', {
                username,
                email,
                password
            });

            setMessage('회원가입이 완료되었습니다. 잠시 후 로그인 페이지로 이동합니다.');

            // 일정 시간 후 로그인 페이지로 리디렉션
            setTimeout(() => {
                navigate('../login');
            }, 2000);

        } catch (error) {
            // 서버에서 전달된 오류 메시지를 보여줍니다.
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 400) {
                    setMessage('이미 존재하는 이메일입니다.');
                } else if (error.response.status === 500) {
                    setMessage('서버 오류입니다. 다시 시도해 주세요.');
                } else {
                    setMessage('회원가입에 실패했습니다. 다시 시도해 주세요.');
                }
            } else {
                setMessage('회원가입 중 오류가 발생했습니다.');
            }
        } finally {
            setLoading(false); // 로딩 상태 종료
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
                {loading ? (
                    <p>회원가입 처리 중...</p>
                ) : (
                    <button type="submit">회원가입</button>
                )}
            </form>
        </div>
    );
};

export default Signup;
