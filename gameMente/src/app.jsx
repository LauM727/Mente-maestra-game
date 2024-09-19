import React from 'react'
import { useLocation } from 'react-router-dom';
import { AppRouter } from './router/appRouter';

function App() {
    const location = useLocation();
    console.log(location);
    return (
        <AppRouter/>
    );
}

export default App;