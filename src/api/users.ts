import axios, { AxiosResponse } from "axios";
import Post from "../models/post";
import User from "../models/user";
const apiURL: string = "https://jsonplaceholder.typicode.com/";

export const getUser = (userId: number): Promise<AxiosResponse<User>> => {
    return axios.get(`${apiURL}users/${userId}`);
};


export const getUserPostsById = (userId: number, limit:number  = 20): Promise<AxiosResponse<Post[]>> => {
    limit = limit < 1 ? 10 : limit;
    return axios.get(`${apiURL}users/${userId}/posts?_limit=${limit}`)
 }







