import api from './api';
import {ScheduleDTO} from "../types/schedule.ts";

// 일정 생성
export const createSchedule = async (data: ScheduleDTO): Promise<ScheduleDTO> => {
    const response = await api.post('/api/schedules', data);
    return response.data;
};

// 특정 일정 조회
export const getScheduleById = async (id: number): Promise<ScheduleDTO> => {
    const response = await api.get(`/api/schedules/${id}`);
    return response.data;
};

// 일정 수정
export const updateSchedule = async (id: number, data: ScheduleDTO): Promise<ScheduleDTO> => {
    const response = await api.put(`/api/schedules/${id}`, data);
    return response.data;
};

// 일정 삭제
export const deleteSchedule = async (id: number): Promise<void> => {
    const response = await api.delete(`/api/schedules/${id}`);
    return response.data;
};

// 사용자의 모든 일정 조회
export const getSchedulesByUserEmail = async (): Promise<ScheduleDTO[]> => {
    const response = await api.get('/api/schedules/user');
    return response.data;
};

// 친구의 일정 조회
export const getFriendSchedules = async (friendEmail: string): Promise<ScheduleDTO[]> => {
    const response = await api.get('/api/schedules/friend-schedules', {
        params: { friendEmail },
    });
    return response.data;
};
