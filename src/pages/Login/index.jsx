import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";
import loginFetcher from "../../utils/reissueFetcher";
import { setCookie } from "../../utils/setCookie";

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #e7e7e7;
`;

const LoginForm = styled.form`
  background: #fff;
  padding: 30px;
  align-content: flex-end;
  width: 600px;
  height: 300px;
  border-bottom: 1px solid black;
  align-self: center;
`;

const InputContainer = styled.div`
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  & h1 {
    margin: 0;
  }

  button {
    width: 80px;
    margin-top: 10px;
    font-size: 18px;
    background-color: aquamarine;
  }
`;

const Input = styled.input`
  height: 50px;
  width: 100%;
  padding: 0 10px;
  margin: 5px 0;
`;

const Login = ({ rememberToken, handleLogin }) => {
  const [tryLogin, setTryLogin] = useState(false);
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const [loginData, setLoginData] = useState({ accessToken: "", refreshToken: "" });
  const { data: tokens } = useSWR(
    tryLogin ? "http://localhost:8080/api/v1/reissue" : null,
    (url) => loginFetcher(url),
    { dedupingInterval: 1000 * 60 * 30 }
  );
  const history = useHistory();
  const handleInputChange = useCallback(
    (e) => {
      setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    },
    [inputValue]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post("http://localhost:8080/api/v1/login", {
          email: inputValue.email,
          password: inputValue.password,
        })
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            setTryLogin(true);
            setCookie("accessToken", response.data.data.accessToken);
            setCookie("refreshToken", response.data.data.refreshToken);
            setLoginData({
              accessToken: response.data.data.accessToken,
              refreshToken: response.data.data.refreshToken,
            });
            // console.log(loginData);
          }
        });
    },
    [inputValue]
  );
  if (tokens?.accessToken) {
    setCookie("accessToken", tokens?.accessToken);
    setCookie("refreshToken", tokens?.refreshToken);

    history.push("/");
  }
  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <InputContainer>
          <h1>Log In</h1>
          <Input
            value={inputValue.email}
            onChange={handleInputChange}
            type="email"
            name="email"
            placeholder="이메일을 입력해 주세요."
          />
          <Input
            value={inputValue.password}
            onChange={handleInputChange}
            type="password"
            name="password"
            placeholder="비밀번호"
          />
          <button type="submit">로그인</button>
        </InputContainer>
      </LoginForm>
    </Container>
  );
};

export default Login;
