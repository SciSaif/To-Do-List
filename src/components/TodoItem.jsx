import React from "react";
import { FaTrash } from "react-icons/fa";
import { useContext } from "react";
import TodosContext from "../context/TodosContext";

function TodoItem({ todo }) {
  const { toggleStatus, deleteTodo, editTodo } = useContext(TodosContext);

  const handleCheck = (e) => {
    toggleStatus(todo.id);
  };

  const handleDelete = (e) => {
    deleteTodo(todo.id);
  };

  const handleEdit = () => {
    editTodo(todo);
  };

  return (
    <div className="p-2">
      <div className="container flex flex-row justify-between align-middle m-0">
        <div className="flex flex-row p-2">
          <div className="flex justify-center items-center">
            <input
              type="checkbox"
              className="checkbox"
              checked={todo.done ? true : false}
              onChange={handleCheck}
            />
          </div>
          <div className="divider divider-vertical"></div>
          <div
            className={`text-display ${todo.done ? "line-through" : ""}`}
            onClick={handleEdit}
          >
            {todo.text}
          </div>
        </div>
        <div className="flex flex-row">
          <div className="divider divider-vertical"></div>
          <div className="flex justify-center items-center">
            <FaTrash
              size="25px"
              className="cursor-pointer hover:text-[#b3a7e7]"
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
      <div className="divider m-1"></div>
    </div>
  );
}

export default TodoItem;
