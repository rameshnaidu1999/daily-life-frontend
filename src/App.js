import axios from "./config/axios";
import React, { Fragment, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Header from "./components/Header";
import { Box, Container, CssBaseline, Grid } from "@material-ui/core";
import PostCard from "./components/PostCard";
import { SnackbarProvider } from "notistack";

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
      <SnackbarProvider maxSnack={3}>
        <Fragment>
          <Header setMode={setMode} mode={mode} />
          <CssBaseline />
          <Container>
            <Box m={2}>
              <Grid container spacing={3}>
                {posts &&
                  posts.length > 0 &&
                  posts.map((post) => (
                    <Grid item xs={12} sm={4}>
                      <PostCard post={post} />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </Container>
        </Fragment>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
