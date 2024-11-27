import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/LoginScreen.css";

const LoginScreen = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 입력값 업데이트
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();

    // localStorage에서 유저 정보 가져오기
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // 유저 정보 확인
    if (storedUser && storedUser.username === formData.username && storedUser.password === formData.password) {
      // 로그인 성공 시 MainScreen으로 이동
      navigate("/");
    } else {
      // 에러 메시지 출력
      setError("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>로그인</h2>

        {/* 로그인 폼 */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              id="username"
              placeholder="아이디를 입력하세요"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>

        {/* 에러 메시지 */}
        {error && <p className="error-message">{error}</p>}

        {/* 소셜 로그인 섹션 */}
        <div className="social-login-section">
          <p className="social-login-title">소셜 로그인</p>
          <div className="social-login">
            <button className="social-button naver">네이버 로그인</button>
            <button className="social-button kakao">카카오 로그인</button>
            <button className="social-button google">구글 로그인</button>
          </div>
        </div>

        {/* 링크 섹션 */}
        <div className="links">
          <Link to="/find-id">아이디 찾기</Link>
          <Link to="/find-password">비밀번호 찾기</Link>
          <Link to="/signup">회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
