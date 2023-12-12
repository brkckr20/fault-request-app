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

export const getRequests = async () => {
    const { data } = await axios.get(`${API}/talepler`);
    return data;
}

export const putProcessingNotification = async (requestID) => {
    const { data } = axios.put(`${API}/talep/i/${requestID}`);
    return data;
}
export const putProcessing = async (values) => {
    const { data } = axios.put(`${API}/talep/ix`, values);
    return data;
}