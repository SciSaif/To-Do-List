import React from "react";
import Header from "../components/Header";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

function home() {
  return (
    <>
      <Header text="To Do List" />
      <TodoForm />
      <TodoList />
    </>
  );
}

export default home;
