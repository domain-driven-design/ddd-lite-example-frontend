import React, {useEffect, useState} from "react";
import {List, Skeleton} from "antd";

import "./Groups.css";
import CreateGroup from "../components/group/CreateGroup";
import LoadMore from "../components/common/LoadMore";
import GroupService from "../services/GroupService";

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
        GroupService.getGroups(page, size)
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
            <CreateGroup OnCreateGroupSuccess={OnCreateGroupSuccess} createGroup={GroupService.createGroup}/>
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
