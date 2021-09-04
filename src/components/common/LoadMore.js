import React from "react";
import {Button} from "antd";

import "./LoadMore.css";

export default function LoadMore(props) {
    return (
        <div className="load-more">
            { !props.notMore
                ? <Button onClick={props.onLoadMore}>加载更多</Button>
                : <span>没有更多了~~</span>
            }
        </div>

    );
}
