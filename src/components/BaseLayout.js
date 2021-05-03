import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import "./BaseLayout.css";

const { Header, Content } = Layout;

export default function BaseLayout(props) {
  const location = useLocation();  

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Link to="/">首页</Link>
            </Menu.Item>
          <Menu.Item key="/articles">
            <Link to="/articles">文章</Link>
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
