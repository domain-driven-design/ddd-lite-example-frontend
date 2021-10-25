import React from "react";
import {Button, Form, Input, message, Modal} from "antd";

import axios from "../../services/axios";

export default function CreateQuestion(props) {
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
                .post(`/questions`, values)
                .then(function (response) {
                    setConfirmLoading(false);
                    setVisible(false);
                    form.resetFields();
                    props.onCreateQuestionSuccess(response.id);
                    message.success("发布成功");
                })
                .catch(function (error) {
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
                提问
            </Button>
            <Modal
                title="创建问题"
                visible={visible}
                onOk={handleOk}
                okText="发布"
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                cancelText="取消"
            >
                <Form name="article" form={form}>
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: "标题必填",
                            },
                        ]}
                    >
                        <Input/>
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
                        <Input.TextArea rows={4}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
