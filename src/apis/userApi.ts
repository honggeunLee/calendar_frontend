import api from './api';
import {FriendRequestDTO, SignUpRequestDTO, UserDTO} from "../types/user.ts";

// 회원가입 요청
export const signUp = async (data: SignUpRequestDTO): Promise<UserDTO> => {
    const response = await api.post('/api/users/signup', data);
    return response.data;
};

// 친구 요청 보내기
export const sendFriendRequest = async (friendEmail: string): Promise<void> => {
    const response = await api.post('/api/users/friends/request', null, {
        params: { friendEmail },
    });
    return response.data;
};

// 친구 목록 가져오기
export const getFriends = async (): Promise<UserDTO[]> => {
    const response = await api.get('/api/users/friends');
    return response.data;
};

// 친구 요청 목록 가져오기 (friendshipId 포함)
export const getReceivedFriendRequests = async (): Promise<FriendRequestDTO[]> => {
    const response = await api.get('/api/users/friends/requests/received');
    return response.data;
};

// 친구 요청 수락
export const acceptFriendRequest = async (friendshipId: number): Promise<void> => {
    await api.post('/api/users/friends/accept', null, {
        params: { friendshipId },
    });
};

// 친구 요청 거절
export const rejectFriendRequest = async (friendshipId: number): Promise<void> => {
    await api.post('/api/users/friends/reject', null, {
        params: { friendshipId },
    });
};

// 친구 삭제
export const deleteFriend = async (friendEmail: string): Promise<void> => {
    const response = await api.delete('/api/users/friends', {
        params: { friendEmail },
    });
    return response.data;
};
