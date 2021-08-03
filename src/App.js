import "./App.css";
import "antd/dist/antd.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import User from "./components/user/User";

import BaseLayout from "./components/BaseLayout";
import Questions from "./components/question/Questions";
import Group from "./components/group/Groups";
import Question from "./components/question/Question";

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
                        <Route path="/groups" component={Group}/>
                        <Route path="/me" component={User}/>
                    </Switch>
                </BaseLayout>
            </Switch>
        </Router>
    );
}

export default App;
