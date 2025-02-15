import React, { useEffect, useState } from 'react';
import { List, Button, message } from 'antd';
import { FriendRequestDTO } from "../types/user";
import { acceptFriendRequest, getReceivedFriendRequests, rejectFriendRequest } from "../apis/userApi.ts";

const FriendRequests: React.FC = () => {
    const [requests, setRequests] = useState<FriendRequestDTO[]>([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const data = await getReceivedFriendRequests();
                setRequests(data);
            } catch (error) {
                message.error('친구 요청을 불러오는 데 실패했습니다.');
            }
        };
        fetchRequests();
    }, []);

    const handleAcceptRequest = async (friendshipId: number) => {
        try {
            await acceptFriendRequest(friendshipId);
            message.success('친구 요청을 수락했습니다.');
            setRequests(requests.filter(request => request.friendshipId !== friendshipId));
        } catch (error) {
            message.error('친구 요청 수락에 실패했습니다.');
        }
    };

    const handleRejectRequest = async (friendshipId: number) => {
        try {
            await rejectFriendRequest(friendshipId);
            message.success('친구 요청을 거절했습니다.');
            setRequests(requests.filter(request => request.friendshipId !== friendshipId));
        } catch (error) {
            message.error('친구 요청 거절에 실패했습니다.');
        }
    };

    return (
        <div>
            <h3>받은 친구 요청</h3>
            <List
                bordered
                dataSource={requests}
                renderItem={(request) => (
                    <List.Item
                        actions={[
                            <Button type="primary" onClick={() => handleAcceptRequest(request.friendshipId)}>수락</Button>,
                            <Button type="default" onClick={() => handleRejectRequest(request.friendshipId)}>거절</Button>
                        ]}
                    >
                        <List.Item.Meta title={request.nickname} description={request.email} />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default FriendRequests;
