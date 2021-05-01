import { FC, useEffect, useState } from 'react';
import '../../styles/dropdownMenu.scss'
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import ApartmentIcon from '@material-ui/icons/Apartment';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BookIcon from '@material-ui/icons/Book';
import User from '../../models/user';
import { getUser } from '../../api/users';
import Photo from '../../models/photo';
import { getPhotoById } from '../../api/photos';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Icon from '@material-ui/core/Icon';
interface IDropdownMenuComponentProps {

}


const DropdownMenuComponent: FC<IDropdownMenuComponentProps> = ({ }) => {

    const userId: number = 3;
    const [searchTerm, setSearchTerm] = useState("");
    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchTerm(event.currentTarget.value);
    };


    const [user = new User(), setUser] = useState<User>();
    useEffect(() => {
        getUser(userId).then(response => { setUser(response.data); });
    }, [user.id]);

    const [photo = new Photo(), setPhoto] = useState<Photo>();
    useEffect(() => {
        getPhotoById(userId).then(response => { setPhoto(response.data) });
    }, [photo.id]);


    const platform: ElementContainer[] = [
        new ElementContainer("home", "Home"),
        new ElementContainer("note", "Publications"),
        new ElementContainer("apartment", "Entities"),
        new ElementContainer("emoji_events", "Administration")
    ];

    const workspaces: ElementContainer[] = [
        new ElementContainer("assignment", "Client contract"),
        new ElementContainer("apartment", "Corporate"),
        new ElementContainer("assignment", "Supplier contract"),
        new ElementContainer("book", "Group norms"),
        new ElementContainer("assignment", "Real Estate contracts")
    ]

    return (
        <div id="dropdown">
            <div className="dropdown-input">
                <input type="text" placeholder="filter...." onChange={handleChange} value={searchTerm} />
                <SearchIcon />
            </div>
            <div className="first-column">
                <div className="platform">
                    <h3>Platform</h3>
                    {platform
                        .filter(f => f.name.includes(searchTerm))
                        .map(({ icon, name }) => {
                            return (
                                <div className="element-container">
                                    <Icon>{icon}</Icon>
                                    <span>{name}</span>
                                </div>
                            );
                        })}
                </div>
                <div className="workspaces">
                    <h3>Workspaces</h3>
                    {workspaces
                        .filter(f => f.name.includes(searchTerm))
                        .map(({ icon, name }) => {
                            return (
                                <div className="element-container">
                                    <Icon>{icon}</Icon>
                                    <span>{name}</span>
                                </div>
                            );
                        })}
                </div>
            </div>
            <div className="user-wrapper">
                <div className="image-container">
                    <img src={photo.thumbnailUrl} />
                </div>
                <div className="user-data">
                    <span className="name">{user.name}</span>
                    <span>See profile</span>
                </div>
            </div>

            <div className="logout-wrapper">
                <ExitToAppIcon />
                <span>Logout</span>
            </div>
        </div>

    );
}

class ElementContainer {
    public icon: string = "";
    public name: string = "";

    constructor(icon: string, name: string) {
        this.icon = icon;
        this.name = name;
    }
}

export default DropdownMenuComponent;