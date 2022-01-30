import Home from "./pages/Home";
import { TodosProvider } from "./context/TodosContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Router>
      <TodosProvider>
        <Header text="To Do List" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </TodosProvider>
    </Router>
  );
}

export default App;
