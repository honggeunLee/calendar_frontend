import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { SignUpRequestDTO } from "../types/user.ts";
import { signUp } from "../apis/userApi.ts";

interface SignUpProps {
    onSuccess: () => void; // 회원가입 성공 시 호출되는 콜백 함수
}

const SignUp: React.FC<SignUpProps> = ({ onSuccess }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: SignUpRequestDTO) => {
        setLoading(true);
        try {
            await signUp(values); // 회원가입 API 호출
            message.success('회원가입이 성공적으로 완료되었습니다!');
            onSuccess(); // 회원가입 성공 후 로그인 페이지로 이동
        } catch (error) {
            message.error('회원가입에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: '20px' }}>
            <h2>회원가입</h2>
            <Form
                name="signup"
                onFinish={handleSubmit}
                initialValues={{ email: '', password: '', nickname: '' }}
            >
                <Form.Item
                    name="email"
                    label="이메일"
                    rules={[{ required: true, message: '이메일을 입력하세요.' }, { type: 'email', message: '유효한 이메일 주소를 입력하세요.' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="nickname"
                    label="닉네임"
                    rules={[{ required: true, message: '닉네임을 입력하세요.' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="비밀번호"
                    rules={[{ required: true, message: '비밀번호를 입력하세요.' }]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        회원가입
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignUp;
