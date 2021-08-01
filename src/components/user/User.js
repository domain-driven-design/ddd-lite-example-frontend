import { useState, useEffect } from "react";
import { Descriptions, message, Button } from "antd";
import axios from "../../common/axios";

export default function User(props) {
  const [userInfo, setUserInfo] = useState({});

  function getUserInfo() {
    axios
      .get("/users/me")
      .then(function (data) {
        setUserInfo(data);
      })
      .catch(function (error) {
        message.error("获取个人信息失败");
      });
  }

  function logout() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");
    axios.delete("/authorizes");
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
