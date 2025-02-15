// 일정 DTO
export interface ScheduleDTO {
    id: number;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    isPublic: boolean;
}

// 일정 생성 요청 DTO
export interface CreateScheduleRequestDTO {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    isPublic: boolean;
}
