import React, {useEffect, useState} from "react"

import "./GroupMemberManagement.css"
import axios from "../../services/axios";
import {Button, Divider, Form, Input, message, Select} from "antd";

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

    const updateGroup = (values) => {
        axios
            .put(`/groups/${props.groupId}`, values)
            .then(function (data) {
                message.success("修改成功");
            })
            .catch(function (error) {
                message.error("修改失败");
            });
    }

    return (
        <div>
            <div>
                <h3>圈子基本信息</h3>
                <Form onFinish={updateGroup} initialValues={props.groupInfo}>
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
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            提交修改
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <Divider/>
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