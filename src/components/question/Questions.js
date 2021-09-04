import React, {useEffect, useState} from "react";
import axios from "../../common/axios";
import {List, Skeleton} from "antd";

import "./Questions.css";
import CreateQuestion from "./CreateQuestion";
import LoadMore from "../common/LoadMore";

import {withRouter} from 'react-router-dom';

function Questions(props) {
    const size = 10;
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState([]);
    const [isLast, setIsLast] = useState(false);

    useEffect(() => {
        getQuestions(page, size);
    }, [page]);

    function getQuestions(page, size) {
        setLoading(true);
        axios
            .get(`/groups/${props.groupId}/questions`, {
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

    function onCreateQuestionSuccess(questionId) {
        props.history.push(`/groups/${props.groupId}/questions/${questionId}`);
    }

    function onLoadMore() {
        setPage(page + 1);
    }

    return (

        <div>
            <div className="questions-header">
                <div/>
                <CreateQuestion groupId={props.groupId} onCreateQuestionSuccess={onCreateQuestionSuccess}/>
            </div>
            <List
                loading={loading}
                itemLayout="horizontal"
                loadMore={<LoadMore notMore={isLast} loading={loading} onLoadMore={onLoadMore}/>}
                dataSource={total}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <a
                                href={`/groups/${props.groupId}/questions/${item.id}`}
                                target="view_window">
                                查看详情
                            </a>
                        ]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                title={
                                    <a
                                        href={`/groups/${props.groupId}/questions/${item.id}`}
                                        target="view_window">
                                        {item.title}
                                    </a>
                                }
                                description={item.description}
                            />
                            <div>{item.createdAt}</div>
                        </Skeleton>
                    </List.Item>
                )}
            />
        </div>
    );
}

export default withRouter(Questions);
