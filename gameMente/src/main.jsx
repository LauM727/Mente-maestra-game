import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app.jsx';
import './style.css';


const appContainer = document.getElementById('root');
const root = createRoot(appContainer);

root.render(
 <BrowserRouter>
 <App/>
 </BrowserRouter>

);

console.log(appContainer);