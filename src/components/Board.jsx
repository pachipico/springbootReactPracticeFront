import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & div {
    display: flex;
    flex-direction: column;
  }
`;
const Title = styled(Link)`
  font-size: 1.5rem;
  text-decoration: none;
  font-weight: bold;
`;

const Board = ({ board }) => {
  const { bid, title, writer, regAt } = board;
  return (
    <Container>
      <Title to={`/board/${bid}`}>
        {title}({board.hit})
      </Title>
      <div>
        <span>{writer}</span>
        <span>{regAt}</span>
      </div>
    </Container>
  );
};

export default Board;
