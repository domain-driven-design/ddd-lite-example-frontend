import React, {useEffect, useState} from "react";
import axios from "../../common/axios";
import {Card, List, message, Pagination, Skeleton} from "antd";

import "./Groups.css";
import CreateGroup from "./CreateGroup";
import LoadMore from "../common/LoadMore";

export default function Groups() {
    const size = 10;
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState([]);
    const [isLast, setIsLast] = useState(false);


    useEffect(() => {
        getGroups(page, size);
    }, [page]);

    function getGroups(page, size) {
        axios
            .get("/groups", {
                params: {
                    page,
                    size,
                    sort: "createdAt,desc",
                },
            })
            .then(function (data) {
                setTotal(total.concat(data.content));
                setIsLast(data.last);
                setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);
            });
    }

    function onLoadMore() {
        setPage(page + 1);
    }

    function OnCreateGroupSuccess() {
        setPage(0);
        getGroups(page, size);
    }

    return (
        <div>
            <CreateGroup OnCreateGroupSuccess={OnCreateGroupSuccess}/>
            <List
                loading={loading}
                itemLayout="horizontal"
                loadMore={<LoadMore notMore={isLast} loading={loading} onLoadMore={onLoadMore}/>}
                dataSource={total}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <a href={`/groups/${item.id}`} target="view_window">查看详情</a>
                        ]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                title={
                                    <a
                                        href={`/groups/${item.id}`}
                                        target="view_window">
                                        {item.name}
                                    </a>
                                }
                                description={item.description}
                            />
                            <div>已有{item.members.length}位成员</div>
                        </Skeleton>
                    </List.Item>
                )}
            />
        </div>
    );
}
