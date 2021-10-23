import { Box, Button, Container, TextField } from "@material-ui/core";
import axios from "../config/axios";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { useCreatePostMutation } from "../services/postService";

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
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const [createPost, res] = useCreatePostMutation();

  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("Post created", { variant });
  };

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "yywae307");
    data.append("cloud_name", "dtxgfrzye");
    fetch("  https://api.cloudinary.com/v1_1/dtxgfrzye/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  const payload = {
    title: title,
    postImageUrl: url,
  };
  console.log("res", res);

  const handleCreatePost = () => {
    createPost(payload)
      .then((res) => {
        if (!res.isError) {
          handleClose();
          handleClickVariant("success");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  {
    /*
  const createPost = (e) => {
    e.preventDefault();
    console.log("hekllo");
  
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
*/
  }
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
              label="Caption"
              variant="outlined"
            />
          </div>
          {/** 
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
          */}
          <div className={classes.div}>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className={classes.div}>
            <Button
              variant="contained"
              fullWidth
              disabled={!image}
              color="primary"
              onClick={uploadImage}
            >
              {url ? "uploaded" : "Upload Image"}
            </Button>
            {url && (
              <img
                style={{ height: 200, width: 400, margin: 10 }}
                alt="check"
                src={url}
              />
            )}
          </div>
          <div className={classes.div}>
            <Button
              variant="contained"
              fullWidth
              disabled={!title || !url}
              color="primary"
              onClick={handleCreatePost}
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
