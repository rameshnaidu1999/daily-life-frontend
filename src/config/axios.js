import axios from "axios";

const instance = axios.create({
  baseURL: "https://daily-life-api.herokuapp.com/",
});

export default instance;
