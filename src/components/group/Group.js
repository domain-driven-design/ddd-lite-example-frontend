import {Button, message} from "antd";
import React, {useEffect, useState} from "react"
import axios from "../../common/axios";
import Questions from "../question/Questions";

import "./Group.css";

export default function Group(props) {
    const [groupInfo, setGroupInfo] = useState({});
    const userId = window.localStorage.userId;
    const id = props.match.params.id;

    function getGroup(id) {
        axios.get(`/groups/${id}`)
            .then(function (data) {
                setGroupInfo(data);
            })
            .catch(function (error) {
                message.error("获取圈子详情失败");
            });
    }

    useEffect(() => {
        getGroup(id);
    }, []);

    function joinGroup() {
        axios
            .post(`/groups/${id}/members`)
            .then(function (response) {
                message.success("加入成功");
                getGroup(id);
            })
            .catch(function (error) {
                message.error("加入失败");
            });
    }

    function exitGroup() {
        axios
            .delete(`/groups/${id}/members/me`)
            .then(function (response) {
                message.success("退出成功");
                getGroup(id);
            })
            .catch(function (error) {
                message.error("退出失败");
            });
    }

    return (
        <div>
            <div className="group-heater">
                <h2>{groupInfo.name}</h2>
                {
                    groupInfo.members?.find(member => member.userId === userId)
                        ? <Button type="primary" onClick={() => exitGroup()}>退出圈子</Button>
                        : <Button type="primary" onClick={() => joinGroup()}>加入圈子</Button>
                }
            </div>
            <p>创建时间：{groupInfo.createdAt}，创建者：{groupInfo.creator?.name}，共有{groupInfo.members?.length}位成员</p>
            <p>描述：{groupInfo.description}</p>
            <Questions groupId={id}></Questions>
        </div>
    );
}
