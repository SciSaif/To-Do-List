import { useState, createContext } from "react";

const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint saepe, veritatis a dolores qui aut eligendi fugit suscipit vero aspernatur earum alias nostrum! Ullam architecto autem esse magnam laborum possimus.",
      done: false,
    },
    {
      id: 2,
      text: "lorem laborum possimus.",
      done: false,
    },
    {
      id: 3,
      text: "There is an easter egg :) type: saif is great",
      done: false,
    },
    {
      id: 4,
      text: "Lorem  laborum possimus.",
      done: false,
    },
    {
      id: 5,
      text: "Lorem vero aspernatur earum alias nostrum! Ullam architecto autem esse magnam laborum possimus.",
      done: false,
    },
  ]);

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
