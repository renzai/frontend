import './App.css';
import 'chartjs-plugin-colorschemes'
import {BrowserRouter as Router, Switch} from "react-router-dom";
import Home from "./component/Home";

function App() {
    return (
        <Router>
            <Switch path="/">
                <Home/>
            </Switch>
        </Router>
    );
}

export default App;
