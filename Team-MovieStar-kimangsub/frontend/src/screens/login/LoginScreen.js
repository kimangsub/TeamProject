import React, { useState, useContext } from "react"
import { AppContext } from "../../context/AppContext"
import { Link, useNavigate } from "react-router-dom"
import "../../css/login/LoginScreen.css"
import logo from "../../logo/logo.png"
import axios from "axios"

const LoginScreen = () => {
    const [formData, setFormData] = useState({ userName: "", userPwd: "" })
    const [error, setError] = useState("")
    const { setUser } = useContext(AppContext)
    const navigate = useNavigate()

  // const handleLogin = async () => {
  //   try {
  //       const response = await axios.post("/api/auth/login", {
  //           username,
  //           password,
  //       })
  //       alert(response.data.message)
  //   } catch (error) {
  //       alert("Login failed. Please check your credentials.")
  //   }
  // }

  // const handleSocialLogin = (provider) => {
  //   window.location.href = `/oauth2/authorization/${provider}`
  // }

  // 로고 클릭 시 메인화면 띄우기
  const handleLogoClick = () => {
    navigate("/home")
  }

  // 카카오 로그인
  const handleKakaoLogin = () => {
    const Rest_api_key = process.env.REACT_APP_KAKAO_LOGIN_API_KEY; // REST API KEY
    const REDIRECT_URI = 'http://localhost:9090/oauth'; // Redirect URI
    // oauth 요청 URL
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    // 카카오 로그인 페이지로 리다이렉션
    window.location.href = KAKAO_AUTH_URL;
  }

  // 네이버 로그인
  const handleNaverLogin = () => {
    const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_LOGIN_CLIENT_ID; // 클라이언트 ID
    const REDIRECT_URI = 'http://localhost:9090/oauth'; // Redirect URI
    const STATE = "false";
    // oauth 요청 URL
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;
    // 네이버 로그인 페이지로 리다이렉션
    window.location.href = NAVER_AUTH_URL;
  }

  // 구글 로그인
  const handleGoogleLogin = () => {
    const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID; // 클라이언트 ID
    const REDIRECT_URI = 'http://localhost:9090/oauth'; // Redirect URI
    const SCOPE = "email profile";
    // oauth 요청 URL
    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;
    // 구글 로그인 페이지로 리다이렉션
    window.location.href = GOOGLE_AUTH_URL
  }

  // 입력값 업데이트
  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
     e.preventDefault()

     try {
       const response = await axios.post("/user/signin", formData)
       const data = response.data;

       // 토큰 저장
       if(data.token) {
         localStorage.setItem("token", data.token)

         // 사용자 정보 Context에 저장
         setUser({
           userId: data.userId,
           userEmail: data.userEmail,
           userNick: data.userNick,
           userName: data.userName
         })

         // 로그인 성공 시 메인 화면으로 이동
         navigate("/home")
         } else {
         setError("Login failed: Cannot find token")
       }
     } catch (error) {
       console.error("error during login:", error)
       setError("아이디 또는 비밀번호가 일치하지 않습니다.")
     }

     // localStorage에서 유저 정보 가져오기
     const storedUser = JSON.parse(
       localStorage.getItem(
         Object.keys(window.localStorage).find(
         key => JSON.parse(localStorage.getItem(key)).userName === formData.userName
       )))

     // 유저 정보 확인
     if (
       storedUser && 
       storedUser.userPwd=== formData.userPwd
     ) {
       // 로그인 성공 시
       setUser({ 
         userName: storedUser.userName,
         userEmail: storedUser.userEmail,
         userNick: storedUser.userNick,
      userLikeList: storedUser.userLikeList,
       }) // 사용자 정보를 Context에 저장
       navigate("/home"); // MainScreen으로 이동
      } else {
      // 에러 메시지 출력
      setError("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div className="login-page">
      <header className="header">
        <img src={logo} className="header-logo" onClick={handleLogoClick} />
      </header>

      <div className="body">
        <div className="login-box">
          <h2>로그인</h2>
          {/* 로그인 폼 */}
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="userName">아이디</label>
              <input
                type="text"
                id="userName"
                placeholder="아이디를 입력하세요"
                value={formData.userName}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="userPwd">비밀번호</label>
              <input
                type="password"
                id="userPwd"
                placeholder="비밀번호를 입력하세요"
                value={formData.userPwd}
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
              <button className="social-button naver" onClick={handleNaverLogin}>네이버 로그인</button>
              <button className="social-button kakao" onClick={handleKakaoLogin}>카카오 로그인</button>
              <button className="social-button google" onClick={handleGoogleLogin}>구글 로그인</button>
            </div>
          </div>

          {/* 링크 섹션 */}
          <div className="links">
            <Link to="/find">아이디/비밀번호 찾기</Link>
            <Link to="/signup">회원가입</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;