import CommittersChart from "./CommittersChart";
import CommitsChart from "./CommitsChart";
import Search from "./Search";
import {useState} from "react";
import {useLocation} from 'react-router-dom';

const Home = () => {

    const [repository, setRepository] = useState(useLocation().pathname.substr(1));

    return (
        <div className="grid-container">
            <div className="flex-column">
                <Search setRepository={setRepository}/>
            </div>
            <div className="flex-column">
                <h3>Repository: {repository}</h3>
                <CommittersChart repository={repository}/>
                <CommitsChart repository={repository}/>
            </div>
        </div>
    )
}

export {Home as default}
