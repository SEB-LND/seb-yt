import React, { useState, useEffect } from "react";
import { Modal, TextField, Button, Typography, Box } from "@material-ui/core";
import styled from "styled-components/macro";
import { supabase } from "../../../../supabaseClient.ts";

const UploadVideoModal = ({ open, handleClose }) => {
  const [form, setForm] = useState({
    title: "",
    channelTitle: "",
    thumbnailUrl: "",
    duration: "",
    embedUrl: "",
  });

  // Reset form whenever modal is closed
  useEffect(() => {
    if (!open) {
      setForm({
        title: "",
        channelTitle: "",
        thumbnailUrl: "",
        duration: "",
        embedUrl: "",
      });
    }
  }, [open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const isFormValid = Object.values(form).every((value) => value.trim() !== "");
    if (!isFormValid) {
      alert("⚠ Please fill in all fields before uploading.");
      return;
    }

    try {
      const { error } = await supabase.from("videos").insert([
        {
          title: form.title,
          channelTitle: form.channelTitle,
          thumbnailUrl: form.thumbnailUrl,
          duration: form.duration,
          embedUrl: form.embedUrl,
          viewCount: 0,
        },
      ]);

      if (error) throw error;

      alert("✅ Video uploaded successfully!");
      handleClose(); 
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("❌ Failed to upload video");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalContainer>
        <Typography
          variant="h5"
          style={{ fontWeight: 600, marginBottom: "12px", textAlign: "center" }}
        >
          Upload Video
        </Typography>

        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          style={{ marginBottom: "20px" }}
        >
          Please fill in all required fields before submitting
        </Typography>

        <form onSubmit={handleSubmit}>
          <StyledTextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
          />
          <StyledTextField
            label="Channel Title"
            name="channelTitle"
            value={form.channelTitle}
            onChange={handleChange}
            fullWidth
          />
          <StyledTextField
            label="Thumbnail URL"
            name="thumbnailUrl"
            value={form.thumbnailUrl}
            onChange={handleChange}
            fullWidth
          />
          <StyledTextField
            label="Duration"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            fullWidth
          />
          <StyledTextField
            label="Embed URL"
            name="embedUrl"
            value={form.embedUrl}
            onChange={handleChange}
            fullWidth
          />

          <ButtonGroup>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!Object.values(form).every((v) => v.trim() !== "")}
              style={{ borderRadius: "8px", fontWeight: 600 }}
            >
              Upload
            </Button>
            <Button
              onClick={handleClose} 
              variant="outlined"
              color="secondary"
              style={{ borderRadius: "8px", fontWeight: 600 }}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </ModalContainer>
    </Modal>
  );
};

export default UploadVideoModal;

const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  padding: 32px 28px;
  border-radius: 16px;
  width: 420px;
  max-width: 90%;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 16px;
    .MuiInputBase-root {
      border-radius: 8px;
    }
  }
`;

const ButtonGroup = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;
