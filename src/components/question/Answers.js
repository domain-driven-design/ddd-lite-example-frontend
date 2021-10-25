import React, {useEffect, useState} from "react";
import axios from "../../services/axios";
import {List, message, Pagination, Skeleton} from "antd";

import "./Answers.css";
import UpdateAnswer from "./UpdateAnswer";
import LoadMore from "../common/LoadMore";

export default function Answers(props) {
    const size = 10;
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState([]);
    const [isLast, setIsLast] = useState(false);

    const userId = window.localStorage.userId;

    useEffect(() => {
        getAnswers(page, size);
    }, [page]);

    function getAnswers(page, size) {
        axios
            .get(`/questions/${props.questionId}/answers`, {
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

    return (
        <div>
            <List
                loading={loading}
                itemLayout="horizontal"
                loadMore={<LoadMore notMore={isLast} loading={loading} onLoadMore={onLoadMore}/>}
                dataSource={total}
                renderItem={item => (
                    <List.Item
                        actions={[
                            item.createdBy === userId &&
                            <UpdateAnswer
                                groupId={props.groupId}
                                questionId={props.questionId}
                                answerInfo={item}
                                OnUpdateAnswerSuccess={() => getAnswers(page, size)}
                            />
                        ]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                title={item.creator?.name}
                                description={item.content}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
        </div>
    );
}
