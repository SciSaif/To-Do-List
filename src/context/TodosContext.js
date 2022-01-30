import { useState, createContext, useEffect, useRef } from "react";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import {
  updateDoc,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

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
      } catch (error) {
        toast.error("Sorry! Failed to fetch todos :(");
        setLoading(false);
      }
    };

    if (user) {
      fetchTodos();
    }
  }, [user]);

  const logout = () => {
    try {
      auth.signOut();
      setUser(null);
      setLoading(true);
      const dataFromLS = JSON.parse(localStorage.getItem("todos"));
      dataFromLS && setTodos(dataFromLS);
      setLoading(false);
    } catch (error) {
      toast.error("Oh no! Something went wrong");
    }
    navigate("/");
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);

      if (userCredentials.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Wrong username or password");
      setLoading(false);
    }
  };

  const signUp = async (email, password, username) => {
    try {
      setLoading(true);
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;
      // console.log("user: ", user);
      updateProfile(auth.currentUser, {
        displayName: username,
      });

      //create a copy of formdata so that we can modify it and put in db
      const formDataCopy = { email, username };
      formDataCopy.timestamp = serverTimestamp();

      //adding user to database in collection "users"
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      const newTodo = {
        userRef: user.uid,
        todos: [],
      };

      //adding newTodo to database
      await setDoc(doc(db, "userData", user.uid), newTodo);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log({ error });
      if (error.code === "auth/weak-password") {
        toast.error("Password should be at least 6 characters");
      } else if (error.code === "auth/email-already-in-use") {
        toast.error(
          "An account with this email already exists. Try logging in instead"
        );
      }

      setLoading(false);
    }
  };

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
        logout,
        signUp,
        signIn,
      }}
    >
      {" "}
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
