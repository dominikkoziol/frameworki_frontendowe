import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { useEffect, useState } from 'react';
import { getPhotoById } from '../../api/photos';
import { getUser, updateUserData } from '../../api/users';
import Photo from '../../models/photo';
import User from '../../models/user';
import './profile.scss';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';


const Profile = () => {
    const userId: number = 1;
    const [user, setUser] = useState<User>(new User());
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
    const [hoursFeeClear, setHourseFeeClear] = useState<string>("");
    const [correspondentsClear, setCorrespondentsClear] = useState<string[]>([]);
    const [feesClear, setFeesClear] = useState<Fees[]>([]);
    const [internalReviewsClear, setInternalReviewsClear] = useState<Review[]>([]);

    const [expertises, setExpertises] = useState<string[]>(["Manage and acquisition"]);
    const [specialities, setSpecialities] = useState<string[]>(["Cross border operation", "Transactions over 500M€/$"]);
    const [admissions, setAdmissions] = useState<string[]>(["Paris bar association", "Tunisian bar association"]);
    const [counties, setCounties] = useState<string[]>(["Tunisia"]);
    const [hourlyFee, setHourlyFee] = useState<string>("600$/hour(Negociated)");
    const [fileName, setFileName] = useState<string>("");
    const [correspondents, setCorrespondents] = useState<string[]>(["Jan Kowalski", "Anna Nowak"]);
    const [internalReviews, setInternalReviews] = useState<Review[]>([
        new Review("Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "2020-08-09"),
        new Review("Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "2020-08-09"),
        new Review("Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "2020-08-09"),
        new Review("Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "2020-08-09"),

    ]);

    const [fees, setFees] = useState<Fees[]>([
        new Fees(2020, "CS 160", 3500, "John Adams"),
        new Fees(2020, "CS 160", 3500, "John Adams"),
        new Fees(2020, "CS 160", 3500, "John Adams"),
        new Fees(2020, "CS 160", 3500, "John Adams")
    ]);

    const changeUser = (field: string[], value: string) => {
        let clone = JSON.parse(JSON.stringify(user));
        
        const key1 = field[0] as keyof User;
        const key2 = field[1] as keyof User ?? null;
        if(key2)clone[key1][key2] = value;
        else clone[key1] = value;
        setUser(clone);
    }

    const removeInternalReview = (index: number) => {
        let clone = [...internalReviews];
        clone.splice(index, 1);
        setInternalReviews(clone);
    }

    const handleChangeFees = (index: number, field: string, v: any) => {
        let clone: any = JSON.parse(JSON.stringify([...fees]));
        const key = field as keyof Fees;
        clone[index][key] = v;
        setFees(clone);
    }

    const handleInternalReview =  (index: number, field: string, v: string)  => {
        let clone: Review[] = [...internalReviews];
        const key = field as keyof Review;
        clone[index][key] = v;

        setInternalReviews(clone);
    }
    const removeFees = (index: number) => {
        let clone = [...fees];
        clone.splice(index, 1);
        setFees(clone);
    }
    const enableEditDetails = (): void => {
        if (!userDetailsEnabled) {
            setExpertisesClear([...expertises]);
            setSpecialitiesClear([...specialities]);
            setAdmissionsClear([...admissions]);
            setCountiesClear([...counties]);
            setHourseFeeClear(hourlyFee);
            setCorrespondentsClear([...correspondents]);
            setFeesClear([...fees]);
            setInternalReviewsClear([...internalReviews]);
        }
        else {
            setExpertises(expertisesClear);
            setSpecialities(specialitiesClear);
            setAdmissions(admissionsClear);
            setCounties(countiesClear);
            setHourlyFee(hoursFeeClear);
            setCorrespondents(correspondentsClear);
            setFees(feesClear);
            setInternalReviews(internalReviewsClear);
        }
        setDetail(!userDetailsEnabled)
    }


    const saveDetails = (): void => {
        setDetail(!userDetailsEnabled);
    }

    const handleChangeExpertise = (index: number, value: string) => {
        var clone = [...expertises];
        clone[index] = value;
        setExpertises(clone);
    }
    const handleChangeSpecialites = (index: number, value: string) => {
        var clone = [...specialities];
        clone[index] = value;
        setSpecialities(clone);
    }
    const handleChangeAdmissions = (index: number, value: string) => {
        var clone = [...admissions];
        clone[index] = value;
        setAdmissions(clone);
    }
    const handleChangeCounties = (index: number, value: string) => {
        var clone = [...counties];
        clone[index] = value;

        setCounties(clone);
    }

    const handleChangeCorespondents = (index: number, value: string) => {
        var clone = [...correspondents];
        clone[index] = value;
        setCorrespondents(clone);
    }

    const removeCorrespondents = (index: number) => {
        let clone = [...correspondents];
        clone.splice(index, 1);
        setCorrespondents(clone);
    }

    const saveUserData = () => {
        updateUserData(user).then(response => {
            setUser(response.data);
            setUserDataEditor(false);
        })
    }


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const name: string = e.target.files ? e.target.files[0].name : "Unknown file name";
        setFileName(name);
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
                            <button className="edit" onClick={() => {saveUserData()}}>
                                {userDataEditorEnabled ? <SaveIcon /> : null}
                            </button>
                            <button className="edit" onClick={() => { setUserDataEditor(!userDataEditorEnabled) }}>
                                {userDataEditorEnabled ? <CloseIcon /> : <EditIcon />}
                            </button>
                        </div>
                        <input type="text" disabled={!userDataEditorEnabled} value={user?.name} onChange={(e) => changeUser(["name"], e.currentTarget.value)}/>
                        <input type="text" disabled={!userDataEditorEnabled} value={user?.username} onChange={(e) => changeUser(["username"], e.currentTarget.value)}/>
                        <div>
                            <div>
                                <input type="text" disabled={!userDataEditorEnabled} value={user?.company.name} onChange={(e) => changeUser(["company","name"], e.currentTarget.value)}/>
                                <input type="text" disabled={!userDataEditorEnabled} value={user?.website} onChange={(e) => changeUser(["website"], e.currentTarget.value)}/>

                            </div>
                            <div>
                                <select disabled={!userDataEditorEnabled}>
                                    <option>Contractor</option>
                                    <option>Partner</option>
                                </select>
                                <input type="text" disabled={!userDataEditorEnabled} value={user?.phone} onChange={(e) => changeUser(["phone"], e.currentTarget.value)}/>
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
                        <h2 className="subtitle">Expertise</h2>
                        <div className="input-wrapper">
                            {
                                expertises.map((e, i) => {
                                    return (
                                        <input type="text" value={e} onChange={(e) => { handleChangeExpertise(i, e.currentTarget.value) }} key={i} disabled={!userDetailsEnabled} />
                                    );
                                })
                            }
                            {userDetailsEnabled ? <button onClick={() => setExpertises(expertises.concat(""))}><AddIcon /></button> : ""}
                        </div>
                    </div>
                    <div>
                        <h2>Specialities</h2>
                        <div className="input-wrapper">
                            {
                                specialities.map((e, i) => {
                                    return (
                                        <input type="text" value={e} key={i} disabled={!userDetailsEnabled} onChange={(e) => handleChangeSpecialites(i, e.currentTarget.value)} />
                                    );
                                })
                            }
                            {userDetailsEnabled ? <button onClick={() => { setSpecialities(specialities.concat("")) }}><AddIcon /></button> : ""}
                        </div>
                    </div>

                    <div>
                        <h2>Admissions</h2>
                        <div className="input-wrapper">
                            {
                                admissions.map((e, i) => {
                                    return (
                                        <input type="text" value={e} key={i} disabled={!userDetailsEnabled} onChange={(e) => { handleChangeAdmissions(i, e.currentTarget.value) }} />
                                    );
                                })

                            }
                            {userDetailsEnabled ? <button onClick={() => setAdmissions(admissions.concat(""))}><AddIcon /></button> : ""}
                        </div>
                    </div>

                    <div>
                        <h2>Counties</h2>
                        <div className="input-wrapper">
                            {
                                counties.map((e, i) => {
                                    return (
                                        <input type="text" value={e} onChange={(e) => handleChangeCounties(i, e.currentTarget.value)} key={i} disabled={!userDetailsEnabled} />
                                    );
                                })
                            }
                            {userDetailsEnabled ? <button onClick={() => setCounties(counties.concat(""))}><AddIcon /> </button> : ""}
                        </div>
                    </div>
                </div>
                <div className="panel">
                    <h2 className="subtitle">Panel information</h2>
                    <div className="input-wrapper column">
                        <label>Hourly Fee</label>
                        <input type="text" value={hourlyFee} onChange={(e) => setHourlyFee(e.target.value)} disabled={!userDetailsEnabled} />
                    </div>
                    <div className="input-wrapper column">
                        <label> Terms &amp; condition</label>
                        <span>Monthly 10k€ retainer - see with Jeanny Smith</span>
                        <div className="blue-field">
                            {
                                userDetailsEnabled ?
                                    <input type="file" onChange={handleInputChange} /> :
                                    (
                                        !fileName ? <span>Input file</span> : <span>{fileName}</span>
                                    )
                            }
                        </div>
                    </div>
                    <div className="input-wrapper column">
                        <label><b>Service &amp; projects</b></label>
                        <span>Corporate M&amp;A and international acquisition</span>
                    </div>
                    <div className="input-wrapper column correspondants">
                        <label><b>Internal correspondants</b></label>
                        {
                            correspondents.map((c, i) => {
                                return (
                                    <div className="blue-field" key={i}>
                                        <div >
                                            <input type="text" disabled={!userDetailsEnabled} value={c} onChange={(e) => { handleChangeCorespondents(i, e.currentTarget.value) }} />
                                            <button disabled>Message</button>
                                            <button disabled>Profile</button>
                                        </div>
                                        {
                                            (userDetailsEnabled ? <button onClick={() => removeCorrespondents(i)}><CloseIcon /></button> : null)
                                        }
                                    </div>
                                )
                            })
                        }
                        {userDetailsEnabled ? <button onClick={() => setCorrespondents(correspondents.concat(""))}><AddIcon /> Add new correspondent</button> : null}
                    </div>
                </div>


                <div className="table-content">
                    <h2>Internal reviews</h2>
                    <div className="row header">
                        <span>Expertise</span>
                        <span>Entity</span>
                        <span>Location</span>
                        <span>Expertise</span>
                        <span>Date</span>
                        {userDetailsEnabled ? <span className="remove"></span> : null}
                    </div>
                    {internalReviews.map((v, i) => {

                        return (
                            <div className="row" key={i}>
                                <input type="text" value={v.expertise} disabled={!userDetailsEnabled}  onChange={(e) => {handleInternalReview(i, "expertise", e.currentTarget.value )}}/>
                                <input type="text" value={v.entity} disabled={!userDetailsEnabled} onChange={(e) => {handleInternalReview(i, "entity", e.currentTarget.value )}} />
                                <input type="text" value={v.location} disabled={!userDetailsEnabled}  onChange={(e) => {handleInternalReview(i, "location", e.currentTarget.value )}}/>
                                <input type="text" value={v.expertise2} disabled={!userDetailsEnabled}  onChange={(e) => {handleInternalReview(i, "expertise2", e.currentTarget.value )}}/>
                                <input type="date" value={v.date} disabled={!userDetailsEnabled}  onChange={(e) => {handleInternalReview(i, "date", e.currentTarget.value )}}/>
                                {userDetailsEnabled ? <button onClick={() => { removeInternalReview(i) }}><CloseIcon /></button> : null}
                            </div>
                        )
                    })}

                    {userDetailsEnabled ? <button onClick={() => setInternalReviews(internalReviews.concat(new Review()))}><AddIcon /> Add new row</button> : null}
                </div>
                <div className="table-content">
                    <h2>Fees</h2>
                    <div className="row header row-fees">
                        <span>Year</span>
                        <span>Cost center</span>
                        <span>Total amount</span>
                        <span>Law firm</span>
                        {userDetailsEnabled ? <span className="remove"></span> : null}
                    </div>

                    {fees.map((v, i) => {
                        return (
                            <div className="row row-fees" key={i}>
                                <input type="number" value={v.year}  onChange={(e) => {handleChangeFees(i, "year", e.currentTarget.value)}} disabled={!userDetailsEnabled}/>
                                <input type="text" value={v.cost} onChange={(e) => {handleChangeFees(i, "cost", e.currentTarget.value)}}  disabled={!userDetailsEnabled}/>
                                <input type="number" value={v.total}  onChange={(e) => {handleChangeFees(i, "total", e.currentTarget.value)}} disabled={!userDetailsEnabled}/>
                                <input type="text" value={v.law} onChange={(e) => {handleChangeFees(i, "law", e.currentTarget.value)}}  disabled={!userDetailsEnabled}/>
                                {userDetailsEnabled ? <button onClick={() => {removeFees(i)}}><CloseIcon /></button> : null}
                            </div>
                        )
                    })}
                    {userDetailsEnabled ? <button onClick={() => setFees(fees.concat(new Fees()))}><AddIcon /> Add new row</button> : null}
                </div>
            </div>
        </div>

    );
}


class Review {
    constructor(public expertise: string="", public entity: string="", public location: string="", public expertise2: string="", public date: string="") { }
}

class Fees {
    constructor(public year: number = 2021, public cost: string = "", public total: number = 0, public law: string = "") { }
}

export default Profile;