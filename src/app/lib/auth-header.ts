// 인증 관련 헤더 설정하여 API 요청 시 필요한 토큰 포함하는 데 사용

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // 사용자 정보 가져오기

    if (user && user.accessToken) {
        // 사용자 정보와 액세스 토큰이 존재하면 Authorization 헤더 반환
        return { Authorization: 'Bearer ' + user.accessToken }; // Authorization 헤더 설정
    } else {
        // 사용자 정보가 존재하지 않으면 빈 객체 반환
        return {};
    }
};

export default authHeader;