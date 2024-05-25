import { Container, AppBar, Grid, Grow, Typography } from "@mui/material";
import memories from "./images/memories2.png";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts } from "./actions/posts";
import "./styles/app.css";

export default function App() {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [currentId, dispatch]);
  return (
    <>
      <Container maxWidth="lg">
        <div className="appBar">
          <img src={memories} alt="memories" className="image" height="60"/>
        </div>
        <Grow in>
          <Container>
            <Grid
              container
              justify="space-between"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </>
  );
}
