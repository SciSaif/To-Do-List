import { useState, createContext, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase.config";
import { updateDoc, doc, getDoc } from "firebase/firestore";

const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const auth = getAuth();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          setUser(user);
        } else {
          setLoading(true);
          setUser(null);
          const dataFromLS = JSON.parse(localStorage.getItem("todos"));
          dataFromLS && setTodos(dataFromLS);
          setLoading(false);
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  //local storage
  useEffect(() => {
    if (user === null && todos && todos.length !== 0) {
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
        setLoading(true);
        const userDataRef = doc(db, "userData", user.uid);
        const userData = (await getDoc(userDataRef)).data();
        setTodos(userData.todos);
        setLoading(false);
        // console.log(userData.todos);
      } catch (error) {
        console.log("ooops", error);
        setLoading(false);
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
        loading,
        setLoading,
      }}
    >
      {" "}
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
