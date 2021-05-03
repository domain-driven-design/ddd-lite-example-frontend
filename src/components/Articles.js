import { useState, useEffect } from "react";
import { Pagination, Card, message } from "antd";
import axios from "axios";

import "./Articles.css"

export default function Articles() {
  const size = 10;
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getArticles(page, size);
  }, [page]);

  function getArticles(page, size) {
    axios
      .get("/articles", {
        params: {
          page: page - 1,
          size,
        },
      })
      .then(function (response) {
        const data = response.data;
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
      <h1>文章列表</h1>
      {content.map((item) => (
        <Card title={item.title} key={item.id} className="article-item">
          <p>{item.content}</p>
          <p>{item.createdAt}</p>
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
