import axios from "./config/axios";
import React, { Fragment, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Header from "./components/Header";
import { Box, Container, CssBaseline, Grid } from "@material-ui/core";
import PostCard from "./components/PostCard";
import { SnackbarProvider } from "notistack";
import { Switch, Route, useLocation } from "react-router-dom";
// page imports
import SignIn from "./pages/SigninPage";
import SignUp from "./pages/SignupPage";
import Profile from "./pages/Profile";
import ViewPost from "./pages/posts/ViewPost";
import { useGetAllPostQuery } from "./services/postService";

const App = () => {
  const location = useLocation();
  const [posts, setPosts] = useState();
  const [mode, setMode] = useState(true);
  console.log("loc", location.pathname);
  const responseInfo = useGetAllPostQuery();
  console.log("responseInfo", responseInfo);
  useEffect(() => {
    async function fetchData() {
      const results = await axios.get("/posts/getall");
      setPosts(results.data.data);
      console.log("results", results.data.data);
    }
    fetchData();
  }, []);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: mode ? "dark" : "light",
        },
      }),
    [mode]
  );
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <Fragment>
          <Header setMode={setMode} mode={mode} />
          <CssBaseline />
          <Switch>
            <Route exact path="/">
              <Container>
                <Box m={2}>
                  <Grid container spacing={3}>
                    {posts &&
                      posts.length > 0 &&
                      posts.map((post) => (
                        <Grid item xs={12} sm={4}>
                          <PostCard post={post} location={location} />
                        </Grid>
                      ))}
                  </Grid>
                </Box>
              </Container>
            </Route>
            <Route exact path="/signin">
              <SignIn />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/viewpost/:id">
              <ViewPost />
            </Route>
          </Switch>
        </Fragment>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
