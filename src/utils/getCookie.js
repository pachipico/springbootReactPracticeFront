export const getCookie = (name) => {
  name = new RegExp(name + "=([^;]*)"); // 쿠키들을 세미콘론으로 구분하는 정규표현식 정의
  return name.test(document.cookie) ? unescape(RegExp.$1) : "";
};
