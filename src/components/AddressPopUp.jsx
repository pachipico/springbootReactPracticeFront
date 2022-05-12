import axios from "axios";
import React, { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "react-modal/lib/components/Modal";
import styled from "styled-components";

Modal.setAppElement("#modal");

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  align-items: center;
`;
const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 1.5rem;
  color: black;
`;

const SearchForm = styled.form``;

const AddressInput = styled.input`
  flex-grow: 1;
  height: 30px;
  padding: 0 10px;
`;

const ResultContainer = styled.div``;
const Result = styled.div``;

const AddressPopUp = ({ isOpen, closeModal, handleAddressChange }) => {
  const [keyword, setKeyword] = useState();
  const [addressList, setAddressList] = useState([]);
  const searchAddress = useCallback(() => {
    axios
      .post(
        `https://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=devU01TX0FVVEgyMDIyMDUxMjE1MjU0MzExMjU2MTM=&currentPage=1&resultType=json&keyword=${keyword}`
      )
      .then((res) => {
        console.log(res);
        setAddressList(res.data.results.juso);
      })
      .catch((err) => console.log(err));
  }, [keyword]);

  const handleKeywordChange = useCallback((e) => {
    setKeyword(e.target.value);
  }, []);

  const handleSearchBtnClick = useCallback(
    (e) => {
      e.preventDefault();
      searchAddress();
    },
    [searchAddress]
  );

  const handleAddressClick = useCallback(
    (e) => {
      handleAddressChange(e.target.innerHTML);

      closeModal();
    },
    [closeModal, handleAddressChange]
  );

  return (
    <>
      <Modal isOpen={isOpen}>
        <CloseButton onClick={closeModal}>𝗫</CloseButton>
        <Container>
          <SearchForm>
            <label>도로명 주소 검색</label>
            <div>
              <AddressInput onChange={handleKeywordChange} value={keyword} />
              <button type="submit" onClick={handleSearchBtnClick}>
                검색
              </button>
            </div>
          </SearchForm>
          <ResultContainer>
            {!addressList && "정보가 없습니다."}
            {addressList?.map((v, i) => (
              <Result onClick={handleAddressClick} key={i}>
                {v.roadAddr}
              </Result>
            ))}
          </ResultContainer>
        </Container>
      </Modal>
    </>
  );
};

export default AddressPopUp;
