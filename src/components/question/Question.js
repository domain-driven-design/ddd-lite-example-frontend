import {message} from "antd";
import React, {useEffect, useState} from "react"
import axios from "../../services/axios";
import Answers from "./Answers";
import CreateAnswer from "./CreateAnswer";
import UpdateQuestion from "./UpdateQuestion";

import "./Question.css";

export default function Question(props) {
    const [questionInfo, setQuestionInfo] = useState({});

    const userId = window.localStorage.userId;

    function getQuestion() {
        axios.get(`/questions/${props.match.params.id}`)
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
            <div className="question-header">
                <div>
                    <h2>{questionInfo.title}</h2>
                    <p>{questionInfo.description}</p>
                </div>
                {
                    questionInfo.createdBy === userId &&
                    <UpdateQuestion
                        groupId={props.match.params.groupId}
                        questionInfo={questionInfo}
                        OnUpdateQuestionSuccess={() => getQuestion()}
                    />
                }
            </div>
            <CreateAnswer
                groupId={"default"}
                questionId={props.match.params.id}
                questionTitle={questionInfo.title}
                questionDescription={questionInfo.description}
                OnCreateAnswerSuccess={() => window.location.reload()}
            >
            </CreateAnswer>
            <Answers groupId={props.match.params.groupId} questionId={props.match.params.id}></Answers>
        </div>
    );
}
