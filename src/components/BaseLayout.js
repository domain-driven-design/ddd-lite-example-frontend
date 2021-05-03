import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import "./BaseLayout.css";

const { Header, Content } = Layout;

export default function BaseLayout(props) {
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" selectedKeys={props.location.pathname}>
          <Menu.Item key="/">
            <Link to="/">首页</Link>
          </Menu.Item>
          <Menu.Item key="/articles">
            <Link to="/articles">发现</Link>
          </Menu.Item>
          <Menu.Item key="/articles/new">
            <Link to="/articles/new">创作</Link>
          </Menu.Item>
          <Menu.Item key="/user">
            <Link to="/user">个人中心</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <div className="site-layout-content">{props.children}</div>
      </Content>
    </Layout>
  );
}
