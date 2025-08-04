import "./App.css";
import ToDoList from "./ToDoList";
import { TodoContext } from "./Context/TodoContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const inTodos = [
  {
    id: uuidv4(),
    title: "wfddd",
    Details: "fewwww",
    iscompleted: false,
  },
];

function App() {
  const [Todos, setTodos] = useState(inTodos);

  const githubTheme = createTheme({
    palette: {
      primary: {
        main: "#A51818",
      },
      background: {
        default: "#f5f5f5",
      },
    },
  });

  return (
    <ThemeProvider theme={githubTheme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <TodoContext.Provider value={{ Todos, setTodos }}>
          <ToDoList style={{ color: "primary.main" }} />
        </TodoContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
