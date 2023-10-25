import axios from "axios";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import useSWR, { useSWRConfig } from "swr";
import Board from "../../components/Board";
import fetcher from "../../utils/fetcher";
import jwt_decode from "jwt-decode";
import { getCookie } from "../../utils/getCookie";
import jwtDecode from "jwt-decode";
import reissueFetcher from "../../utils/reissueFetcher";
const Container = styled.div`
  flex-grow: 1;
`;

const BoardContainer = styled.div`
  border: 1px solid black;
  overflow: scroll;
  padding: 10px 50px;
`;

const Home = () => {
  // const { data: tokens } = useSWR("http://localhost:8080/api/v1/reissue", reissueFetcher, {
  //   dedupingInterval: 1000 * 60 * 30,
  // });
  // { bid, title, writer, regAt } 
  const [boardData, setBoardData] = useState([{bid:1, title:"title", writer:"writer", regAt:"regAt"}, {bid:1, title:"title", writer:"writer", regAt:"regAt"}, {bid:1, title:"title", writer:"writer", regAt:"regAt"}, {bid:1, title:"title", writer:"writer", regAt:"regAt"}]);

  

  // const jwt = useCallback(() => {
  //   // let decoded = jwt_decode(tokens.accessToken);
  //   console.log(document.cookie);
  //   console.log(tokens);
  //   const accessToken = getCookie("accessToken");
  //   const refreshToken = getCookie("refreshToken");
  //   if (accessToken && refreshToken) {
  //     console.log("cookie access", accessToken, jwtDecode(accessToken));
  //     console.log("cookie refresh", refreshToken, jwtDecode(refreshToken));
  //   }
  // }, [tokens]);

  return (
    <Container>
      {/* <button onClick={() => console.log(tokens)}>로그인중인가?</button> */}
      {/* <button onClick={jwt}>토큰?</button> */}
      {/* <button onClick={reissue}>reissue?</button> */}
      <BoardContainer>
        {boardData?.map((b) => {
          return <Board board={b} />;
        })}
      </BoardContainer>
    </Container>
  );
};

export default Home;
