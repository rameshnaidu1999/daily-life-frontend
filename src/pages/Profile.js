import {
  Container,
  Grid,
  CssBaseline,
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import PostCard from "../components/PostCard";
import { useLocation } from "react-router-dom";
import CreatePost from "./posts/CreatePost";

// date.split("T")[0];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  userdata: {
    justifyContent: "center",
    alignItems: "center",
    direction: "row",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const location = useLocation();
  const [posts, setPosts] = useState();

  useEffect(() => {
    async function fetchData() {
      const results = await axios.get("/posts/getall");
      setPosts(results.data.data);
      console.log("results", results.data.data);
    }
    fetchData();
  }, []);
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box mt={5}>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                className={classes.large}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <div className={classes.userdata}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  variantMapping="h2"
                  color="inherit"
                >
                  username: ramesh
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  variantMapping="h2"
                  color="inherit"
                >
                  Date of birth: 20-03-1999
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={3}>
              <div className={classes.userdata}>
                <Button variant="contained" color="secondary">
                  Edit Profile
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={3}>
              <div className={classes.userdata}>
                <CreatePost title="Create Post" state={true} />
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Box mt={3}>
        <Paper className={classes.paper}>
          <Typography
            gutterBottom
            variant="subtitle1"
            variantMapping="h2"
            color="inherit"
            align="center"
          >
            view posts
          </Typography>
          {posts && posts.length > 0 && (
            <Box mt={2}>
              <Grid container spacing={3}>
                {posts.map((post) => (
                  <Grid item xs={12} sm={6} key={post._id}>
                    <PostCard post={post} location={location} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
