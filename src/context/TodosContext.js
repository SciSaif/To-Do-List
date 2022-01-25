import { useState, createContext, useEffect } from "react";

const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const [todoToEdit, setTodoToEdit] = useState({
    todo: {},
    edit: false,
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  //fetch feedback
  const fetchTodos = async () => {
    const response = await fetch(
      `http://localhost:5000/todos?_sort=id&_order=desc`
    );
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async (newTodo) => {
    // setTodos([...todos, { id: 6, text: todo, done: false }]);
    const response = await fetch("/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    const data = await response.json();
    setTodos([data, ...todos]);
  };

  const toggleStatus = (id) => {
    let newTodo;
    todos.forEach((todo) => {
      if (todo.id === id) {
        newTodo = todo;
      }
    });
    newTodo.done = !newTodo.done;
    updateTodo(id, newTodo);
  };

  const deleteTodo = async (id) => {
    await fetch(`/todos/${id}`, {
      method: "DELETE",
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //to actually update the todo
  const updateTodo = async (id, updatedTodo) => {
    const response = await fetch(`/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });

    await response.json();
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
