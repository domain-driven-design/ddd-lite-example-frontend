import React, {useEffect, useState} from "react";
import axios from "../../common/axios";
import {Card, message, Pagination} from "antd";

import "./Groups.css";
import CreateGroup from "./CreateGroup";

export default function Groups() {
    const size = 10;
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getGroups(page, size);
    }, [page]);

    function getGroups(page, size) {
        axios
            .get("/groups", {
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

    function OnCreateGroupSuccess() {
        setPage(0);
        getGroups(page, size);
    }

    return (
        <div>
            <CreateGroup OnCreateGroupSuccess={OnCreateGroupSuccess}></CreateGroup>
            {content.map((item) => (
                <Card title={item.name} key={item.id} className="group-item">
                    <p className="group-content">{item.description}</p>
                    <p>已有{item.members.length}位成员</p>
                    <p>{item.createdAt}</p>
                    <a href={`/groups/${item.id}`} target="view_window">查看详情</a>
                </Card>
            ))}
            <Pagination
                className="pagination"
                defaultCurrent={page}
                defaultPageSize={size}
                total={total}
                onChange={onChange}
            />
        </div>
    );
}
