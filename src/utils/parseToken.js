import jwtDecode from "jwt-decode";

export const parseToken = (token) => {
  return jwtDecode(token);
};
