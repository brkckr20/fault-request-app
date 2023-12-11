import axios from "axios";
import { API } from "../config";

export const getUsers = async () => {
    const { data } = await axios.get(`${API}/kullanicilar`);
    return data;
}

export const postRequest = async (values) => {
    const { data } = await axios.post(`${API}/talep`, values);
    return data;
}