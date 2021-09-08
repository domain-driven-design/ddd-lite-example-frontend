import React from "react";
import {message, Modal, Switch} from "antd";
import axios from "../../common/axios";

export default function UpdateQuestionStatus(props) {
    const [openQuestionModalVisible, setOpenQuestionModalVisible] = React.useState(false);
    const [closeQuestionModalVisible, setCloseQuestionModalVisible] = React.useState(false);

    function handleOpenQuestion() {
        axios
            .put(`/questions/${props.questionInfo.id}/status`, {status: "OPENED"})
            .then(function (response) {
                message.success("修改成功");
                setOpenQuestionModalVisible(false);
            })
            .catch(function (error) {
                message.error("修改失败");
                setOpenQuestionModalVisible(false);
            });
    }

    function handleCloseQuestion() {
        axios
            .put(`/questions/${props.questionInfo.id}/status`, {status: "CLOSED"})
            .then(function (response) {
                message.success("修改成功");
                setCloseQuestionModalVisible(false);
            })
            .catch(function (error) {
                message.error("修改失败");
                setCloseQuestionModalVisible(false);
            });
    }

    function handleStatusChange(checked) {
        if (checked) {
            setOpenQuestionModalVisible(true)
        } else {
            setCloseQuestionModalVisible(true)
        }
    }

    return (
        <div>
            <Switch
                checkedChildren="打开"
                unCheckedChildren="关闭"
                checked={props.questionInfo.status === 'OPENED'}
                onChange={handleStatusChange}
            />
            <Modal title="打开问题" visible={openQuestionModalVisible} onOk={() => handleOpenQuestion()}>
                <p>打开问题后，恢复对其他用户可见，恢复回答</p>
            </Modal>

            <Modal title="关闭问题" visible={closeQuestionModalVisible} onOk={() => handleCloseQuestion()}>
                <p>关闭问题后，对其他用户不可见，不可进行回答</p>
            </Modal>
        </div>
    );
}
