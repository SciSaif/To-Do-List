import Home from "./pages/Home";
import { TodosProvider } from "./context/TodosContext";

function App() {
  return <TodosProvider>{<Home />}</TodosProvider>;
}

export default App;
