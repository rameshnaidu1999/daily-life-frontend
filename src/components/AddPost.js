import { Box, Button, Container, TextField } from "@material-ui/core";
import axios from "../config/axios";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    flexDirection: "coloumn",
  },
  div: {
    marginBottom: theme.spacing(2),
  },
}));

const AddPost = ({ handleClose }) => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("Post created", { variant });
  };
  const createPost = (e) => {
    e.preventDefault();
    console.log("hekllo");
    const payload = {
      title: title,
      postImageUrl: imageUrl,
    };
    axios
      .post("/posts/create", payload)
      .then((res) => {
        if (res.status === 201) {
          handleClose();
          handleClickVariant("success");
          // handleClickVariant({ variant: "success", msg: "post created here" });
          // enqueueSnackbar("post created", "success");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const classes = useStyles();
  return (
    <div>
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" m={2} p={2}>
          <div className={classes.div}>
            <TextField
              fullWidth
              id="filled-basic"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="Title"
              variant="outlined"
            />
          </div>
          <div className={classes.div}>
            <TextField
              fullWidth
              id="filled-basic"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              label="Image URL"
              variant="outlined"
            />
          </div>
          <div className={classes.div}>
            {" "}
            <Button
              variant="contained"
              fullWidth
              disabled={!title || !imageUrl}
              color="primary"
              onClick={createPost}
            >
              Create Post
            </Button>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default AddPost;
