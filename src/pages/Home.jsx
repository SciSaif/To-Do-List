import React from "react";
import Header from "../components/Header";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";

function Home() {
  return (
    <>
      <TodoForm />
      <TodoList />
    </>
  );
}

export default Home;
