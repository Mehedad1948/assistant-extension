import axios from "axios";
import { useState } from "react";

const apiBase = import.meta.env.VITE_API_URL;

export const useApi = () => {
    const [loading, setLoading] = useState(false);

    const defaultHeaders = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    const getRequest = async (path, params) => {
        try {
            setLoading(true);
            const res = await axios.get(`${apiBase}/${path}`, {
                headers: defaultHeaders,
                withCredentials: true,
                params,
            });
            return res;
        } catch (err) {
            setLoading(false);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const postRequest = async (path, data) => {
        try {
            setLoading(true);
            const res = await axios.post(`${apiBase}/${path}`, data, {
                headers: defaultHeaders,
                withCredentials: true,
            });
            return res;
        } catch (err) {
            console.log('❌❌❌', err);

            setLoading(false);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const putRequest = async (path, data) => {
        try {
            setLoading(true);
            const res = await axios.put(`${apiBase}/${path}`, data, {
                headers: defaultHeaders,
                withCredentials: true,
            });
            return res;
        } catch (err) {
            setLoading(false);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteRequest = async (path) => {
        try {
            setLoading(true);
            const res = await axios.delete(`${apiBase}/${path}`, {
                headers: defaultHeaders,
                withCredentials: true,
            });
            return res;
        } catch (err) {
            setLoading(false);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { loading, getRequest, postRequest, putRequest, deleteRequest };
};
