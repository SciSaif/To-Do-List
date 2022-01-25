import React from "react";
import { useState, useEffect, useContext } from "react";
import TodosContext from "../context/TodosContext";

function TodoForm() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const { addTodo } = useContext(TodosContext);
  useEffect(() => {
    console.log(text);
  }, [text]);

  const handleChange = (e) => {
    let value = e.target.value;
    console.log(value);
    setText(value);
  };

  const handleSubmit = (e) => {
    console.log("submit");
    e.preventDefault();
    console.log("submit");
    if (text.trim().length === 0) {
      setMessage("To-do cannot be empty!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    } else {
      addTodo(text);
      setText("");
    }
  };
  return (
    <div className="container shadow-lg w-100 md-w-75 lg:w-1/2 xl:w-1/3 m-auto mb-5 p-5">
      <form className="form-control m-4" onSubmit={handleSubmit}>
        <label className="label">
          <span className="label-text">Add a TO-DO</span>
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Add a text"
            className="w-full pr-16 input input-primary input-bordered"
            value={text}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="absolute top-0 right-0 rounded-l-none btn btn-primary"
          >
            Add
          </button>
          <div className="mt-1 ml-3 text-red-500">{message}</div>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
