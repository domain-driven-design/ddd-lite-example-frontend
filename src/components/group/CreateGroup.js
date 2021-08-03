import React from "react";
import {Button, Form, Input, message, Modal} from "antd";

import axios from "../../common/axios";

export default function CreateGroup(props) {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);

    const [form] = Form.useForm();

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            setConfirmLoading(true);

            axios
                .post(  `/groups`, values)
                .then(function (response) {
                    message.success("发布成功");
                    setConfirmLoading(false);
                    setVisible(false);
                    form.resetFields();
                    props.OnCreateGroupSuccess();
                })
                .catch(function (error) {
                    message.error("发布失败");
                    setConfirmLoading(false);
                    setVisible(false);
                });
        })



    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                创建圈子
            </Button>
            <Modal
                title="创建圈子"
                visible={visible}
                onOk={handleOk}
                okText="发布"
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                cancelText="取消"
            >
                <Form name="article" form={form}>
                    <Form.Item
                        label="名称"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "名称必填",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="描述"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "描述必填",
                            },
                        ]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
