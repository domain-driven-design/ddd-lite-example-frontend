import {useEffect, useState} from "react";
import {Button, Descriptions, message} from "antd";
import UserService from "../services/UserService";
import AuthorizeService from "../services/AuthorizeService";

export default function User(props) {
    const [userInfo, setUserInfo] = useState({});

    function getUserInfo() {
        UserService.getMe()
            .then(function (data) {
                setUserInfo(data);
            })
            .catch(function (error) {
                message.error("获取个人信息失败");
            });
    }

    function logout() {
        AuthorizeService.logout();
        props.history.push("/login");
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <div>
            <Descriptions title="个人信息">
                <Descriptions.Item label="姓名">{userInfo.name}</Descriptions.Item>
                <Descriptions.Item label="邮箱">{userInfo.email}</Descriptions.Item>
                <Descriptions.Item label="加入时间">
                    {userInfo.createdAt}
                </Descriptions.Item>
            </Descriptions>
            <Button onClick={logout}>登出</Button>
        </div>
    );
}
