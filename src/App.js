import "./App.css";
import "antd/dist/antd.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import User from "./components/user/User";

import BaseLayout from "./components/BaseLayout";
import Questions from "./components/question/Questions";
import Groups from "./components/group/Groups";
import Question from "./components/question/Question";
import Group from "./components/group/Group";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <BaseLayout>
                    <Switch>
                        <Route path="/user" component={User}/>
                        <Route path="/questions/:id" component={Question}/>
                        <Route path="/questions" component={Questions}/>
                        <Route path="/groups/:id" component={Group}/>
                        <Route path="/groups" component={Groups}/>
                        <Route path="/me" component={User}/>
                    </Switch>
                </BaseLayout>
            </Switch>
        </Router>
    );
}

export default App;
