import React from 'react';
import Sidebar from './Sidebar';
import '../styles/dashboard.css';

const DashboardLayout = ({ children }) => {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <header className="top-header">
                    <div className="search-box">
                        <i className="fas fa-search" style={{color: '#94a3b8'}}></i>
                        <input type="text" placeholder="Tìm kiếm tài liệu, hợp đồng..." />
                    </div>
                    <div className="user-menu">
                        <div className="notification">
                            <i className="fas fa-bell" style={{fontSize: '20px', color: '#64748b'}}></i>
                            <span className="badge-dot"></span>
                        </div>
                        <div className="user-profile">
                            <div className="avatar">AD</div>
                            <span>Admin User</span>
                            <i className="fas fa-chevron-down" style={{fontSize: '12px', color: '#94a3b8'}}></i>
                        </div>
                    </div>
                </header>
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;

