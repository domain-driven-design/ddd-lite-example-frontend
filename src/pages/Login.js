import React from "react";
import {Button, Form, Input, message} from "antd";

import "./Login.css";
import AuthorizeService from "../services/AuthorizeService";

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
        AuthorizeService.login(values.email, values.password)
            .then(function (data) {
                message.success("登录成功");
                window.localStorage["userId"] = data.userId;
                window.localStorage["token"] = data.token;
                props.history.push("/");
            })
            .catch(function () {
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
                        <Input/>
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
                        <Input.Password/>
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
