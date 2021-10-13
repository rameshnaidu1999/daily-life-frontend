import axios from "./config/axios";
import React, { Fragment, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Header from "./components/Header";
import { Box, Container, CssBaseline } from "@material-ui/core";
import AddPost from "./components/AddPost";
import PostCard from "./components/PostCard";

const App = () => {
  const [posts, setPosts] = useState();
  const [mode, setMode] = useState(true);

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
      <Fragment>
        <Header setMode={setMode} mode={mode} />
        <CssBaseline />
        <AddPost />
        <Container maxWidth="sm">
          <Box m={2}>
            {posts &&
              posts.length > 0 &&
              posts.map((post) => <PostCard post={post} />)}
          </Box>
        </Container>
      </Fragment>
    </ThemeProvider>
  );
};

export default App;
