import { Box, Container, TextField, Grid, Button } from "@material-ui/core";
import React from "react";
import {
  useCreateTodoMutation,
  useGetAllTodosQuery,
} from "../../services/todoService";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "45ch",
    },
  },
  div: {
    marginBottom: 8,
  },
}));

const Alltodos = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const response = useGetAllTodosQuery();
  const [createTodo, res] = useCreateTodoMutation();
  console.log("res", response);
  const classes = useStyles();
  let payload = {
    title: todoTitle,
    email: "ramesh@gmail.com",
    completed: false,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello there", payload);
    createTodo(payload);
    setTodoTitle("");
  };

  return (
    <Container maxWidth="md">
      <Box marginX="auto">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12} sm={6}>
            <form noValidate onSubmit={handleSubmit} autoComplete="off">
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
                fullWidth
                className={classes.div}
              />

              <Button
                type="submit"
                fullWidth
                color="secondary"
                variant="contained"
                disabled={!todoTitle}
              >
                Create Todo
              </Button>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Alltodos;
