import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";
import { delCookie } from "../utils/delCookie";

const HeaderContainer = styled.div`
  height: 80px;
  background-color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled(Link)`
  font-size: 2rem;
  text-decoration: none;
  color: white;
  font-family: italic;
  margin-left: 1rem;
`;

const RightLinks = styled.div`
  display: flex;
  flex-direction: row;
`;
const RightLink = styled(Link)`
  font-size: 1rem;
  text-decoration: none;
  color: white;
  margin-right: 1rem;
`;

const Header = () => {
  const { data: tokens, mutate } = useSWR("http://localhost:8080/api/v1/reissue");

  const logout = useCallback(() => {
    mutate({}, true);
    delCookie("email");
    delCookie("refreshToken");
    delCookie("accessToken");
  }, [mutate]);

  return (
    <HeaderContainer>
      <Logo to="/">Logo</Logo>
      <RightLinks>
        {tokens?.accessToken ? (
          <>
            <RightLink onClick={logout} to="">
              로그아웃
            </RightLink>
            <RightLink to="/board/register">글 작성</RightLink>
          </>
        ) : (
          <>
            <RightLink to="/login">Log In</RightLink>
            <RightLink to="/signup">Sign Up</RightLink>
          </>
        )}
      </RightLinks>
    </HeaderContainer>
  );
};

export default Header;
