import axios from 'axios'

export const api = axios.create({
  baseURL: "https://shorter-back.onrender.com"
})