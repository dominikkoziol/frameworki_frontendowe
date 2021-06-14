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
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
const Profile = () => {
    const userId: number = 3;
    const [user, setUser] = useState<User>();
    const [userDataEditorEnabled, setUserDataEditor] = useState<boolean>(false);
    const [userDetailsEnabled, setDetail] = useState<boolean>(false);
    useEffect(() => {
        getUser(userId).then(usr => {
            setUser(usr.data);
        })
    }, [user?.id]);

    const [photo = new Photo(), setPhoto] = useState<Photo>();
    useEffect(() => {
        getPhotoById(userId).then(response => { setPhoto(response.data) });
    }, [photo.id]);

    const [expertisesClear, setExpertisesClear] = useState<string[]>([]);
    const [specialitiesClear, setSpecialitiesClear] = useState<string[]>([]);
    const [admissionsClear, setAdmissionsClear] = useState<string[]>([]);
    const [countiesClear, setCountiesClear] = useState<string[]>([]);
    const details = {
        expertises: useState<string[]>([])
    };
    const [expertises, setExpertises] = useState<string[]>(["Manage and acquisition"]);
    const [specialities, setSpecialities] = useState<string[]>(["Cross border operation", "Transactions over 500M€/$"]);
    const [admissions, setAdmissions] = useState<string[]>(["Paris bar association", "Tunisian bar association"]);
    const [counties, setCounties] = useState<string[]>(["Tunisia"]);    

    const enableEditDetails = (): void => {
        if (!userDetailsEnabled) {
            setExpertisesClear([...expertises]);
            setSpecialitiesClear([...specialities]);
            setAdmissionsClear([...admissions]);
            setCountiesClear([...counties]);
        }
        else {
            setExpertises(expertisesClear);
            setSpecialities(specialitiesClear);
            setAdmissions(admissionsClear);
            setCounties(countiesClear);
        }
        setDetail(!userDetailsEnabled)
    }


    const saveDetails = (): void => {
      //TODO: PUT ON SAVE
      
      setDetail(!userDetailsEnabled);
    }

    const handleChangeExpertise = (index: number, value: string) => {
        var clone = [...expertises];
        clone[index] = value;
    }


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
                        <div className="edit-wrapper">
                            <button className="edit">
                                {userDataEditorEnabled ? <SaveIcon /> : null}
                            </button>
                            <button className="edit" onClick={() => { setUserDataEditor(!userDataEditorEnabled) }}>
                                {userDataEditorEnabled ? <CloseIcon /> : <EditIcon />}
                            </button>
                        </div>
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
                    <div className="edit-wrapper">
                        <button className="edit" onClick={() => { saveDetails() }}>
                            {userDetailsEnabled ? <SaveIcon /> : null}
                        </button>
                        <button className="edit" onClick={() => { enableEditDetails() }}>
                            {userDetailsEnabled ? <CloseIcon /> : <EditIcon />}
                        </button>

                    </div>

                    <div>
                        <h2>Expertise</h2>
                        <div className="details-input-wrapper">
                            {
                                expertises.map((e, i) => {
                                    return (
                                        <input type="text" value={e}  onChange={(e) => { handleChangeExpertise(i, e.currentTarget.value) }}      key={i} disabled={!userDetailsEnabled} />
                                    );
                                })
                            }
                            {userDetailsEnabled ? <button onClick={() => setExpertises(expertises.concat(""))}><AddIcon /></button> : ""}
                        </div>
                    </div>
                    <div>
                        <h2>Specialities</h2>
                        <div className="details-input-wrapper">
                            {
                                specialities.map((e, i) => {
                                    return (
                                        <input type="text" value={e} key={i} disabled={!userDetailsEnabled} />
                                    );
                                })
                            }
                            {userDetailsEnabled ? <button onClick={() => { setSpecialities(specialities.concat("")) }}><AddIcon /></button> : ""}
                        </div>
                    </div>

                    <div>
                        <h2>Admissions</h2>
                        <div className="details-input-wrapper">
                            {
                                admissions.map((e, i) => {
                                    return (
                                        <input type="text" value={e} readOnly key={i} disabled={!userDetailsEnabled} />
                                    );
                                })

                            }
                            {userDetailsEnabled ? <button onClick={() => setAdmissions(admissions.concat("")) }><AddIcon /></button> : ""}
                        </div>
                    </div>

                    <div>
                        <h2>Counties</h2>
                        <div className="details-input-wrapper">
                            {
                                counties.map((e, i) => {
                                    return (
                                        <input type="text" value={e} readOnly key={i} disabled={!userDetailsEnabled} />
                                    );
                                })
                            }
                            {userDetailsEnabled ? <button onClick={() => setCounties(counties.concat(""))}><AddIcon /> </button> : ""}
                        </div>
                    </div>


                </div>

            </div>

        </div>
    );
}

export default Profile;