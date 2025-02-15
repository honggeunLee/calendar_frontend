import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // URL 파라미터와 네비게이션을 사용하기 위해 import
import { Calendar as AntCalendar, Badge, Modal, Button } from 'antd';
import { getFriendSchedules } from '../apis/scheduleApi';
import { ScheduleDTO } from "../types/schedule.ts"; // 친구 일정을 가져오는 API

const FriendCalendar: React.FC = () => {
    const { friendEmail } = useParams<{ friendEmail: string }>(); // 친구 이메일을 URL 파라미터로 받기
    const [friendEvents, setFriendEvents] = useState<ScheduleDTO[]>([]); // 친구 일정을 저장할 상태
    const [selectedEvent, setSelectedEvent] = useState<ScheduleDTO | null>(null); // 클릭한 일정 정보
    const [isModalVisible, setIsModalVisible] = useState(false); // 모달 표시 여부
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅

    useEffect(() => {
        // friendEmail이 정의되어 있을 때만 친구의 일정을 가져오는 API 호출
        if (friendEmail) {
            const fetchFriendSchedules = async () => {
                try {
                    const schedules = await getFriendSchedules(friendEmail); // 친구 이메일로 일정 가져오기
                    setFriendEvents(schedules); // 친구 일정 저장
                } catch (error) {
                    console.error("친구의 일정을 불러오는 데 실패했습니다.", error);
                }
            };

            fetchFriendSchedules();
        } else {
            console.error("친구 이메일이 제공되지 않았습니다.");
        }
    }, [friendEmail]); // friendEmail이 바뀔 때마다 새로운 친구의 일정을 가져옴

    // 일정 클릭 시 모달을 띄우는 함수
    const handleEventClick = (event: ScheduleDTO) => {
        setSelectedEvent(event); // 클릭한 일정 정보 저장
        setIsModalVisible(true); // 모달 표시
    };

    // 모달을 닫는 함수
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // 일정에 맞는 색상을 반환하는 함수
    const getBadgeColor = (event: ScheduleDTO) => {
        return event.isPublic ? 'success' : 'warning'; // 공개 여부에 따른 색상
    };

    // 해당 날짜에 표시할 일정을 필터링하는 함수
    const dateCellRender = (value: any) => {
        const dateString = value.format('YYYY-MM-DD');
        const eventOnThisDay = friendEvents.filter(event => {
            const eventStart = new Date(event.startTime);
            const eventEnd = new Date(event.endTime);
            const eventStartDate = eventStart.toISOString().split('T')[0];
            const eventEndDate = eventEnd.toISOString().split('T')[0];

            return eventStartDate <= dateString && eventEndDate >= dateString;
        });

        return (
            <div className="events" style={{ position: 'relative', height: '100%' }}>
                {eventOnThisDay.map((event, index) => (
                    <div key={index} style={{ whiteSpace: 'nowrap' }} onClick={() => handleEventClick(event)}>
                        <Badge status={getBadgeColor(event)} text={event.title} />
                    </div>
                ))}
            </div>
        );
    };

    // 친구 관리 페이지로 돌아가는 함수
    const handleBackToFriendsList = () => {
        navigate('/friends'); // 친구 목록 페이지로 이동
    };

    return (
        <div style={{ height: '100%', minHeight: '100vh', backgroundColor: 'white', padding: '20px', borderRadius: '8px', overflow: 'hidden' }}>
            {/* 친구 목록 페이지로 돌아가는 버튼 추가 */}
            <Button
                type="primary"
                onClick={handleBackToFriendsList}
                style={{ marginTop: 20 }}
            >
                친구 목록으로 돌아가기
            </Button>
            <AntCalendar
                cellRender={dateCellRender}
                style={{ backgroundColor: 'white' }}
            />

            {/* 일정 상세보기 모달 */}
            {selectedEvent && (
                <Modal title="일정 상세" open={isModalVisible} onCancel={handleCancel} footer={null} width={500}>
                    <p><strong>제목:</strong> {selectedEvent.title}</p>
                    <p><strong>설명:</strong> {selectedEvent.description}</p>
                    <p><strong>시작 시간:</strong> {new Date(selectedEvent.startTime).toLocaleString()}</p>
                    <p><strong>끝 시간:</strong> {new Date(selectedEvent.endTime).toLocaleString()}</p>
                    <p><strong>공개 여부:</strong> {selectedEvent.isPublic ? '공개' : '비공개'}</p>
                </Modal>
            )}
        </div>
    );
};

export default FriendCalendar;
