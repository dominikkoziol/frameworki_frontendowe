

import { useParams } from 'react-router';
import './workspace.scss'
import bgImage from '../../assets/images/fun.jpg';
import { useState } from 'react';
import { useEffect } from 'react';

import Icon from '@material-ui/core/Icon'
import ResumeComponent from '../../components/resume/resume.component';

import building from '../../assets/images/building.png';
import share from '../../assets/images/workspace_share.png';
import calendar from '../../assets/images/calendar.png';
interface IWorkspaceParams {
    id: string;
};
const Workspace = () => {
    const workspaces: Works[] = [
        {
            id: 1,
            name: "Client Contract",
            icon: "receipt"
        },
        {
            id: 2,
            name: "Supplier Contract",
            icon: "assignment"
        },
        {
            id: 3,
            name: "Corporate",
            icon: "home"
        }
    ]
    const { id } = useParams<IWorkspaceParams>();
    // const workspace = workspaces[parseInt(id)];

    const [workspace, setWorkspace] = useState<Works>();
    useEffect(() => {
        const work = workspaces.find(q => q.id.toString() === id)
        setWorkspace(work);
    }, [id]);
    return (
        <div className="workspace">
            <div className="header">
                <div className="header-image">
                    <img src={bgImage} alt="bg" />
                </div>
                <div className="header-content">
                    <div className="icon-wrapper">
                        <Icon>{workspace?.icon}</Icon>
                    </div>
                    <div className="content">
                        <h3>{workspace?.name}</h3>
                        <p>Vivamus rutrum gravida scelerisque. Maecenas feugiat placerat enim vel dictum. Integer maximus, arcu ac varius elementum, lorem nulla mattis tortor, ac sollicitudin mauris lectus sed lorem. </p>
                    </div>
                </div>


            </div>
            <div className="body">
                <div className="top">
                    <h3>Start working on what corporate matters</h3>
                    <div className="content">
                        <div>
                            <div className="bg-img" style={{
                                backgroundImage: `url(${building})`
                            }}></div>
                            <div><img src={building} alt="home" /></div>
                            <p>Explore your <strong>enities</strong></p>
                            <p>take a few minutes to look at the most important elements and specifities of your entities</p>
                        </div>
                        <div>
                            <div className="bg-img" style={{
                                backgroundImage: `url(${share})`
                            }}></div>
                            <div><img src={share} alt="home" /></div>
                            <p>Structure the <strong>ownership</strong></p>
                            <p>Get a clear view ownership by looking at the relations between individual and entities</p>
                        </div>
                        <div>
                            <div className="bg-img" style={{
                                backgroundImage: `url(${calendar})`
                            }}></div>
                            <div><img src={calendar} alt="home" /></div>
                            <p>Define the <strong>calendar</strong></p>
                            <p>Prepare future events by creating detailed plans around the life of your entity</p>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <h3>Resume your work</h3>
                    <ResumeComponent userId={1} />
                </div>
            </div>
        </div>
    )
}


class Works {
    id!: number;
    name!: string;
    icon!: string;
}

export default Workspace;