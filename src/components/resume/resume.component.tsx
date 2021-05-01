import { AxiosResponse } from 'axios';
import React, { useState, useEffect, FC } from 'react';
import { getUserPostsById } from '../../api/users';
import Post from '../../models/post';
import '../../styles/resumeComponent.scss';

interface IResumeComponentProps {
    userId: number;
}

const ResumeComponent: FC<IResumeComponentProps> = ({ userId }) => {
    const [posts = [], setPosts] = useState<Post[]>();
    useEffect(() => {
        getUserPostsById(userId, 10).then((response: AxiosResponse<Post[]>) => {
            setPosts(response.data);
        });
    }, [posts.length]);

    return (
        <div className="resume-component">
            { posts.map((element: Post) => {
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


        </div>
    );
}


export default ResumeComponent;