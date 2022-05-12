import axios from "axios";

const fetcher = (url, token) =>
  axios.get(url, { headers: { "X-AUTH-TOKEN": token } }).then((response) => response.data);

export default fetcher;
