import {message} from "antd";
import React, {useEffect, useState} from "react"
import axios from "../../common/axios";

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
    }, [props.match.params.id]);

    return (
        <div>
            <h2>{groupInfo.name}</h2>
            <p>{groupInfo.description}</p>
        </div>
    );
}
