import { useState, createContext, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase.config";
import { updateDoc, doc, getDoc } from "firebase/firestore";

const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const [user, setUser] = useState(null);

  const auth = getAuth();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
          setTodos(JSON.parse(localStorage.getItem("todos")));
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  //local storage
  useEffect(() => {
    if (user === null && todos.length !== 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  useEffect(() => {
    const addTodosToDb = async () => {
      const userDataRef = doc(db, "userData", user.uid);
      await updateDoc(userDataRef, { userRef: user.uid, todos });
    };
    if (user) {
      addTodosToDb();
    }
  }, [todos]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const userDataRef = doc(db, "userData", user.uid);
        const userData = (await getDoc(userDataRef)).data();
        setTodos(userData.todos);

        // console.log(userData.todos);
      } catch (error) {
        console.log("ooops", error);
      }
    };

    if (user) {
      fetchTodos();
    }
  }, [user]);

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
