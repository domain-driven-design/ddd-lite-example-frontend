import { useState, useEffect } from "react";
import { Descriptions, message } from "antd";
import axios from "axios";

export default function User() {
  const [userInfo, setUserInfo] = useState({});

  function getUserInfo() {
    axios
      .get("/users/me", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        setUserInfo(response.data);
      })
      .catch(function (error) {
        message.error("获取个人信息失败");
      });
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
    </div>
  );
}
