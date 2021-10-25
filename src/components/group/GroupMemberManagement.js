import React, {useEffect, useState} from "react"
import {Button, message, Pagination, Select} from "antd";
import axios from "../../services/axios";

import "./GroupMemberManagement.css"
import {Option} from "antd/es/mentions";

export default function GroupMemberManagement(props) {
    const size = 10;
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getManageGroupMembers(page, size);
    }, [page]);

    function getManageGroupMembers(page, size) {
        axios
            .get(`/groups/${props.groupId}/members/management`, {
                params: {
                    page: page - 1,
                    size,
                    sort: "createdAt,desc",
                },
            })
            .then(function (data) {
                setContent(data.content);
                setTotal(data.totalElements);
            })
            .catch(function (error) {
                message.error(error);
            });
    }

    function onPageChange(page) {
        setPage(page);
    }

    function handleRoleChange(userId, role) {
        axios
            .put(`/groups/${props.groupId}/members/${userId}`, {role})
            .then(function (response) {
                message.success("修改成功");
            })
            .catch(function (error) {
                message.error("修改失败");
            });
    }

    function handleMemberRemove(userId) {
        axios
            .delete(`/groups/${props.groupId}/members/${userId}`)
            .then(function (response) {
                message.success("移除成功");
                getManageGroupMembers(page, size);
            })
            .catch(function (error) {
                message.error("移除失败");
            });
    }

    return (
        <div>
            {content.map((item) => (
                <div className="group-member-management-item">
                    <div className="group-member-management-item-name">{item.name}</div>
                    <div>加入时间：{item.createdAt}</div>
                    <Select defaultValue={item.role}
                            style={{width: 120}}
                            onChange={(value) => handleRoleChange(item.userId, value)}
                    >
                        <Option value="NORMAL">成员</Option>
                        <Option value="ADMIN">管理员</Option>
                    </Select>
                    <Button type="primary"
                            danger
                            onClick={() => handleMemberRemove(item.userId)}
                    >
                        移除
                    </Button>
                </div>
            ))}

            <Pagination
                className="pagination"
                defaultCurrent={page}
                defaultPageSize={size}
                total={total}
                onChange={onPageChange}
            />
        </div>
    )
}