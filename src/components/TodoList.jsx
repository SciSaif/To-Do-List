import React from "react";
import TodoItem from "./TodoItem";

function TodoList() {
  return (
    <>
      <div className="container rounded-3xl shadow-lg w-100 md-w-75 lg:w-1/2 xl:w-1/3 m-auto">
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
      </div>
    </>
  );
}

export default TodoList;
