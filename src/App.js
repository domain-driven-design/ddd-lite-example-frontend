import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import User from "./components/User";
import Articles from "./components/Articles";

import { Layout, Menu } from "antd";

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["home"]}>
            <Menu.Item key="home">
              <Link to="/">首页</Link>
            </Menu.Item>
            <Menu.Item key="articles">
              <Link to="/articles">文章</Link>
            </Menu.Item>
            <Menu.Item key="user">
              <Link to="/user">个人中心</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          <div className="site-layout-content">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/user" component={User} />
              <Route path="/articles" component={Articles} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
