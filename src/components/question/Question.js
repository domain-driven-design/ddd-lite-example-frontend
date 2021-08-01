import { message } from "antd";
import {useState, useEffect } from "react"
import axios from "../../common/axios";

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
        </div>
    );
}
