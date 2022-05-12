import axios from "axios";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";
import { parseToken } from "../../utils/parseToken";

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 60%;
  text-align: left;
  & label {
    font-size: 1.5rem;
  }

  button {
    width: 60px;
    height: 30px;
    align-self: flex-end;
    margin: 10px 0;
  }
`;

const TitleInput = styled.input`
  height: 30px;
`;
const ContentInput = styled.textarea`
  flex-grow: 1;
`;

const RegisterBoard = () => {
  const { data: tokens } = useSWR("http://localhost:8080/api/v1/reissue");
  const decoded = parseToken(tokens?.accessToken);
  const [board, setBoard] = useState({ title: "", writer: decoded?.email, content: "" });
  const history = useHistory();
  const postBoardToServer = useCallback(() => {
    const config = {
      headers: {
        "X-AUTH-TOKEN": tokens.accessToken,
        "Content-Type": "application/json",
      },
    };
    axios.post("http://localhost:8080/api/v1/board", JSON.stringify(board), config).then((res) => {
      if (res.data.success == true) {
        alert("게시글 작성 성공");
        history.push(`/board/${res.data.data.bid}`);
      }
    });
  }, [board, history, tokens]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      postBoardToServer();
    },
    [postBoardToServer]
  );

  const handleInputChange = useCallback(
    (e) => {
      setBoard({ ...board, [e.target.name]: e.target.value });
    },
    [board]
  );

  return (
    <Container>
      <InputForm onSubmit={handleSubmit}>
        <label>Title</label>
        <TitleInput value={board.title} onChange={handleInputChange} name="title" />
        <label>Content</label>
        <ContentInput value={board.content} onChange={handleInputChange} name="content" />
        <button type="submit">submit</button>
      </InputForm>
    </Container>
  );
};

export default RegisterBoard;
