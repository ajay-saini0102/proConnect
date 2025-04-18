import axios from "axios";

export const BASE_URL = "http://localhost:3030"

export const clintServer = axios.create({
  baseURL : BASE_URL,
  method: ["POST", "GET"],
})