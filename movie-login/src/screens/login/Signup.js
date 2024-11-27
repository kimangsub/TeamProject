import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 서버 요청 또는 로직 추가
    if (!formData.username) {
      setMessage("닉네임을 입력해주세요.");
    } else if (!formData.email) {
      setMessage("이메일을 입력해주세요.");
    } else if (!formData.password) {
      setMessage("비밀번호를 입력해주세요.");
    } else if (formData.password !== formData.confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
    } else {
      // 회원가입 정보를 localStorage에 저장
      const newUser = {
        username: formData.username,
        password: formData.password,
      };
      localStorage.setItem("user", JSON.stringify(newUser));

      alert("회원가입 완료");
      navigate("/LoginScreen");
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">닉네임</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="닉네임을 입력하세요"
          required
        />

        <label htmlFor="email">이메일(ID)</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="이메일을 입력하세요"
          required
        />

        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력하세요"
          required
        />

        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="비밀번호를 다시 입력하세요"
          required
        />

        <button type="submit">회원가입</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
