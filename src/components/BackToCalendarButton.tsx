import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const BackToCalendarButton: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/calendar');
    };

    return (
        <Button onClick={handleClick} style={{ marginTop: 20 }} block>
            🔙 캘린더로 돌아가기
        </Button>
    );
};

export default BackToCalendarButton;
