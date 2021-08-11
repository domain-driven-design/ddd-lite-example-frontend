import { message } from "antd";
import React, {useState, useEffect } from "react"
import axios from "../../common/axios";
import Answers from "./Answers";
import CreateAnswer from "./CreateAnswer";

export default function Question(props) {
    console.log('props', props)

    const [questionInfo, setQuestionInfo] = useState({});

    function getQuestion() {
        axios.get(`/groups/${props.match.params.groupId}/questions/${props.match.params.id}`)
            .then(function (data) {
                setQuestionInfo(data);
            })
            .catch(function (error) {
                message.error("获取问题详情失败");
            });
    }

    useEffect(() => {
        getQuestion();
    }, []);

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
            <Answers groupId={props.match.params.groupId} questionId={props.match.params.id}></Answers>
        </div>
    );
}
