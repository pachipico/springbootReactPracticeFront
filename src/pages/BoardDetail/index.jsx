import axios from "axios";
import React, { useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { parseToken } from "../../utils/parseToken";

const BoardDetail = () => {
  const { data: tokens } = useSWR("http://localhost:8080/api/v1/reissue");
  let decoded = parseToken(tokens?.accessToken);
  const history = useHistory();

  const { bid } = useParams();
  const { data: boardData } = useSWR(`http://localhost:8080/api/v1/board/${bid}`, (url) =>
    fetcher(url, tokens.accessToken)
  );
  console.log(bid, boardData);
  const handleModBtnClick = useCallback(() => {
    history.push(`/board/mod/${boardData?.data.bid}`, { board: boardData.data });
  }, [boardData, history]);

  const handleDelBtnClick = useCallback(() => {
    axios
      .delete(`http://localhost:8080/api/v1/board/${boardData?.data.bid}`, {
        headers: { "X-AUTH-TOKEN": tokens?.accessToken },
      })
      .then((res) => {
        if (res.data.success) {
          alert("삭제 완료");
          history.push("/");
        }
      });
  }, [boardData, history, tokens]);

  if (!tokens?.accessToken) {
    alert("로그인이 필요한 서비스 입니다.");
    history.push("/login");
  }
  return (
    <div>
      <h1>{boardData?.data.title}</h1>
      <h4>{boardData?.data.content}</h4>
      {decoded?.email == boardData?.data.writer && (
        <>
          <button onClick={handleModBtnClick}>Mod</button>
          <button onClick={handleDelBtnClick}>Del</button>
        </>
      )}
    </div>
  );
};

export default BoardDetail;
