import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/dashboard.css';

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <i className="fa-solid fa-cube" style={{color: '#3b82f6', marginRight: '10px'}}></i> AI DocOps
            </div>
            <div className="sidebar-menu">
                <div className="menu-label">Tổng quan</div>
                <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
                    <i className="fas fa-home"></i> Dashboard
                </Link>

                <div className="menu-label" style={{marginTop: '20px'}}>AI Agents</div>
                <Link to="/documents" className={isActive('/documents') ? 'active' : ''}>
                    <i className="fas fa-folder-open"></i> Kho tài liệu
                </Link>
                <Link to="/esignature" className={isActive('/esignature') ? 'active' : ''}>
                    <i className="fas fa-file-signature"></i> Chữ ký số
                </Link>
                <Link to="/audit" className={isActive('/audit') ? 'active' : ''}>
                    <i className="fas fa-shield-alt"></i> Audit Logs
                </Link>
                <Link to="/storage" className={isActive('/storage') ? 'active' : ''}>
                    <i className="fas fa-database"></i> Lưu trữ
                </Link>

                <div className="menu-label" style={{marginTop: '20px'}}>Hệ thống</div>
                <Link to="/settings" className={isActive('/settings') ? 'active' : ''}>
                    <i className="fas fa-cog"></i> Cài đặt
                </Link>
                <Link to="/">
                    <i className="fas fa-sign-out-alt"></i> Đăng xuất
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
