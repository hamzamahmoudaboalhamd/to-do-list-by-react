import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useContext, useState } from "react";
import { TodoContext } from "./Context/TodoContext";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import TextField from "@mui/material/TextField";

export default function ToDo({ todo }) {
  const { Todos, setTodos } = useContext(TodoContext);
  const [showDelete, setshowDelete] = useState(false);
  const [showUpdate, setshowUpdate] = useState(false);

  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDetails, setEditDetails] = useState(todo.Details);
  function handleClick() {
    const updatedTodos = Todos.map((t) => {
      if (t.id === todo.id) {
        t.iscompleted = !t.iscompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("Todos", JSON.stringify(updatedTodos));
  }

  function handleDelete() {
    setshowDelete(true);
  }
  function handleUpdate() {
    setshowUpdate(true);
  }

  function handleClose() {
    setshowDelete(false);
  }
  function handleupdateClose() {
    setshowUpdate(false);
  }

  function handleDeleteClick() {
    const updatedTodos = Todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("Todos", JSON.stringify(updatedTodos));
  }

  function handleUpdateClick() {
    const updatedTodos = Todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: editTitle, Details: editDetails };
      }
      return t;
    });
    setTodos(updatedTodos);
    setshowUpdate(false);
    localStorage.setItem("Todos", JSON.stringify(updatedTodos));
  }

  return (
    <div className="todo-item">
      {/* Model delete */}

      <Dialog onClose={handleClose} open={showDelete}>
        <DialogTitle>
          <WarningRoundedIcon style={{ color: "#f44336", marginRight: 8 }} />
          Confirmation
        </DialogTitle>
        <Divider />
        <DialogContent>
          You cannot undo the deletion once it is completed.
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleDeleteClick}>
            Yes, delete it.
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/* ======= Model delete =====*/}

      {/* Model update */}
      <Dialog
        onClose={handleupdateClose}
        open={showUpdate}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle variant="h4">Edit tasks</DialogTitle>
        <Divider />
        <TextField
          id="task-title"
          label="Task Title"
          variant="outlined"
          fullWidth
          size="medium"
          autoComplete="off"
          style={{
            width: "80%",
            marginBottom: "20px",
            marginLeft: "2rem",
            marginTop: "2rem",
          }}
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />

        <TextField
          id="Task details"
          label="Task Details"
          variant="outlined"
          fullWidth
          size="medium"
          autoComplete="off"
          style={{
            width: "80%",
            marginBottom: "10px",
            marginLeft: "2rem",
          }}
          value={editDetails}
          onChange={(e) => setEditDetails(e.target.value)}
        />
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleUpdateClick}>
            Add
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleupdateClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/*====== Model update ======*/}

      <Card
        sx={{
          minWidth: 275,
          backgroundColor: "#296ba1",
          marginBottom: "10px",
          zIndex: 2,
          position: "relative",
        }}
        className="todo-card"
      >
        {todo.iscompleted && (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "rgba(76, 175, 80, 0.4)",
              zIndex: -1,
              position: "absolute",
              top: 0,
            }}
          />
        )}
        <CardContent>
          <Grid container>
            <Grid
              size={8}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography
                variant="h6"
                style={{
                  textDecoration: todo.iscompleted ? "line-through" : "none",
                  color: "#fff",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="h6"
                style={{
                  textDecoration: todo.iscompleted ? "line-through" : "none",
                  color: "#fff",
                }}
              >
                {todo.Details}
              </Typography>
            </Grid>
            <Grid
              size={4}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={handleClick}
                className="check"
                style={{
                  padding: "3px",
                  background: todo.iscompleted ? "#4caf50" : "#fff",
                  border: "3px solid #4caf50 ",
                  borderRadius: "50%",
                  color: todo.iscompleted ? "#fff" : "#4caf50",
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                className="check"
                style={{
                  padding: "3px",
                  background: "#fff",
                  border: "3px solid #0976cf",
                  borderRadius: "50%",
                  color: " #0976cf",
                }}
                onClick={handleUpdate}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                className="check"
                style={{
                  padding: "3px",
                  background: "#fff",
                  border: "3px solid #b8554e",
                  borderRadius: "50%",
                  color: "#f44336",
                }}
                onClick={handleDelete}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
