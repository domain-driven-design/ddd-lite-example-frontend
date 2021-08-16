import React, {useState} from "react"

import "./GroupManagement.css";
import {Menu} from "antd";
import GroupMemberManagement from "./GroupMemberManagement";

export default function GroupManagement(props) {
    const [currentMenuKey, setCurrentMenuKey] = useState("member");
    const id = props.match.params.id;

    function handleMenuClick(e) {
        setCurrentMenuKey(e.key)
    }

    function showManagementContent(key) {
        switch (key) {
            case "member":
                return <GroupMemberManagement groupId={id}></GroupMemberManagement>;
            case "question":
                return <p>question</p>;
            case "answer":
                return <p>answer</p>;
            case "setting":
                return <p>setting</p>;
        }
    }

    return (
        <div className="group-management">
            <Menu className="group-management-menu" onClick={handleMenuClick} selectedKeys={[currentMenuKey]}
                  mode="vertical">
                <Menu.Item key="member">
                    成员管理
                </Menu.Item>
                <Menu.Item key="question">
                    问题管理
                </Menu.Item>
                <Menu.Item key="answer">
                    回答管理
                </Menu.Item>
                <Menu.Item key="setting">
                    圈子设置
                </Menu.Item>
            </Menu>
            <div className="group-management-content">
                {showManagementContent(currentMenuKey)}
            </div>
        </div>
    );
}
