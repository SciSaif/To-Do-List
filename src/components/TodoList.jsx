import React from "react";
import TodoItem from "./TodoItem";
import { useContext, useEffect, useState } from "react";
import TodosContext from "../context/TodosContext";

function TodoList() {
  const { todos } = useContext(TodosContext);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [notCompletedTods, setNotCompletedTods] = useState([]);

  useEffect(() => {
    setCompletedTodos(todos.filter((todo) => todo.done));
    setNotCompletedTods(todos.filter((todo) => !todo.done));
  }, [todos]);

  return (
    <>
      <div className="container rounded-3xl shadow-lg w-100 md-w-75 lg:w-1/2 xl:w-1/3 m-auto">
        {notCompletedTods.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}

        {completedTodos.length === 0 ? null : (
          <>
            <div className="collapse w-100 border border-base-300 collapse-arrow">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                Completed{" "}
              </div>
              <div className="collapse-content">
                {completedTodos.map((todo) => (
                  <TodoItem todo={todo} key={todo.id} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default TodoList;
