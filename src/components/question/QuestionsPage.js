import React from "react";
import Questions from "./Questions";


export default function QuestionsPage(props) {
    return (
       <Questions groupId={props.match.params.groupId}></Questions>
    );
}
