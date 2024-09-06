// user 인증 상태 관련 저장소

import { create } from 'zustand';

const useAuthStore = create(set => ({
    bears: 0, // 초기값
    increasePopulation: () => set((state: { bears: number; }) => ({ bears: state.bears + 1})), // bears 1씩 증가
    removeAllBears: () => set({ bears: 0}) // bears 리셋
}))

export default useAuthStore