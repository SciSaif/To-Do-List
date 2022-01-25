import React from "react";
import TodoItem from "./TodoItem";
import { useContext } from "react";
import TodosContext from "../context/TodosContext";

function TodoList() {
  const { todos } = useContext(TodosContext);
  return (
    <>
      <div className="container rounded-3xl shadow-lg w-100 md-w-75 lg:w-1/2 xl:w-1/3 m-auto">
        {todos.map((todo) =>
          todo.done === false ? <TodoItem todo={todo} key={todo.id} /> : null
        )}
        <p className="ml-2">Completed</p>
        {todos.map((todo) =>
          todo.done === true ? <TodoItem todo={todo} key={todo.id} /> : null
        )}
      </div>
    </>
  );
}

export default TodoList;
