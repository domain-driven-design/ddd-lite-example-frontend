import React, {useEffect, useState} from "react";
import axios from "../../common/axios";
import {message, Pagination} from "antd";

import "./Answers.css";
import UpdateAnswer from "./UpdateAnswer";

export default function Answers(props) {
    const size = 10;
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const userId = window.localStorage.userId;

    useEffect(() => {
        getAnswers(page, size);
    }, [page]);

    function getAnswers(page, size) {
        axios
            .get(`/groups/${props.groupId}/questions/${props.questionId}/answers`, {
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
                <div key={item.id} className="answer-item">
                    <div>
                        <p>{item.content}</p>
                        <p>{item.createdAt}</p>
                    </div>
                    {
                        item.createdBy === userId &&
                        <UpdateAnswer
                            groupId={props.groupId}
                            questionId={props.questionId}
                            answerInfo={item}
                            OnUpdateAnswerSuccess={() => getAnswers(page, size)}
                        />
                    }

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
    );
}
