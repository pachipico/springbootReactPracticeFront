import axios from "axios";
import jwtDecode from "jwt-decode";
import { getCookie } from "./getCookie";
import { setCookie } from "./setCookie";

const loginFetcher = (url) =>
  axios
    .post(
      url,
      { accessToken: getCookie("accessToken"), refreshToken: getCookie("refreshToken") },
      { headers: { "X-AUTH-TOKEN": getCookie("accessToken") } }
    )
    .then((response) => {
      console.log("login fetcher: ", response);
      setCookie("accessToken", response.data.data.accessToken);
      setCookie("refreshToken", response.data.data.refreshToken);
      let decoded = jwtDecode(response.data.data.accessToken);

      let exp = new Date(0);
      exp.setUTCSeconds(decoded.exp);
      console.log(`토큰 ${exp} 까지 연장`);
      return response.data.data;
    });
export default loginFetcher;
