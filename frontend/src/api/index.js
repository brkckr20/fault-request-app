import axios from "axios";
import { API, getUserId } from "../config";

const userID = getUserId();

export const getUsers = async () => {
    const { data } = await axios.get(`${API}/kullanicilar`);
    return data;
}

export const postRequest = async (values) => {
    const { data } = await axios.post(`${API}/talep`, values);
    return data;
}

export const getRequest = async () => {
    const { data } = axios.get(`${API}/talep/${userID}`);
    return data;
}