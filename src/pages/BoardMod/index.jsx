import axios from "axios";
import React, { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";
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
function BoardMod() {
  const { data: tokens } = useSWR("http://localhost:8080/api/v1/reissue");
  const location = useLocation();
  const [board, setBoard] = useState(location.state.board);
  const history = useHistory();
  const handleInputChange = useCallback(
    (e) => {
      setBoard({ ...board, [e.target.name]: e.target.value });
    },
    [board]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(board);
      axios
        .put(`http://localhost:8080/api/v1/board/${board.bid}`, JSON.stringify(board), {
          headers: { "X-AUTH-TOKEN": tokens.accessToken, "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res.data.data);
          history.push(`/board/${res.data.data}`);
        });
    },
    [board, history, tokens]
  );

  return (
    <Container>
      <InputForm onSubmit={handleSubmit}>
        <label>Title</label>
        <TitleInput value={board.title} onChange={handleInputChange} name="title" />
        <label>Content</label>
        <ContentInput value={board.content} onChange={handleInputChange} name="content" />
        <button type="submit">modify</button>
      </InputForm>
    </Container>
  );
}

export default BoardMod;
