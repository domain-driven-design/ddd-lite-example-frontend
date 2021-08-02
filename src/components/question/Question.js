import { message } from "antd";
import React, {useState, useEffect } from "react"
import axios from "../../common/axios";
import Answers from "./Answers";
import CreateAnswer from "./CreateAnswer";

export default function Question(props) {
    const [questionInfo, setQuestionInfo] = useState({});

    function getQuestion(id) {
        axios.get(`/groups/default/questions/${id}`)
            .then(function (data) {
                setQuestionInfo(data);
            })
            .catch(function (error) {
                message.error("获取问题详情失败");
            });
    }

    useEffect(() => {
        getQuestion(props.match.params.id);
    }, [props.match.params.id]);

    return (
        <div>
            <h2>{questionInfo.title}</h2>
            <p>{questionInfo.description}</p>
            <CreateAnswer
                groupId={"default"}
                questionId={props.match.params.id}
                questionTitle={questionInfo.title}
                questionDescription={questionInfo.description}
            >
            </CreateAnswer>
            <Answers groupId={"default"} questionId={props.match.params.id}></Answers>
        </div>
    );
}
