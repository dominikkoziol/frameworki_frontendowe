import { AxiosResponse } from 'axios';
import { current } from 'immer';
import React, { useState, useEffect, FC } from 'react';
import { getPostsWithLimit } from '../../api/posts';
import { getUserPostsById } from '../../api/users';
import Post from '../../models/post';
import './resumeComponent.scss';

interface IResumeComponentProps {
    userId: number;
}

const ResumeComponent: FC<IResumeComponentProps> = ({ userId }) => {
    const pageSize = 10;
    const limit = 200;
    const [currentPage, setCurrentPage] = useState(0);
 
    const [posts = [], setPosts] = useState<Post[]>();
    const [filteredPosts = [], setFilteredPosts] = useState<Post[]>();
    const nextPage = () => {
        setCurrentPage(currentPage+1);
    };

    useEffect(() => {
        setFilteredPosts(posts.slice(currentPage * pageSize, pageSize));
    }, [currentPage]);

    useEffect(() => {
        getPostsWithLimit(limit).then((response: AxiosResponse<Post[]>) => {
            setPosts(response.data);
            setFilteredPosts(response.data.slice(currentPage * pageSize, pageSize));
        });
    }, [posts.length]);

 

    return (
        <div className="resume-component">
            {
                filteredPosts.map((element: Post) => {
                    return (
                        <div className="card">
                            <h3>{element.title}</h3>
                            <p>{element.body}</p>
                            <div>
                                <span>
                                    Subsid. corp.
                            </span>
                                <span>
                                    Supplier contract
                            </span>
                                <span>
                                    Updated 3 days ago by John Doe
                            </span>
                            </div>
                        </div>
                    );
                })}

            <div className="pagination">
                <button onClick={nextPage}>Next</button>
            </div>

        </div>
    );
}


export default ResumeComponent;