import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { useEffect, useState } from 'react';
import { getPhotoById } from '../../api/photos';
import { getUser } from '../../api/users';
import Photo from '../../models/photo';
import User from '../../models/user';
import './profile.scss';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

const Profile = () => {
    const userId: number = 3;
    const [user, setUser] = useState<User>();
    const [userDataEditorEnabled, setUserDataEditor] = useState<boolean>(false);
    useEffect(() => {
        getUser(userId).then(usr => {
            setUser(usr.data);
        })
    }, [user?.id]);

    const [photo = new Photo(), setPhoto] = useState<Photo>();
    useEffect(() => {
        getPhotoById(userId).then(response => { setPhoto(response.data) });
    }, [photo.id]);

    const [expertises, setExpertises] = useState<string[]>(["Manage and acquisition"]);
    const [specialities, setSpecialities] = useState<string[]>(["Cross border operation", "Transactions over 500M€/$"]);
    const [admissions, setAdmissions] = useState<string[]>(["Paris bar association", "Tunisian bar association"]);
    const [counties, setCounties] = useState<string[]>(["Tunisia"]);
 
 
 
 
    return (
        <div className="Profile">
            <div className="container">
                <div className="info-row">
                    <div className="elements"><ChatBubbleOutlineIcon /><span>Message</span></div>
                    <div className="elements"><FormatAlignJustifyIcon /><span>Create a request</span></div>
                    <div className="elements"><InsertDriveFileIcon /><span>Add a cluster</span></div>
                </div>
                <div className="user-wrapper">
                    <div className="left-column">
                        <div>
                            <img src={photo.thumbnailUrl} alt="thumbnail" />
                        </div>
                        <span>
                            See profile
                        </span>
                    </div>
                    <div className="right-column">
                        <button className="edit" onClick={() => { setUserDataEditor(!userDataEditorEnabled) }}>
                            {userDataEditorEnabled ? <CloseIcon /> : <EditIcon />}
                        </button>
                        <input type="text" disabled={!userDataEditorEnabled} value={user?.name} />
                        <input type="text" disabled={!userDataEditorEnabled} value={user?.username} />
                        <div>
                            <div>
                                <input type="text" disabled={!userDataEditorEnabled} value={user?.company.name} />
                                <input type="text" disabled={!userDataEditorEnabled} value={user?.website} />

                            </div>
                            <div>
                                <select disabled={!userDataEditorEnabled}>
                                    <option>Contractor</option>
                                    <option>Partner</option>
                                </select>
                                <input type="text" disabled={!userDataEditorEnabled} value={user?.phone} />
                            </div>
                        </div>
                    </div>
                </div>

                <hr />

                <div className="details">
                    <div>
                    <h2>Expertise</h2>
                    {
                        expertises.map(e => {
                            return (
                                <input type="text" value={e} />
                            );
                        })
                    }
               
                    </div>
                    <div>
                    <h2>Specialities</h2>
                    {
                        specialities.map(e => {
                            return (
                                <input type="text" value={e} />
                            );
                        })
                    }
               
                    </div>

                    <div>
                    <h2>Admissions</h2>
                    {
                        admissions.map(e => {
                            return (
                                <input type="text" value={e} />
                            );
                        })
                    }
               
                    </div>

                    <div>
                    <h2>Counties</h2>
                    {
                        counties.map(e => {
                            return (
                                <input type="text" value={e} />
                            );
                        })
                    }
               
                    </div>


                </div>

            </div>

        </div>
    );
}

export default Profile;