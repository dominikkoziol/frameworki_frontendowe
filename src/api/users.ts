import axios, { AxiosResponse } from "axios";
import Post from "../models/post";
import User from "../models/user";
const apiURL = "https://jsonplaceholder.typicode.com/";

export const getUser = (userId: number): Promise<AxiosResponse<User>> => {
    return axios.get(`${apiURL}users/${userId}`);
};


export const getUserPostsById = (userId: number, limit:number  = 20): Promise<AxiosResponse<Post[]>> => {
    limit = limit < 1 ?? limit > 20 ? 20 : limit;
    return axios.get(`${apiURL}users/${userId}/posts?_limit=${limit}`)
 }







