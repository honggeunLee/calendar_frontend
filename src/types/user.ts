// 사용자 DTO
export interface UserDTO {
    id: number;
    email: string;
    nickname: string;
}

// 회원가입 요청 DTO
export interface SignUpRequestDTO {
    email: string;
    password: string;
    nickname: string;
}

// 친구 요청 DTO
export interface FriendRequestDTO {
    friendshipId: number;
    userId: number;
    email: string;
    nickname: string;
}