import React, { useState } from "react";
import { Modal, TextField, Button } from "@material-ui/core";
import styled from "styled-components/macro";

const UploadVideoModal = ({ open, handleClose }) => {
  const [form, setForm] = useState({
    title: "",
    channelTitle: "",
    thumbnailUrl: "",
    duration: "",
    embedUrl: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("✅ Video uploaded successfully!");
        handleClose();
      } else {
        alert("❌ Failed to upload video");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Something went wrong");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalContainer>
        <h2>Upload Video</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Channel Title"
            name="channelTitle"
            value={form.channelTitle}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Thumbnail URL"
            name="thumbnailUrl"
            value={form.thumbnailUrl}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Duration"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
            <TextField
            label="Embed URL"
            name="embedUrl"
            value={form.embedUrl}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "16px" }}
          >
            Upload
          </Button>
        </form>
      </ModalContainer>
    </Modal>
  );
};

export default UploadVideoModal;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0px 4px 20px rgba(0,0,0,0.2);
`;
