// 사용자 인증 상태 관리 및 업데이트

import { create } from 'zustand';

// AuthState 인터페이스 정의 및 상태 구조 설명
interface AuthState {
    user : { token: string; username: string } | null;
    setUser : (user: { token: string; username: string }) => void;
    clearUser: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user) => set({ user }), // 사용자 정보 저장 함수
    clearUser: () => set({ user: null }), // 사용자 정보 삭제 함수
    /*
    bears: 0, // 초기값
    increasePopulation: () => set((state: { bears: number; }) => ({ bears: state.bears + 1})), // bears 1씩 증가
    removeAllBears: () => set({ bears: 0}) // bears 리셋
    */
}));

export default useAuthStore