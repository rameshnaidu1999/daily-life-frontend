import { Button, Container, TextField } from "@material-ui/core";
import axios from "../config/axios";
import React, { useState } from "react";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const createPost = (e) => {
    e.preventDefault();
    console.log("hekllo");
    const payload = {
      title: title,
      postImageUrl: imageUrl,
    };
    axios
      .post("/posts/create", payload)
      .then(() => {
        console.log("post created");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div>
      <Container maxWidth="sm">
        <TextField
          id="filled-basic"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Filled"
          variant="filled"
        />
        <TextField
          id="filled-basic"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          label="Filled"
          variant="filled"
        />

        <Button variant="contained" color="primary" onClick={createPost}>
          Primary
        </Button>
      </Container>
    </div>
  );
};

export default AddPost;
