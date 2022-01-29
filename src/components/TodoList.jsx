import React from "react";
import TodoItem from "./TodoItem";
import { useContext, useEffect, useState } from "react";
import TodosContext from "../context/TodosContext";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "./assets/Spinner";

function TodoList() {
  const { todos, loading } = useContext(TodosContext);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [notCompletedTodos, setNotCompletedTodos] = useState([]);

  useEffect(() => {
    if (todos) {
      setCompletedTodos(todos.filter((todo) => todo.done));
      setNotCompletedTodos(todos.filter((todo) => !todo.done));
    }
  }, [todos]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="container rounded-3xl shadow-lg w-100 md-w-75 lg:w-1/2 xl:w-1/3 m-auto">
        <AnimatePresence>
          {notCompletedTodos.length === 0 ? (
            <p className="m-3 p-3 ">Nothing Here</p>
          ) : (
            notCompletedTodos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <TodoItem todo={todo} key={todo.id} />
              </motion.div>
            ))
          )}
        </AnimatePresence>

        {completedTodos.length === 0 ? null : (
          <AnimatePresence>
            <div className="collapse w-100 border border-base-300 collapse-arrow">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                Completed{" "}
              </div>
              <div className="collapse-content">
                {completedTodos.map((todo) => (
                  <motion.div
                    key={todo.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <TodoItem todo={todo} key={todo.id} />
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatePresence>
        )}
      </div>
    </>
  );
}

export default TodoList;
