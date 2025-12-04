import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Navigate to dashboard after login
        navigate('/dashboard');
    };

    return (
        <div className="auth-container">
            <div className="auth-side-image">
                <div className="auth-quote">
                    <h2>"AI DocOps đã giúp chúng tôi giảm 80% thời gian xử lý giấy tờ hành chính."</h2>
                    <p>— Minh Tuấn, CTO tại TechCorp</p>
                    <div style={{marginTop: '20px', display: 'flex', gap: '5px', color: '#fbbf24'}}>
                        <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                    </div>
                </div>
            </div>

            <div className="auth-form-container">
                <div className="auth-box">
                    <Link to="/" className="logo"><i className="fa-solid fa-cube"></i> AI DocOps</Link>
                    <h1 className="auth-title">Chào mừng trở lại</h1>
                    <p className="auth-subtitle">Vui lòng nhập thông tin để truy cập Dashboard.</p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-input" placeholder="name@company.com" required />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Mật khẩu</label>
                            <input type="password" className="form-input" placeholder="••••••••" required />
                        </div>

                        <div className="form-group check-group">
                            <label className="checkbox">
                                <input type="checkbox" /> Ghi nhớ tôi
                            </label>
                            <a href="#" style={{fontSize: '13px'}}>Quên mật khẩu?</a>
                        </div>

                        <button type="submit" className="btn-auth">Đăng nhập</button>
                    </form>

                    <div className="divider"><span>Hoặc tiếp tục với</span></div>

                    <div className="social-login">
                        <button className="btn-social"><i className="fab fa-google" style={{color: '#DB4437'}}></i> Google</button>
                        <button className="btn-social"><i className="fab fa-microsoft" style={{color: '#00A4EF'}}></i> Microsoft</button>
                    </div>

                    <div className="form-footer">
                        Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

