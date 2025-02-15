import React, { useEffect } from 'react';
import { Layout, Typography, notification, Button } from 'antd';
import CustomCalendar from '../components/Calendar';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

const CalendarPage: React.FC = () => {
    const navigate = useNavigate();

    // 로그인 상태 확인
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            // 토큰이 없으면 로그인 페이지로 리디렉션
            notification.error({
                message: '로그인 필요',
                description: '로그인이 필요합니다. 로그인 페이지로 이동합니다.',
            });
            navigate('/login');
        }
    }, [navigate]);

    // 일정 추가 버튼 클릭 시 일정 생성 페이지로 이동
    const goToCreateSchedule = () => {
        navigate('/create-schedule');
    };

    // 친구 관리 버튼 클릭 시 친구 관리 페이지로 이동
    const goToFriendsPage = () => {
        navigate('/friends');
    };

    return (
        <Layout>
            <Content style={{ padding: '50px', maxWidth: '800px', margin: 'auto' }}>
                <Title level={2} style={{ textAlign: 'center' }}>
                    캘린더
                </Title>

                {/* 버튼 컨테이너 */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                    <Button type="primary" onClick={goToCreateSchedule}>
                        일정 추가
                    </Button>
                    <Button type="default" onClick={goToFriendsPage}>
                        친구 관리
                    </Button>
                </div>

                <CustomCalendar />
            </Content>
        </Layout>
    );
};

export default CalendarPage;
