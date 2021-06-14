
import { useParams } from 'react-router';

interface IWorkspaceParams {
    id: string;
};
const Workspace = () => {
    const { id } = useParams<IWorkspaceParams>();
    console.log("THIS IS MY ID: " + id);
    return (
        <div className="workspace">

        </div>
    )
}



export default Workspace;