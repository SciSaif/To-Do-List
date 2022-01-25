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
      text: "Lorem vero aspernatur earum alias nostrum! Ullam architecto autem esse magnam laborum possimus.",
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

  const addTodo = (todo) => {
    setTodos([...todos, { id: 6, text: todo, done: false }]);
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

  return (
    <TodosContext.Provider value={{ todos, addTodo, toggleStatus, deleteTodo }}>
      {" "}
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
