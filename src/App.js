import "./App.css";
import "antd/dist/antd.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import User from "./components/User";

import BaseLayout from "./components/BaseLayout";
import Question from "./components/Question";
import Group from "./components/Group";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <BaseLayout>
                    <Switch>
                        <Route path="/user" component={User}/>
                        <Route path="/questions" component={Question}/>
                        <Route path="/groups" component={Group}/>
                        <Route path="/me" component={User}/>
                    </Switch>
                </BaseLayout>
            </Switch>
        </Router>
    );
}

export default App;
