import axios from "axios";
import React, { useCallback } from "react";
import styled from "styled-components";
import useSWR, { useSWRConfig } from "swr";
import Board from "../../components/Board";
import fetcher from "../../utils/fetcher";
import jwt_decode from "jwt-decode";
import { getCookie } from "../../utils/getCookie";
import jwtDecode from "jwt-decode";
import loginFetcher from "../../utils/reissueFetcher";
const Container = styled.div`
  flex-grow: 1;
`;

const BoardContainer = styled.div`
  border: 1px solid black;
  overflow: scroll;
  padding: 10px 50px;
`;

const Home = () => {
  const { data: tokens } = useSWR("http://localhost:8080/api/v1/reissue", loginFetcher, {
    dedupingInterval: 1000 * 60 * 30,
  });

  const { data: boardData } = useSWR("http://localhost:8080/api/v1/boards", fetcher);

  const jwt = useCallback(() => {
    // let decoded = jwt_decode(tokens.accessToken);
    console.log(tokens);
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    console.log("cookie access", accessToken, jwtDecode(accessToken));
    console.log("cookie refresh", refreshToken, jwtDecode(refreshToken));
  }, [tokens]);

  return (
    <Container>
      <button onClick={() => console.log(tokens)}>로그인중인가?</button>
      <button onClick={jwt}>토큰?</button>
      {/* <button onClick={reissue}>reissue?</button> */}
      <BoardContainer>
        {boardData?.list.map((b) => {
          return <Board board={b} />;
        })}
      </BoardContainer>
    </Container>
  );
};

export default Home;
