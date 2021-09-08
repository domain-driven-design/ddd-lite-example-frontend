import React from "react";
import {Button, Form, Input, message, Modal} from "antd";

import axios from "../../common/axios";

export default function UpdateAnswer(props) {
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
                .put(`/questions/${props.questionId}/answers/${props.answerInfo.id}`, values)
                .then(function (response) {
                    message.success("修改成功");
                    setConfirmLoading(false);
                    setVisible(false);
                    form.resetFields();
                    props.OnUpdateAnswerSuccess();
                })
                .catch(function (error) {
                    message.error("修改失败");
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
                修改回答
            </Button>
            <Modal
                title="修改回答"
                visible={visible}
                onOk={handleOk}
                okText="发布"
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                cancelText="取消"
            >
                <h2>{props.questionTitle}</h2>
                <p>{props.questionDescription}</p>
                <Form form={form} initialValues={props.answerInfo}>
                    <Form.Item
                        name="content"
                        rules={[
                            {
                                required: true,
                                message: "回答内容必填",
                            },
                        ]}
                    >
                        <Input.TextArea rows={10}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
