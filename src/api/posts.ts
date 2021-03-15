import axios, { AxiosResponse } from "axios"
import Post from "../models/post";


const apiUrl = "https://jsonplaceholder.typicode.com/";


export const getPostsWithLimit = (limit: number = 20): Promise<AxiosResponse<Post[]>> => {
   return axios.get(`${apiUrl}posts?_limit=${limit}`);
}


export default getPostsWithLimit;