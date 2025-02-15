import React from 'react';
import { Layout, Typography, Card } from 'antd';
import SendFriendRequest from '../components/SendFriendRequest'; // 친구 요청 보내기 컴포넌트
import FriendRequests from '../components/FriendRequests'; // 친구 요청 리스트 컴포넌트
import FriendsList from '../components/FriendsList';
import BackToCalendarButton from "../components/BackToCalendarButton.tsx"; // 친구 목록 컴포넌트

const { Content } = Layout;
const { Title } = Typography;

const FriendsPage: React.FC = () => {

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: 'white' }}>
            <Content style={{
                padding: '50px',
                maxWidth: '800px',
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{
                    backgroundColor: 'white',
                    padding: '40px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                }}>
                    <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
                        친구 관리
                    </Title>

                    <BackToCalendarButton />
                    
                    {/* 친구 요청 보내기 컴포넌트 */}
                    <Card title="친구 요청 보내기" style={{ marginBottom: '20px' }}>
                        <SendFriendRequest />
                    </Card>

                    {/* 받은 친구 요청 목록 컴포넌트 */}
                    <Card title="받은 친구 요청" style={{ marginBottom: '20px' }}>
                        <FriendRequests />
                    </Card>

                    {/* 친구 목록 컴포넌트 */}
                    <Card title="친구 목록" style={{ marginBottom: '20px' }}>
                        <FriendsList />
                    </Card>
                </div>
            </Content>
        </Layout>
    );
};

export default FriendsPage;
