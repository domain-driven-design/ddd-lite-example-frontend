import React, {useEffect, useState} from "react"

import "./GroupMemberManagement.css"
import axios from "../../common/axios";
import {Button, message, Select} from "antd";

export default function GroupSetting(props) {
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState();

    useEffect(() => {
        getManageGroupMembers();
    }, []);

    // TODO 暂时使用较大size数加载所有，后期优化
    function getManageGroupMembers() {
        axios
            .get(`/groups/${props.groupId}/members/management`, {
                params: {
                    page: 0,
                    size: 999,
                    sort: "createdAt,desc",
                },
            })
            .then(function (data) {
                setMembers(data.content);
            })
            .catch(function (error) {
                message.error(error);
            });
    }

    function handleMemberSelectChange(value) {
        setSelectedMember(value);
    }

    function handover() {
        axios
            .put(`/groups/${props.groupId}/owner`, {userId: selectedMember})
            .then(function (response) {
                message.success("移交成功");
                window.location.reload();
            })
            .catch(function (error) {
                message.error("移交失败");
            });
    }

    return (
        <div>
            <div>

                <h3>圈子基本信息修改</h3>
                <p>占位</p>
            </div>
            <div>
                <h3>移交</h3>
                <Select style={{width: 120}} onChange={handleMemberSelectChange}>
                    {members.map(member => (
                        <Select.Option value={member.userId}>{member.name}</Select.Option>
                    ))}
                </Select>
                <Button type="primary" onClick={() => handover()}>移交</Button>
            </div>
        </div>
    )
}