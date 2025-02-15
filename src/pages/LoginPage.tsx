import React from 'react';
import { Layout, Typography, Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import LoginForm from "../components/LoginForm.tsx";

const { Content } = Layout;
const { Title } = Typography;

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    // 회원가입 페이지로 이동
    const goToSignUpPage = () => {
        navigate('/signup');
    };

    return (
        <Layout>
            <Content style={{ padding: '50px', maxWidth: '500px', margin: 'auto' }}>
                <Title level={2} style={{ textAlign: 'center' }}>
                    로그인
                </Title>
                <LoginForm />
                <Row justify="center" style={{ marginTop: '10px' }}>
                    <Col>
                        <Button type="link" onClick={goToSignUpPage}>
                            회원가입
                        </Button>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default LoginPage;
