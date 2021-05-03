import { Form, Input, Button, message } from "antd";
import axios from "../common/axios"

import "./NewArticle.css";

export default function NewArticle(props) {
  const onFinish = (values) => {
    axios
      .post("/articles", values)
      .then(function (response) {
        message.success("发布成功");
        props.history.push("/articles");
      })
      .catch(function (error) {
        message.error("发布失败");
      });
  };

  return (
    <div>
      <div className="article-form">
        <Form name="article" onFinish={onFinish}>
          <Form.Item
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: "标题必填",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[
              {
                required: true,
                message: "内容必填",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <div>
              <Button type="primary" htmlType="submit">
                发布
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
