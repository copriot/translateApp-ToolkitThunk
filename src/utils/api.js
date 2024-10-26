import axios from "axios";
import { API_KEY } from "./apiConfig";


export const api = axios.create({
    baseURL: 'https://text-translator2.p.rapidapi.com',
    headers: API_KEY
})