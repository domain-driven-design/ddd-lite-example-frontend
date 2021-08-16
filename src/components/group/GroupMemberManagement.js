import React, {useEffect, useState} from "react"
import {Button, Card, message, Pagination} from "antd";
import axios from "../../common/axios";

import "./GroupMemberManagement.css"

export default function GroupMemberManagement(props) {
    const size = 10;
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const roleMap = {
        "NORMAL": "普通成员",
        "OWNER": "所有者"
    }

    useEffect(() => {
        getGroups(page, size);
    }, [page]);

    function getGroups(page, size) {
        axios
            .get(`/groups/${props.groupId}/members`, {
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

    function onChange(page) {
        setPage(page);
    }

    return (
        <div>
            {content.map((item) => (
                <div className="group-member-management-item">
                    <div className="group-member-management-item-name">{item.name}</div>
                    <div>加入时间：{item.createdAt}</div>
                    <div className="group-member-management-item-role">{roleMap[item.role]}</div>
                    <Button type="primary" danger>移除</Button>
                </div>
            ))}

            <Pagination
                className="pagination"
                defaultCurrent={page}
                defaultPageSize={size}
                total={total}
                onChange={onChange}
            />
        </div>
    )
}