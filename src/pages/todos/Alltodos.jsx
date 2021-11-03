import {
  Box,
  Container,
  TextField,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  List,
  Paper,
  ListItemIcon,
  IconButton,
  ListItem,
  ListItemText,
  CssBaseline,
} from "@material-ui/core";
import React from "react";
import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetAllTodosQuery,
} from "../../services/todoService";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { CheckBox } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

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
  const [checked, setChecked] = useState(false);
  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetAllTodosQuery();
  const [createTodo, res] = useCreateTodoMutation();
  const [deleteTodo, respo] = useDeleteTodoMutation();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  let payload = {
    title: todoTitle,
    email: "ramesh@gmail.com",
    completed: checked,
  };
  const handleClickVariant = (variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("Todo created", {
      variant,
    });
  };
  const handleDeleteVariant = (variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("Todo Deleted", {
      variant,
    });
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("hello there", payload);
    createTodo(payload);
    setTodoTitle("");
    setChecked();
    handleClickVariant("success");
    // window reload after sometime
    window.setTimeout(function () {
      window.location.reload();
    }, 2000);
  };
  const handleDelete = (id) => {
    console.log(id);
    deleteTodo(id).then((res) => {
      console.log("deleted", res);
      if (res.data.status === 200) {
        handleDeleteVariant("success");
        // window reload after sometime
        window.setTimeout(function () {
          window.location.reload();
        }, 2000);
      }
    });
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
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    name="checkedB"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                }
                label={checked ? "completed" : "pending"}
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
      <Box marginX="auto">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12} sm={6}>
            {isSuccess && data.data.length > 0 && (
              <Paper>
                <List>
                  {data.data.map((todo) => (
                    <ListItem key={todo._id} id={todo._id}>
                      <ListItemText
                        primary={todo.title}
                        secondary={todo.completed ? "Completed" : "Pending"}
                      />
                      <ListItemIcon>
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </ListItemIcon>
                      <ListItemIcon>
                        <IconButton onClick={() => handleDelete(todo._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemIcon>

                      <CssBaseline />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Alltodos;
