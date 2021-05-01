import React from 'react';
import { FC } from 'react';
import Workspace from '../../models/workspace';
import "../../styles/workspace.scss";

interface IWorkspaceComponentProps {
    workspace: Workspace;
}


// style={{backgroundImage: `url(../assets/images/${workspace.backgroundImage})
const WorkspaceComponent: FC<IWorkspaceComponentProps> = ({ workspace }) => {
    return (
        <div className="workspace-component">
            <div className="background">

            </div>
            <div className="front-img-wrapper">

            </div>
        </div>
    );
}



export default WorkspaceComponent;