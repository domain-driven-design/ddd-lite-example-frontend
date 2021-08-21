import React, {useEffect, useState} from "react"

import "./GroupManagement.css";
import {Menu, message} from "antd";
import GroupMemberManagement from "./GroupMemberManagement";
import QuestionManagement from "../question/QuestionManagement";
import axios from "../../common/axios";

export default function GroupManagement(props) {
    const [groupInfo, setGroupInfo] = useState({});
    const [currentMember, setCurrentMember] = useState({});
    const [currentMenuKey, setCurrentMenuKey] = useState();
    const userId = window.localStorage.userId;
    const id = props.match.params.id;

    useEffect(() => {
        getGroup(id);
    }, []);


    function getGroup(id) {
        axios.get(`/groups/${id}`)
            .then(function (data) {
                setGroupInfo(data);
                const member = data.members?.find(member => member.userId === userId, {});
                setCurrentMember(member);
                setCurrentMenuKey(member.role === "OWNER" ? "member" : "question")
            })
            .catch(function (error) {
                message.error("获取圈子详情失败");
            });
    }

    function handleMenuClick(e) {
        setCurrentMenuKey(e.key)
    }

    function showManagementContent(key) {
        switch (key) {
            case "member":
                return <GroupMemberManagement groupId={id}></GroupMemberManagement>;
            case "question":
                return <QuestionManagement groupId={id}></QuestionManagement>;
            case "answer":
                return <p>answer</p>;
            case "setting":
                return <p>setting</p>;
        }
    }

    return (
        <div>
            <a href={`/groups/${id}`}><h2>{groupInfo.name}</h2></a>
            <div className="group-management">
                <Menu className="group-management-menu" onClick={handleMenuClick} selectedKeys={[currentMenuKey]}
                      mode="vertical">
                    <Menu.Item disabled={currentMember.role !== "OWNER"} key="member">
                        成员管理
                    </Menu.Item>
                    <Menu.Item key="question">
                        问题管理
                    </Menu.Item>
                    <Menu.Item key="answer">
                        回答管理
                    </Menu.Item>
                    <Menu.Item disabled={currentMember.role !== "OWNER"} key="setting">
                        圈子设置
                    </Menu.Item>
                </Menu>
                <div className="group-management-content">
                    {showManagementContent(currentMenuKey)}
                </div>
            </div>
        </div>
    );
}
