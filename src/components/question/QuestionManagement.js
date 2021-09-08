import React, {useEffect, useState} from "react"
import {Button, Col, message, Pagination, Row} from "antd";
import axios from "../../common/axios";

import "./QuestionManagement.css"

export default function QuestionManagement(props) {
    const size = 10;
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getManagementQuestions(page, size);
    }, [page]);

    function getManagementQuestions(page, size) {
        axios
            .get(`/questions/management`, {
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

    function handleDeleteQuestion(questionId) {
        axios
            .delete(`/groups/${props.groupId}/questions/${questionId}`)
            .then(function (data) {
                message.success("删除成功");
                getManagementQuestions(page, size);
            })
            .catch(function (error) {
                message.error("删除失败");
            });
    }

    return (
        <div>
            {content.map((item) => (
                <div className="question-management-item">
                    <Row>
                        <Col span={8}>{item.title}</Col>
                        <Col span={8}>创建时间：{item.createdAt}</Col>
                        <Col span={6}>创建者：{item.creator.name}</Col>
                        <Col span={2}>
                            <Button type="primary" danger onClick={() => handleDeleteQuestion(item.id)}>
                                删除
                            </Button>
                        </Col>
                    </Row>
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