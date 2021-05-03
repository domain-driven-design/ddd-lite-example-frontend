import { message } from "antd";
import {useState, useEffect } from "react"
import axios from "../common/axios"

export default function Article(props) {
  const [articleInfo, setArticleInfo] = useState({});

  function getArticle(id) {
    axios.get(id)
    .then(function (data) {
      setArticleInfo(data);
    })
    .catch(function (error) {
      message.error("获取文章失败");
    });
  }

  useEffect(() => {
    getArticle(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <div>
      <h2>{articleInfo.title}</h2>
      <p>{articleInfo.content}</p>
    </div>
  );
}
