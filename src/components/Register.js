import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "../common/axios";

import "./Register.css";

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

export default function Register(props) {
  const onFinish = (values) => {
    axios
      .post("/users", values)
      .then(function (response) {
        message.success("注册成功");
        props.history.push("/login");
      })
      .catch(function (error) {
        message.error("注册失败");
      });
  };

  return (
    <div>
      <h1 className="register-title">注册</h1>
      <div className="register-form">
        <Form {...layout} name="register" onFinish={onFinish}>
          <Form.Item
            label="姓名"
            name="name"
            rules={[
              {
                required: true,
                message: "姓名必填",
              },
            ]}
          >
            <Input />
          </Form.Item>

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
            <a className="login-link" href="/login">前往登录</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
