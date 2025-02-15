import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Modal, Select, Card, Typography } from 'antd';
import { ScheduleDTO } from "../types/schedule.ts";
import { deleteSchedule, getScheduleById, updateSchedule } from '../apis/scheduleApi.ts';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import BackToCalendarButton from "./BackToCalendarButton.tsx";

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const EditSchedule: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [schedule, setSchedule] = useState<ScheduleDTO | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchSchedule = async () => {
                try {
                    const fetchedSchedule = await getScheduleById(parseInt(id));
                    setSchedule(fetchedSchedule);
                    form.setFieldsValue({
                        title: fetchedSchedule.title,
                        description: fetchedSchedule.description,
                        startTime: dayjs(fetchedSchedule.startTime),
                        endTime: dayjs(fetchedSchedule.endTime),
                        isPublic: fetchedSchedule.isPublic,
                    });
                } catch (error) {
                    console.error("일정 정보를 불러오는 데 실패했습니다.", error);
                }
            };
            fetchSchedule();
        }
    }, [id]);

    const handleEditSchedule = async (values: any) => {
        if (!id) return;
        setLoading(true);
        try {
            const updatedSchedule: ScheduleDTO = {
                ...schedule!,
                title: values.title,
                description: values.description,
                startTime: dayjs(values.startTime).format("YYYY-MM-DDTHH:mm:ss"),
                endTime: dayjs(values.endTime).format("YYYY-MM-DDTHH:mm:ss"),
                isPublic: values.isPublic,
            };

            await updateSchedule(parseInt(id), updatedSchedule);
            setIsModalVisible(true);
            form.resetFields();

            setTimeout(() => {
                navigate('/calendar'); // 일정 수정 후 캘린더 페이지로 이동
            }, 1500);
        } catch (error) {
            console.error("일정 수정에 실패했습니다.", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSchedule = async () => {
        if (!id) return;
        try {
            await deleteSchedule(parseInt(id));
            navigate('/calendar'); // 일정 삭제 후 캘린더 페이지로 이동
        } catch (error) {
            console.error("일정 삭제에 실패했습니다.", error);
        }
    };

    const showDeleteConfirm = () => {
        setIsDeleteModalVisible(true);
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    if (!schedule) {
        return <div>일정을 불러오는 중입니다...</div>;
    }

    return (
        <div style={{ maxWidth: 500, margin: '40px auto', padding: '20px' }}>
            <Card variant="borderless" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: 10 }}>
                <Title level={3} style={{ textAlign: 'center', marginBottom: 20 }}>
                    ✏️ 일정 수정
                </Title>
                <BackToCalendarButton />
                <Form form={form} onFinish={handleEditSchedule} layout="vertical">
                    <Form.Item name="title" label="제목" rules={[{ required: true, message: '제목을 입력하세요!' }]}>
                        <Input placeholder="일정 제목을 입력하세요" />
                    </Form.Item>

                    <Form.Item name="description" label="설명" rules={[{ required: true, message: '설명을 입력하세요!' }]}>
                        <TextArea rows={3} placeholder="일정 설명을 입력하세요" />
                    </Form.Item>

                    <Form.Item name="startTime" label="시작 시간" rules={[{ required: true, message: '시작 시간을 선택하세요!' }]}>
                        <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item name="endTime" label="끝 시간" rules={[{ required: true, message: '끝 시간을 선택하세요!' }]}>
                        <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item name="isPublic" label="공개 여부" rules={[{ required: true, message: '공개 여부를 선택하세요!' }]}>
                        <Select placeholder="공개 여부 선택">
                            <Option value={true}>공개</Option>
                            <Option value={false}>비공개</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            일정 수정
                        </Button>
                    </Form.Item>

                    {/* 삭제 버튼 */}
                    <Form.Item>
                        <Button danger onClick={showDeleteConfirm} block>
                            일정 삭제
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            <Modal title="✅ 일정 수정 완료" open={isModalVisible} onCancel={handleCancel} footer={null}>
                <p>일정이 성공적으로 수정되었습니다!</p>
                <Button type="primary" onClick={handleCancel} block>
                    닫기
                </Button>
            </Modal>

            {/* 삭제 확인 모달 */}
            <Modal
                title="정말로 이 일정을 삭제하시겠습니까?"
                open={isDeleteModalVisible}
                onOk={handleDeleteSchedule}
                onCancel={handleDeleteCancel}
                okText="삭제"
                cancelText="취소"
                confirmLoading={loading}
            >
                <p>이 작업은 되돌릴 수 없습니다.</p>
            </Modal>
        </div>
    );
};

export default EditSchedule;
