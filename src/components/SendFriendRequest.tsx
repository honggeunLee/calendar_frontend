import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import {sendFriendRequest} from "../apis/userApi.ts";

const SendFriendRequest: React.FC = () => {
    const [friendEmail, setFriendEmail] = useState<string>('');

    const handleSendRequest = async () => {
        if (!friendEmail) {
            message.error('이메일을 입력해주세요!');
            return;
        }

        try {
            await sendFriendRequest(friendEmail); // 친구 요청 보내기 API 호출
            message.success('친구 요청이 성공적으로 보내졌습니다.');
            setFriendEmail(''); // 입력 필드 초기화
        } catch (error) {
            message.error('친구 요청 보내기에 실패했습니다.');
        }
    };

    return (
        <div>
            <h3>친구 요청 보내기</h3>
            <Input
                placeholder="친구 이메일을 입력하세요"
                value={friendEmail}
                onChange={(e) => setFriendEmail(e.target.value)}
                style={{ marginBottom: '10px' }}
            />
            <Button type="primary" onClick={handleSendRequest} block>
                친구 요청 보내기
            </Button>
        </div>
    );
};

export default SendFriendRequest;
