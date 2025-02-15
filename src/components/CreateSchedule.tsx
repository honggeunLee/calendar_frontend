import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Modal, Select, Card, Typography } from 'antd';
import { ScheduleDTO } from "../types/schedule.ts";
import { createSchedule } from '../apis/scheduleApi.ts';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import BackToCalendarButton from "./BackToCalendarButton.tsx";

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const CreateSchedule: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    const handleCreateSchedule = async (values: any) => {
        setLoading(true);
        try {
            const newSchedule: ScheduleDTO = {
                title: values.title,
                description: values.description,
                startTime: dayjs(values.startTime).format("YYYY-MM-DDTHH:mm:ss"),
                endTime: dayjs(values.endTime).format("YYYY-MM-DDTHH:mm:ss"),
                isPublic: values.isPublic,
                id: 0,
            };

            await createSchedule(newSchedule);
            setIsModalVisible(true);
            form.resetFields();

            setTimeout(() => {
                navigate('/calendar'); // 일정 생성 후 캘린더 페이지로 이동
            }, 1500);
        } catch (error) {
            console.error('일정 생성에 실패했습니다.', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div style={{ maxWidth: 500, margin: '40px auto', padding: '20px' }}>
            <Card variant="borderless" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: 10 }}>
                <Title level={3} style={{ textAlign: 'center', marginBottom: 20 }}>
                    📅 일정 생성
                </Title>
                <BackToCalendarButton />
                <Form form={form} onFinish={handleCreateSchedule} layout="vertical">
                    {/* 일정 입력 폼 */}
                    <Form.Item name="title" label="제목" rules={[{ required: true, message: '제목을 입력하세요!' }]} style={{ marginBottom: 15 }}>
                        <Input placeholder="일정 제목을 입력하세요" />
                    </Form.Item>

                    <Form.Item name="description" label="설명" rules={[{ required: true, message: '설명을 입력하세요!' }]} style={{ marginBottom: 15 }}>
                        <TextArea rows={3} placeholder="일정 설명을 입력하세요" />
                    </Form.Item>

                    <Form.Item name="startTime" label="시작 시간" rules={[{ required: true, message: '시작 시간을 선택하세요!' }]} style={{ marginBottom: 15 }}>
                        <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item name="endTime" label="끝 시간" rules={[{ required: true, message: '끝 시간을 선택하세요!' }]} style={{ marginBottom: 15 }}>
                        <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item name="isPublic" label="공개 여부" rules={[{ required: true, message: '공개 여부를 선택하세요!' }]} style={{ marginBottom: 20 }}>
                        <Select placeholder="공개 여부 선택">
                            <Option value={true}>공개</Option>
                            <Option value={false}>비공개</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            일정 생성
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            <Modal title="✅ 일정 생성 완료" open={isModalVisible} onCancel={handleCancel} footer={null}>
                <p>일정이 성공적으로 생성되었습니다!</p>
                <Button type="primary" onClick={handleCancel} block>
                    닫기
                </Button>
            </Modal>
        </div>
    );
};

export default CreateSchedule;
