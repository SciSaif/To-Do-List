import React from "react";

function TodoForm() {
  return (
    <div className="container rounded-3xl shadow-lg w-100 md-w-75 lg:w-1/2 xl:w-1/3 m-auto mb-5 p-5">
      <div className="flex flex-row justify-center items-center">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Add a To-do</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Add a task"
              className="w-full pr-16 input input-primary input-bordered"
            />
            <button className="absolute top-0 right-0 rounded-l-none btn btn-primary">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoForm;
