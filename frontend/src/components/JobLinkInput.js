import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const JobLinkInput = ({ onSearch }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onSearch(url);
      setUrl("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
      <TextField
        label="Job Link"
        variant="outlined"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Generate Email
      </Button>
    </form>
  );
};

export default JobLinkInput;
