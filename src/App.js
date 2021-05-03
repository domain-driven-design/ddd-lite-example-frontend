import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import User from "./components/User";
import Article from "./components/Article";
import Articles from "./components/Articles";

import BaseLayout from "./components/BaseLayout";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <BaseLayout>
          <Switch>
            <Route path="/user" component={User} />
            <Route path="/articles" component={Articles} />
            <Route path="/article" component={Article} />
            <Route path="/" component={Home} />
          </Switch>
        </BaseLayout>
      </Switch>
    </Router>
  );
}

export default App;
