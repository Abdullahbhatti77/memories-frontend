import { TextField, Button, Typography, Paper } from "@mui/material";
import "../../styles/form.css";
import { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

export default function Form({ currentId, setCurrentId }) {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const [fileKey, setFileKey] = useState(Date.now());
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    setFileKey(Date.now()); // Force re-render by updating the key
  };

  return (
    <>
      <Paper>
        <form
          autoComplete="off"
          noValidate
          className="form"
          onSubmit={handleSubmit}
        >
          <Typography variant="h6" style={{ marginTop: "8px" }}>
            {currentId ? "Editing" : "Creating"} a Memory
          </Typography>
          <TextField
            name="creator"
            variant="outlined"
            label="Creator"
            fullWidth
            value={postData.creator}
            onChange={(e) =>
              setPostData({ ...postData, creator: e.target.value })
            }
            style={{ marginTop: "16px" }}
          />
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
          <div className="fileInput">
            {postData.selectedFile && (
              <div style={{ marginBottom: "10px", textAlign: "center" }}>
                <img
                  src={postData.selectedFile}
                  alt="Preview"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
                <Typography variant="body2" color="textSecondary">
                  Current Image
                </Typography>
              </div>
            )}
            <FileBase
              key={fileKey}
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
            fullWidth
            className="buttonSubmit"
            style={{ marginTop: "10px" }}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            fullWidth
            style={{ marginTop: "8px" }}
            onClick={clear}
          >
            Clear
          </Button>
        </form>
      </Paper>
    </>
  );
}
