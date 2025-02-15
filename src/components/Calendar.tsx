import React, { useEffect, useState } from 'react';
import { Calendar as AntCalendar, Badge, Modal, Button } from 'antd';
import { getSchedulesByUserEmail } from '../apis/scheduleApi.ts';
import { ScheduleDTO } from "../types/schedule.ts";
import { useNavigate } from 'react-router-dom'; // navigate 추가

const CustomCalendar: React.FC = () => {
    const [events, setEvents] = useState<ScheduleDTO[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<ScheduleDTO | null>(null); // 클릭한 일정 정보
    const [isModalVisible, setIsModalVisible] = useState(false); // 모달 표시 여부
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅

    useEffect(() => {
        // 사용자 일정을 가져와서 캘린더 이벤트로 변환
        const fetchSchedules = async () => {
            try {
                const schedules = await getSchedulesByUserEmail();
                setEvents(schedules); // 일정을 그대로 저장 (ScheduleDTO 타입 사용)
            } catch (error) {
                console.error("일정을 불러오는 데 실패했습니다.", error);
            }
        };

        fetchSchedules();
    }, []);

    // 일정 클릭 시 모달을 띄우는 함수
    const handleEventClick = (event: ScheduleDTO) => {
        setSelectedEvent(event); // 클릭한 일정 정보 저장
        setIsModalVisible(true); // 모달 표시
    };

    // 모달을 닫는 함수
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // 일정 수정 페이지로 이동
    const handleEditClick = () => {
        if (selectedEvent) {
            // 일정 ID를 기반으로 수정 페이지로 이동
            navigate(`/edit-schedule/${selectedEvent.id}`);
        }
    };

    // 일정에 맞는 색상을 반환하는 함수
    const getBadgeColor = (event: ScheduleDTO) => {
        return event.isPublic ? 'success' : 'warning'; // 공개 여부에 따른 색상
    };

    // 해당 날짜에 표시할 일정을 필터링하는 함수
    const dateCellRender = (value: any) => {
        const dateString = value.format('YYYY-MM-DD');
        const eventOnThisDay = events.filter(event => {
            const eventStart = new Date(event.startTime);
            const eventEnd = new Date(event.endTime);
            const eventStartDate = eventStart.toISOString().split('T')[0];
            const eventEndDate = eventEnd.toISOString().split('T')[0];

            // 해당 날짜가 일정의 시작일과 끝일 사이에 있는지 확인
            return (
                (eventStartDate <= dateString && eventEndDate >= dateString)
            );
        });

        return (
            <div className="events" style={{ position: 'relative', height: '100%' }}>
                {eventOnThisDay.map((event, index) => {
                    return (
                        <div key={index} style={{ whiteSpace: 'nowrap' }} onClick={() => handleEventClick(event)}>
                            <Badge
                                status={getBadgeColor(event)} // 색상 설정
                                text={event.title}
                            />
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div style={{ height: '100%', minHeight: '100vh', backgroundColor: 'white', padding: '20px', borderRadius: '8px', overflow: 'hidden' }}>
            <AntCalendar
                cellRender={dateCellRender}
                style={{ backgroundColor: 'white' }}
            />

            {/* 모달을 이용한 일정 상세보기 */}
            {selectedEvent && (
                <Modal
                    title="일정 상세"
                    open={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                    width={500}
                >
                    <p><strong>제목:</strong> {selectedEvent.title}</p>
                    <p><strong>설명:</strong> {selectedEvent.description}</p>
                    <p><strong>시작 시간:</strong> {new Date(selectedEvent.startTime).toLocaleString()}</p>
                    <p><strong>끝 시간:</strong> {new Date(selectedEvent.endTime).toLocaleString()}</p>
                    <p><strong>공개 여부:</strong> {selectedEvent.isPublic ? '공개' : '비공개'}</p>

                    {/* 일정 수정 버튼 */}
                    <Button
                        type="primary"
                        onClick={handleEditClick}
                        style={{ marginTop: 20 }}
                    >
                        일정 수정하기
                    </Button>
                </Modal>
            )}
        </div>
    );
};

export default CustomCalendar;
