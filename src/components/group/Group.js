import {message} from "antd";
import React, {useEffect, useState} from "react"
import axios from "../../common/axios";
import Questions from "../question/Questions";

export default function Group(props) {
    const [groupInfo, setGroupInfo] = useState({});

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
        getGroup(props.match.params.id);
    }, []);

    return (
        <div>
            <h2>{groupInfo.name}</h2>
            <p>创建时间：{groupInfo.createdAt}，创建者：{groupInfo.creator?.name}，共有{groupInfo.members?.length}位成员</p>
            <p>{groupInfo.description}</p>
            <Questions groupId={props.match.params.id}></Questions>
        </div>
    );
}
