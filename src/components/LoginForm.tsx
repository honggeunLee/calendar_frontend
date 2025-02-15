// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom'; // react-router-dom의 useNavigate 훅 사용
import { login } from "../apis/jwtApi.ts";

const LoginForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // useNavigate 훅 사용하여 페이지 이동

    const onFinish = async (values: { email: string; password: string }) => {
        setLoading(true);
        try {
            await login(values);
            notification.success({
                message: '로그인 성공!',
                description: '로그인에 성공했습니다.',
            });
            // 로그인 후 캘린더 페이지로 리디렉션
            navigate('/calendar');
        } catch (error) {
            notification.error({
                message: '로그인 실패',
                description: '로그인에 실패했습니다. 다시 시도해주세요.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            name="login"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            style={{ maxWidth: '400px', margin: '0 auto' }}
        >
            <Form.Item
                label="이메일"
                name="email"
                rules={[{ required: true, message: '이메일을 입력하세요!' }, { type: 'email', message: '유효한 이메일을 입력하세요!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="비밀번호"
                name="password"
                rules={[{ required: true, message: '비밀번호를 입력하세요!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading}>
                    로그인
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
