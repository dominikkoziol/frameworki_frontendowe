import { useState, useEffect } from 'react';
import { getUser, getUserPostsById } from '../api/users';
import { getPhotoById } from '../api/photos';
import User from "../models/user";
import '../styles/homePage.scss';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import NoteIcon from '@material-ui/icons/Note';
import AddIcon from '@material-ui/icons/Add';
import ApartmentIcon from '@material-ui/icons/Apartment';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import Photo from '../models/photo';
import Post from '../models/post';
import ResumeComponent from '../components/resume/resume.component';
import SearchIcon from '@material-ui/icons/Search';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import Workspace from '../models/workspace';
import WorkspaceComponent from '../components/workspace/workspace.component';

const Home = () => {
    const userId: number = 3;

    const [user = new User(), setUser] = useState<User>();
    useEffect(() => {
        getUser(userId).then(response => { setUser(response.data); });
    }, [user.id]);

    const [photo = new Photo(), setPhoto] = useState<Photo>();
    useEffect(() => {
        getPhotoById(userId).then(response => { setPhoto(response.data) });
    }, [photo.id]);

    const [bigPost, setBigPost] = useState<Post>();
    const [posts = [], setPosts] = useState<Post[]>();

    useEffect(() => {
        getUserPostsById(userId, 1).then(response => {
            setBigPost(response.data[0]);
        });
    }, [bigPost?.id]);


    useEffect(() => {
        getUserPostsById(userId, 3).then(response => {
            setPosts(response.data);
        });
    }, [posts.length > 0]);

    const workspaces = [
        new Workspace("office.jpg", "aaaa", "Client contract", "Contract", "2 days", 150),
        new Workspace("office.jpg", "aaaa", "Client contract", "Contract", "2 days", 150),
        new Workspace("office.jpg", "aaaa", "Client contract", "Contract", "2 days", 150),
        new Workspace("office.jpg", "aaaa", "Client contract", "Contract", "2 days", 150),
        new Workspace("office.jpg", "aaaa", "Client contract", "Contract", "2 days", 150),
        new Workspace("office.jpg", "aaaa", "Client contract", "Contract", "2 days", 150)
    ]

    return (
        <div className="Home">
            <div className="smaller-column column" >
                <div className="card">
                    <div className="image-container">
                        <img src={photo.thumbnailUrl} alt="profile-image" />
                    </div>
                    <h2>{user.name}</h2>
                    <div className="job-title">
                        <span>Job title - {user.company.name}</span>
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
                    <div className="image-container" style={{ backgroundImage: `url(${photo.url})` }}>
                        <div className="gradient-container">
                            <h2> {bigPost?.title}</h2>
                            <div className="author">
                                <span> 7 jan. 2020</span>
                                <div className="profile-image">
                                    <img src={photo.thumbnailUrl} alt="profile_picture" />
                                </div>
                                <span>{user.name} </span>
                            </div>
                        </div>
                    </div>
                    <div className="publication-container">
                        <h3>Latest Publications</h3>
                        <div className="">

                            {posts.map(element => {
                                return (
                                    <div className="post-container">
                                        <div className="small-image-container">
                                            <img src={photo.thumbnailUrl} />
                                        </div>
                                        <div className="info-container">
                                            <h4>{element.title}</h4>
                                            <div className="author">
                                                <span> 7 jan. 2020</span>
                                                <div className="profile-image">
                                                    <img src={photo.thumbnailUrl} alt="profile_picture" />
                                                </div>
                                                <span>{user.name} </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <span className="see-more">See more publications</span>
                        </div>
                    </div>
                </div>
                <div className="workspaces-wrapper">
                    <h3>Workspaces</h3>
                    <div className="workspace-container">
                        {workspaces.map(w => {
                            return (
                                <WorkspaceComponent workspace={w} />
                            );
                        })}
                    </div>
                </div>
                <div className="resume">
                    <div className="filters">
                        <h2>Resume your work</h2>
                        <div className="options">
                            <div className="input-container">
                                <input type="text" placeholder="Filter by title..." />
                                <SearchIcon className="search" />
                            </div>
                            <div className="follow">
                                <RssFeedIcon />
                                <span> Followed </span>
                            </div>

                        </div>
                    </div>
                    <ResumeComponent userId={2} />
                </div>
            </div>
        </div>
    );



}


export default Home;