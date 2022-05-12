import jwt_decode from "jwt-decode";

export const setCookie = (name, value) => {
  let todayDate = new Date();
  todayDate.setDate(todayDate.getDate() + 1); // 현재 시각 + 일 단위로 쿠키 만료 날짜 변경
  let decoded = jwt_decode(value);

  let exp = new Date(0);
  exp.setUTCSeconds(decoded.exp);
  document.cookie = name + "=" + escape(value) + "; path=/; expires=" + exp.toGMTString() + ";";
};
