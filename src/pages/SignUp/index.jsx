import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AddressPopUp from "../../components/AddressPopUp";

const Container = styled.div`
  flex-grow: 1;
  padding: 40px;
`;

const SignUpInput = styled.input`
  flex-grow: 1;
  padding: 10px 15px;
  height: 23px;
  border-radius: 10px;
  border: 1.5px solid lightgrey;
  &:focus {
    outline: 1.5px solid rgba(0, 150, 255, 1);
  }
`;

const ValidInput = styled(SignUpInput)`
  border: 1.5px solid ${(props) => (props.err ? "red" : "lightgrey")};
  &:focus {
    outline: 1.5px solid ${(props) => (props.err ? "red" : "rgba(0, 150, 255, 1)")};
  }
`;
const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 3px solid #e8e8e8;
  align-items: flex-start;
  & div {
    width: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  div > label {
    font-size: 1rem;
    display: block;
  }
  div > span {
    font-size: 14px;
    color: red;
  }
  div:last-child {
    align-items: flex-end;
  }

  div:last-child > button {
    width: 80px;
    height: 30px;
    border-radius: 9px;
  }
`;

const SignUp = () => {
  const [newUser, setNewUser] = useState({ email: "", name: "", password: "", passwordChk: "" });
  const [address, setAddress] = useState({ common: "", detail: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const history = useHistory();

  const handleInputChange = useCallback(
    (e) => {
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    },
    [newUser]
  );

  const handleAddressChange = useCallback((address) => {
    setAddress({ ...address, common: address });
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (newUser.name == "" || newUser.password == "") {
        alert("모든 정보를 입력 바랍니다.");
        return;
      }
      axios
        .post("http://localhost:8080/api/v1/signup", {
          ...newUser,
          address: address.common + "," + address.detail,
        })
        .then((res) => {
          if (res.data.success) {
            alert("회원가입이 완료 되었습니다.");
            history.push("/login");
          }
        })
        .catch((err) => console.log(err));
    },
    [newUser, address, history]
  );

  const handleEmailChkBtnClick = () => {
    axios
      .post(
        "http://localhost:8080/api/v1/emailchk",
        { email: newUser.email },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        if (res.data.data) {
          alert("사용 가능한 이메일입니다.");
          inputRef.current.disabled = true;
          buttonRef.current.disabled = true;
          setEmailErr(false);
        } else {
          alert("중복된 이메일입니다.");
          inputRef.current.focus();
          setEmailErr(true);
        }

        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handlePopUpBtnClick = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    setPasswordErr(newUser.password != newUser.passwordChk);
  }, [newUser.password, newUser.passwordChk]);

  return (
    <Container>
      <SignUpForm onSubmit={handleSubmit}>
        <div>
          <label>이메일</label>
          <ValidInput
            err={emailErr}
            ref={inputRef}
            onChange={handleInputChange}
            type="email"
            name="email"
            value={newUser.email}
          />
          <button ref={buttonRef} type="button" onClick={handleEmailChkBtnClick}>
            중복 확인
          </button>
        </div>
        <div>
          <label>이름</label>
          <SignUpInput onChange={handleInputChange} type="text" name="name" value={newUser.name} />
        </div>
        <div>
          <label>주소</label>
          <SignUpInput type="text" name="address" disabled value={address.common} />
          <SignUpInput
            type="text"
            name="detail"
            value={address.detail}
            onChange={(e) => setAddress({ ...address, detail: e.target.value })}
          />
          <button type="button" onClick={handlePopUpBtnClick} disabled={address.common && true}>
            주소 검색
          </button>
          <AddressPopUp isOpen={isOpen} closeModal={closeModal} handleAddressChange={handleAddressChange} />
        </div>
        <div>
          <label>비밀번호</label>
          <ValidInput
            onChange={handleInputChange}
            err={passwordErr}
            type="password"
            name="password"
            value={newUser.password}
          />
          {passwordErr && <span>비밀번호가 다릅니다</span>}
        </div>
        <div>
          <label>비밀번호 확인</label>
          <ValidInput
            onChange={handleInputChange}
            err={passwordErr}
            type="password"
            name="passwordChk"
            value={newUser.passwordChk}
          />
          {passwordErr && <span>비밀번호가 다릅니다</span>}
        </div>
        <div>
          <button type="submit" disabled={passwordErr || emailErr}>
            회원가입
          </button>
        </div>
      </SignUpForm>
    </Container>
  );
};

export default SignUp;
