import React, { useEffect, useState } from 'react';
import { UserDTO } from "../types/user";
import { List, Button, message } from 'antd';
import { deleteFriend, getFriends } from "../apis/userApi.ts";
import { useNavigate } from 'react-router-dom'; // navigate 훅 추가

const FriendsList: React.FC = () => {
    const [friends, setFriends] = useState<UserDTO[]>([]);
    const navigate = useNavigate(); // navigate 훅 사용

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const data = await getFriends();
                setFriends(data);
            } catch (error) {
                message.error('친구 목록을 불러오는 데 실패했습니다.');
            }
        };
        fetchFriends();
    }, []);

    const handleDeleteFriend = async (friendEmail: string) => {
        try {
            await deleteFriend(friendEmail); // 친구 삭제 API 호출
            message.success('친구를 삭제했습니다.');
            setFriends(friends.filter(friend => friend.email !== friendEmail)); // 삭제한 친구 목록에서 제거
        } catch (error) {
            message.error('친구 삭제에 실패했습니다.');
        }
    };

    // 친구 클릭 시 친구 일정 캘린더 페이지로 이동
    const handleViewFriendCalendar = (friendEmail: string) => {
        navigate(`/friend-calendar/${friendEmail}`); // 친구의 일정 캘린더 페이지로 이동
    };

    return (
        <div>
            <h3>친구 목록</h3>
            <List
                bordered
                dataSource={friends}
                renderItem={(user) => (
                    <List.Item
                        actions={[
                            <Button onClick={() => handleDeleteFriend(user.email)}>삭제</Button>
                        ]}
                    >
                        <List.Item.Meta
                            title={<a onClick={() => handleViewFriendCalendar(user.email)}>{user.nickname}</a>} // 친구 클릭 시 캘린더로 이동
                            description={user.email}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default FriendsList;
