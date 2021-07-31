import {Link} from "react-router-dom";
import {Layout, Menu} from "antd";
import "./BaseLayout.css";

const {Header, Content} = Layout;

export default function BaseLayout(props) {
    return (
        <Layout>
            <Header>
                <span className="logo" >问答平台</span>
                <Menu theme="dark" mode="horizontal" selectedKeys={props.location.pathname}>
                    <Menu.Item key="/questions">
                        <Link to="/questions">问题</Link>
                    </Menu.Item>
                    <Menu.Item key="/groups">
                        <Link to="/groups">圈子</Link>
                    </Menu.Item>
                    <Menu.Item key="/me">
                        <Link to="/me">个人中心</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content>
                <div className="site-layout-content">{props.children}</div>
            </Content>
        </Layout>
    );
}
