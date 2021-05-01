import { AxiosResponse } from 'axios';
import { current } from 'immer';
import React, { useState, useEffect, FC } from 'react';
import { getPostsWithLimit } from '../../api/posts';
import { getUserPostsById } from '../../api/users';
import Post from '../../models/post';
import './resumeComponent.scss';
import SearchIcon from '@material-ui/icons/Search';
import RssFeedIcon from '@material-ui/icons/RssFeed';
interface IResumeComponentProps {
    userId: number;
}

const ResumeComponent: FC<IResumeComponentProps> = ({ userId }) => {
    const pageSize = 10;
    const limit = 100;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [posts = [], setPosts] = useState<Post[]>();
    const [filteredPosts = [], setFilteredPosts] = useState<Post[]>();

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchTerm(event.currentTarget.value);
    };

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
        setFilteredPosts(posts.slice((currentPage - 1) * pageSize, pageSize * currentPage));
    }, [currentPage]);

    useEffect(() => {
        getPostsWithLimit(limit).then((response: AxiosResponse<Post[]>) => {
            setPosts(response.data);
            setFilteredPosts(response.data.slice((currentPage - 1) * pageSize, pageSize * currentPage));
        });
    }, [posts.length]);



    return (
        <div className="resume-component">
            <div className="filters">
                <div className="options">
                    <div className="input-container">
                        <input type="text" placeholder="Filter by title..." onChange={handleChange} value={searchTerm} />
                        <SearchIcon className="search" />
                    </div>
                    <div className="follow">
                        <RssFeedIcon />
                        <span> Followed </span>
                    </div>
                </div>
            </div>
            {
                filteredPosts
                .filter(f => f.title.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((element: Post) => {
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
                <button disabled={currentPage <= 1} style={currentPage > 1 ? { color: "#6464e6" } : { color: "gray", cursor: "unset" }} onClick={previousPage}>Previous</button>
                <button disabled={currentPage >= (limit / pageSize)} style={currentPage < (limit / pageSize) ? { color: "#6464e6" } : { color: "gray", cursor: "noneu" }} onClick={nextPage}>Next</button>
            </div>

        </div>
    );
}


export default ResumeComponent;