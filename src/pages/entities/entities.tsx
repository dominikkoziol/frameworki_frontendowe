import { useEffect, useState } from 'react';
import { getUsersWithPhoto } from '../../api/users';
import User from '../../models/user';
import "./entities.scss";
import SettingsIcon from '@material-ui/icons/Settings';
import ListIcon from '@material-ui/icons/List';
import AppsIcon from '@material-ui/icons/Apps';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import FilterListIcon from '@material-ui/icons/FilterList';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import ShareIcon from '@material-ui/icons/Share';
import SearchIcon from '@material-ui/icons/Search';
const Entities = () => {

    const [users = [], setUsers] = useState<User[]>();
    const [listLayout, setLayoutList] = useState<boolean>(false);
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [fullScreen, changeFullscreen] = useState<boolean>(false);
    const setLayout = (layout: boolean): void => setLayoutList(layout);
    useEffect(() => {
        getUsersWithPhoto().then(users => {
            setUsers(users);
        });
    }, [users.length]); 
    
    const sortItems = () => {
        console.log("aaa")
        const sortedItems = [...users].sort((a, b) => (a.name > b.name) ? 1 : -1);

        users.sort();
        console.log("bbnbb", users)
        setUsers(sortedItems);
    }
    
    
    // const [isSort, sort] = useState<boolean>();
    // useEffect(() => { return sortItems() }, [isSort]);
  
    return (
        <div className={fullScreen ? "fullscreen entities-page" : "entities-page"}>
            <div className="top-bar">
                <div>
                    <h1>Entities <SettingsIcon className="icon" onClick={() => { setShowSettings(!showSettings) }} /></h1>
                    <div className="button-layout-container">
                        <button onClick={() => { setLayout(true) }} disabled={listLayout} className={!listLayout ? "" : 'active'}>
                            <ListIcon />  List
                        </button>
                        <button onClick={() => { setLayout(false) }} disabled={!listLayout} className={listLayout ? "" : 'active'}>
                            <AppsIcon />   Mosaic
                        </button>
                    </div>
                </div>
                <div className={showSettings ? "settings visible" : "settings hidden"} >
                    <div className="left-wrapper">
                        <div className="select-wrapper">
                            <AccessibilityIcon />
                            <select disabled>
                                <option>All</option>
                            </select>
                        </div>
                        <div className="container">
                            <MoreHorizIcon />
                        </div>
                        <div className="container" onClick={() => {sortItems()}}>
                            <SortByAlphaIcon />
                            <span>Sort</span>
                        </div>
                        <div className="container">
                            <FilterListIcon />
                        Filter
                        </div>
                        <div onClick={() => { changeFullscreen(!fullScreen) }} className="container">
                            <FullscreenIcon />
                        </div>
                        <div className="container">
                            <ShareIcon />
                            <span>Share</span>
                        </div>
                    </div>
                    <div className="right-wrapper">
                        <div className="input-wrapper">
                            <input type="text" placeholder="Filter by title..." />
                            <SearchIcon />
                        </div>

                    </div>
                </div>
            </div>
            {/* "user-data-wrapper" */}
            <div className={"user-data-wrapper " + (listLayout ? "list-layout" : "mosaic-layout")}>
                {
                    users.map((d, i) => {
                        return (
                            <div className="user-data" key={i}>
                                <div className="user-img">
                                    <img src={d.userPhoto} alt="" />
                                </div>
                                <div className="data">
                                    <span className="name">{d.name}</span>
                                    <span className="address">Cancas 1050, Distrito Capital, Venezuela</span>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}


export default Entities;
