import React, {useEffect, useState} from "react";
import axios from "../../common/axios";
import {Card, message, Pagination} from "antd";

import "./Questions.css";
import CreateQuestions from "./CreateQuestion";
import CreateAnswer from "./CreateAnswer";

export default function Questions() {
    const size = 10;
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getQuestions(page, size);
    }, [page]);

    function getQuestions(page, size) {
        axios
            .get("/groups/default/questions", {
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

    function OnCreateQuestionSuccess() {
        setPage(0);
        getQuestions(page, size);
    }

    return (
        <div>
            <CreateQuestions groupId={"default"} OnCreateQuestionSuccess={OnCreateQuestionSuccess}></CreateQuestions>
            {content.map((item) => (
                <Card title={item.title} key={item.id} className="question-item">
                    <p className="question-content">{item.description}</p>
                    <a href={`/questions/${item.id}`} target="view_window">查看详情</a>
                    <div>
                        <p>{item.createdAt}</p>
                        <CreateAnswer
                            groupId={"default"}
                            questionId={item.id}
                            questionTitle={item.title}
                            questionDescription={item.description}
                        >
                        </CreateAnswer>
                    </div>
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
