import React from 'react';
import { Layout, Typography } from 'antd';
import { useNavigate } from 'react-router-dom'; // useNavigate import
import SignUp from "../components/SignUp.tsx"; // SignUp 컴포넌트

const { Content } = Layout;
const { Title } = Typography;

const SignUpPage: React.FC = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    const onSignUpSuccess = () => {
        // 회원가입 성공 시 로그인 페이지로 이동
        navigate('/login');
    };

    return (
        <Layout>
            <Content style={{ padding: '50px', maxWidth: '500px', margin: 'auto' }}>
                <Title level={2} style={{ textAlign: 'center' }}>
                    회원가입
                </Title>
                <SignUp onSuccess={onSignUpSuccess} />
            </Content>
        </Layout>
    );
};

export default SignUpPage;
