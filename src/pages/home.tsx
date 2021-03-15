import React, { useState, useEffect } from 'react';
import { getUser } from '../api/users';
import { getPhotoById } from '../api/photos';
import getPostsWithLimit from '../api/posts';
import User from "../models/user";
import '../styles/homePage.scss';
import profileImage from '../assets/images/profile_image.png';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import NoteIcon from '@material-ui/icons/Note';
import AddIcon from '@material-ui/icons/Add';
import ApartmentIcon from '@material-ui/icons/Apartment';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import Photo from '../models/photo';
import Post from '../models/post';


const Home = () => {

    const [user, setUser] = useState<User>();
    useEffect(() => {
        getUser(1).then(response => { setUser(response.data); });
    }, [user?.id]);

    const [photo, setPhoto] = useState<Photo>();
    useEffect(() => {
        getPhotoById(1).then(response => { setPhoto(response.data) });
    }, [photo?.id]);

    const [bigPost, setBigPost] = useState<Post>();

    useEffect(() => {
        getPostsWithLimit(1).then(response => {
            setBigPost(response.data[0]);
        });
    }, [bigPost?.id]);


    return (
        <div className="Home">
            <div className="smaller-column column" >
                <div className="card">
                    <div className="image-container">
                        <img src={photo?.thumbnailUrl} alt="profile-image" />
                    </div>
                    <h2>{user?.name}</h2>
                    <div className="job-title">
                        <span>Job title - {user?.company.name}</span>
                    </div>
                    <hr />
                    <div className="buttons-container">
                        <div className="container">
                            <div className="text">
                                <PeopleOutlineIcon />
                                <span>Your network</span>
                            </div>
                            <button><GroupAddIcon /></button>
                        </div>
                        <div className="container">
                            <div className="text">
                                <NoteIcon />
                                <span>Your publications</span>
                            </div>
                            <button><AddIcon /></button>
                        </div>
                    </div>
                </div>
                <div className="option-containers">
                    <div>
                        <NoteIcon />
                        <span>Publications</span>
                    </div>
                    <div>
                        <SystemUpdateAltIcon />
                        <span>Ecosystem</span>
                    </div>
                    <div>
                        <ApartmentIcon />
                        <span>Entities</span>
                    </div>
                </div>
            </div>
            <div className="bigger-column column">
                <div className="big-card">
                    <div className="image-container" style={{ backgroundImage: `url(${photo?.url})`}}>
                        <h2>{ bigPost?.title }</h2>
                    </div>
                    <div className="publication-container">
                        <h3>Latest Publications</h3>
                    </div>
                </div>
            </div>
        </div>
    );



}


export default Home;