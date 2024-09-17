import authHeader from "@/src/app/lib/auth-header";
import { beforeEach, describe, test, expect } from '@jest/globals';

describe('authHeader', () => {
    beforeEach(() => {
        localStorage.clear(); // 각 테스트 전에 localStorage를 초기화
    });

    test('토큰이 없을 때 Authorization 헤더가 빈 문자열이어야 한다', () => {
        const result = authHeader();
        expect(result).toEqual({ Authorization: '' });
    });

    test('유효한 토큰이 있을 때 Authorization 헤더에 Bearer 토큰이 포함되어야 한다', () => {
        const mockUser = { accessToken: 'mockAccessToken' };
        localStorage.setItem('user', JSON.stringify(mockUser));

        const result = authHeader();
        expect(result).toEqual({ Authorization: 'Bearer mockAccessToken' });
    });

    test('잘못된 JSON 형식일 때 Authorization 헤더가 빈 문자열이어야 한다', () => {
        localStorage.setItem('user', 'invalidJson');

        const result = authHeader();
        expect(result).toEqual({ Authorization: '' });
    });
});
