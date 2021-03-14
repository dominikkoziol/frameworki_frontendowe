import axios, { AxiosResponse } from "axios";
import User from "../models/user";
const apiURL = "https://jsonplaceholder.typicode.com/";

export const getUser = (userId: number): Promise<AxiosResponse<User>> => {
    return axios.get(`${apiURL}users/${userId}`);
};









