import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUpPage from '../pages/SignUpPage';
import LoginPage from "../pages/LoginPage.tsx";
import CalendarPage from "../pages/CalendarPage.tsx";
import CreateSchedulePage from "../pages/CreateSchedulePage.tsx";
import EditSchedulePage from "../pages/EditSchedulePage.tsx";
import FriendsPage from "../pages/FriendsPage.tsx";
import FriendCalendar from "../components/FriendCalendar.tsx";

const RoutesConfig: React.FC = () => (
    <Routes>
        <Route path="/signup" element={<SignUpPage />} />  {/* 회원가입 페이지 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/create-schedule" element={<CreateSchedulePage />} />
        <Route path="/edit-schedule/:id" element={<EditSchedulePage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/friend-calendar/:friendEmail" element={<FriendCalendar />} />
    </Routes>
);

export default RoutesConfig;
