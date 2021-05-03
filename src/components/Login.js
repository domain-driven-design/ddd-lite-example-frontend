import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "../common/axios";

import "./Login.css";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function Login(props) {
  const onFinish = (values) => {
    axios
      .post("/authorizes", values)
      .then(function (data) {
        message.success("登录成功");
        window.localStorage["userId"] = data.userId;
        window.localStorage["token"] = data.token;
        props.history.push("/");
      })
      .catch(function (error) {
        message.error("邮箱或密码错误");
      });
  };

  return (
    <div>
      <h1 className="login-title">登录</h1>
      <div className="login-form">
        <Form {...layout} name="login" onFinish={onFinish}>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              {
                required: true,
                message: "邮箱必填",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: "密码必填",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <a className="register-link" href="/register">前往注册</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
