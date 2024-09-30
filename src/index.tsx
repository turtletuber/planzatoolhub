import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure Tailwind CSS is properly imported
import Dashboard from './components/Dashboard'; // Adjust the path if necessary

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Dashboard /> {/* Render the Dashboard component */}
    </React.StrictMode>
);
