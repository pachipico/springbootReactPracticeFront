export const delCookie = (key) => {
  let todayDate = new Date();
  document.cookie = key + "=; path=/; expires=" + todayDate.toGMTString() + ";"; // 현재 시각 이전이면 쿠키가 만료되어 사라짐.
};
