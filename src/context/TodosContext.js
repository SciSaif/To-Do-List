import { useState, createContext, useEffect } from "react";

const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    if (
      localStorage.getItem("todos") !== null &&
      localStorage.getItem("todos") !== undefined
    ) {
      return [...JSON.parse(localStorage.getItem("todos"))];
    } else
      return [
        {
          id: 1,
          done: false,
          text: 'There\'s an easter egg :) type "saif is great"',
        },
      ];
  });

  //local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [todoToEdit, setTodoToEdit] = useState({
    todo: {},
    edit: false,
  });

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const toggleStatus = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { id: todo.id, text: todo.text, done: !todo.done }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //to actually update the todo
  const updateTodo = (id, updatedTodo) => {
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  //to put the todo to edit in form input
  const editTodo = (todo) => {
    setTodoToEdit({
      todo: todo,
      edit: true,
    });
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        toggleStatus,
        deleteTodo,
        editTodo,
        todoToEdit,
        updateTodo,
      }}
    >
      {" "}
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
