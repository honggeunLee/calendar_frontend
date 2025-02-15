import React from 'react';
import RoutesConfig from './routes/Routes'; // Routes 컴포넌트 임포트

const App: React.FC = () => {
    return (
        <div className="App">
            <RoutesConfig /> {/* RoutesConfig로 라우팅 설정 */}
        </div>
    );
};

export default App;
