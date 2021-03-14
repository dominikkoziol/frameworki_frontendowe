import React from "react";
import '../styles/homePage.scss';
import  { getUser }   from '../api/users';

import  User from "../models/user";
const Home = () => {
    let user: User = new User();

    getUser(1).then(response => {
        console.log(response.data);
        user = response.data}); 

    return ( 
        <div className="Home">
            <div className="smaller-column" >
            </div>
            <div className="bigger-column">

            </div>
        </div>
    );
}


export default Home;