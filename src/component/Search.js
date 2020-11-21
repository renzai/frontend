import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Search = ({setRepository}) => {

    const [searchResult, setSearchResult] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

    const search = () => {
        fetch(`http://localhost:8080/api/repositories?query=${searchQuery}`)
            .then(response => response.json())
            .then(setSearchResult)
    }

    useEffect(() => {
            setSearchResult([])
            if (!searchQuery || searchQuery.length < 4) return;
            const timeout = setTimeout(search, 2000)
            return () => clearTimeout(timeout)
        }
        , [searchQuery])

    return (
        <div className="search-container">
            <div className="flex">
                <input value={searchQuery} className="flex-1"
                       onKeyUp={e => (e.key === 'Enter' || e.keyCode === 13) && search()}
                       onChange={(e) => setSearchQuery(e.target.value)}/>
                <button onClick={search}>Search</button>
            </div>
            {searchResult.map(result =>
                <Link key={result.full_name} to={`/${result.full_name}`} className="s">
                    <div onClick={() => setRepository(result.full_name)}
                         className="search-result">
                        <h4>{result.full_name}</h4>
                        <p>{result.description}</p>
                    </div>
                </Link>
            )}
        </div>
    )
}

export {Search as default}
