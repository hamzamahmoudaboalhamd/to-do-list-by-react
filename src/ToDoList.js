import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToDo from "./ToDo";
import { v4 as uuidv4 } from "uuid";
import { useContext, useState, useEffect, useMemo } from "react";
import { TodoContext } from "./Context/TodoContext";

export default function ToDoList() {
  const { Todos, setTodos } = useContext(TodoContext);

  const [titleInput, settitleInput] = useState("");
  const [detailsInput, setDetailsInput] = useState("");
  const [counter, setCounter] = useState(1);
  const [todosType, setTodosType] = useState("all");

  const finished = useMemo(() => {
    return Todos.filter((t) => {
      return t.iscompleted;
    });
  });

  const unfinished = useMemo(() => {
    return Todos.filter((t) => {
      return !t.iscompleted;
    });
  });

  function changetodosType(e) {
    setTodosType(e.target.value);
  }
  useEffect(() => {
    const Storage = JSON.parse(localStorage.getItem("Todos"));
    setTodos(Storage);
  }, []);

  // ...existing code...
  function handleAdd() {
    if (titleInput.trim().length === 0) return;
    const newTodo = {
      id: uuidv4(),
      title: `${counter}- ${titleInput.trim()}`,
      Details: detailsInput,
      iscompleted: false,
    };
    const updatedTodos = [...Todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("Todos", JSON.stringify(updatedTodos));
    settitleInput("");
    setDetailsInput("");
    setCounter(counter + 1);
  }
  // ...existing code...

  let filteredTodos = Todos;
  if (todosType === "finished") {
    filteredTodos = finished;
  } else if (todosType === "unfinished") {
    filteredTodos = unfinished;
  }

  const todojsx = filteredTodos.map((t) => (
    <ToDo todo={t} key={t.id} handleToggle={handleTogglefinshed} />
  ));

  function handleTogglefinshed(id) {
    const newTodo = Todos.map((t) => {
      if (t.id === id) {
        return { ...t, iscompleted: !t.iscompleted };
      }
      return t;
    });
    setTodos(newTodo);
  }

  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          minWidth: 275,
        }}
        style={{ maxHeight: "90vh", color: "primary.main" }}
      >
        <CardContent style={{ textAlign: "center" }}>
          <Typography variant="h4">To-Do List</Typography>
          <Divider />
          <ToggleButtonGroup
            exclusive
            aria-label="text alignment"
            style={{
              marginTop: "10px",
              marginBottom: "20px",
            }}
            value={todosType}
            onChange={changetodosType}
            color="primary"
          >
            <ToggleButton value="all" aria-label="left aligned">
              All
            </ToggleButton>
            <ToggleButton value="finished" aria-label="centered">
              finished
            </ToggleButton>
            <ToggleButton value="unfinished" aria-label="right aligned">
              unfinished
            </ToggleButton>
          </ToggleButtonGroup>
          <div
            style={{
              maxHeight: "60vh",
              color: "primary.main",
              overflowY: "scroll",
            }}
          >
            {todojsx}
          </div>
          {/* input + add button */}
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            <Grid item size={8}>
              <TextField
                id="task-title"
                label="Task Title"
                variant="outlined"
                fullWidth
                size="small"
                autoComplete="off"
                value={titleInput}
                onChange={(e) => {
                  settitleInput(e.target.value);
                }}
                style={{ marginBottom: "10px" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAdd();
                }}
              />
              <TextField
                id="task-details"
                label="Task Details"
                variant="outlined"
                fullWidth
                size="small"
                autoComplete="off"
                value={detailsInput}
                onChange={(e) => setDetailsInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAdd();
                }}
              />
            </Grid>
            <Grid item size={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                style={{ fontSize: "1.2rem", width: "100%", height: "100%" }}
                disabled={titleInput.trim().length === 0}
                onClick={handleAdd}
              >
                Add
              </Button>
            </Grid>
          </Grid>
          {/* input + add button */}
        </CardContent>
      </Card>
    </Container>
  );
}
