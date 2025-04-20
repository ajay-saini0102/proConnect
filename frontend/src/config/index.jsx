import axios from "axios";

export const BASE_URL = "https://proconnectlinkedinclone-e1ha.onrender.com"

export const clintServer = axios.create({
  baseURL : BASE_URL,
  method: ["POST", "GET"],
})