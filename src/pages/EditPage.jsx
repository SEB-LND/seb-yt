import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { useAtom } from "jotai";
import { isSidebarDrawerOpenAtom } from "../store";
import { useIsMobileView, FULL_SIDEBAR_WIDTH } from "../utils/utils";
import { Film, Youtube, Clock, Link2, Save, ArrowLeft } from "lucide-react";
import { supabase } from "../supabaseClient.ts";

const EditPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [isSidebarOpen] = useAtom(isSidebarDrawerOpenAtom);
  const isMobileView = useIsMobileView();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [video, setVideo] = useState(null);
  const [form, setForm] = useState({
    title: "",
    channelTitle: "",
    thumbnailUrl: "",
    duration: "",
    embedUrl: "",
  });

  // Fetch video data
  useEffect(() => {
    const fetchVideo = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching video:", error);
        alert("❌ Failed to load video");
      } else {
        setVideo(data);
        setForm({
          title: data.title || "",
          channelTitle: data.channelTitle || "",
          thumbnailUrl: data.thumbnailUrl || "",
          duration: data.duration || "",
          embedUrl: data.embedUrl || "",
        });
      }
      setIsLoading(false);
    };

    fetchVideo();
  }, [id]);

  // Check if any field has changed
  const isChanged = video
    ? Object.keys(form).some(
        (key) => (form[key] || "").trim() !== (video[key] || "").trim()
      )
    : false;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChanged) return; // Safety check

    setIsSaving(true);

    const { error } = await supabase.from("videos").update(form).eq("id", id);

    setIsSaving(false);

    if (error) {
      alert("❌ Failed to update video");
      console.error(error);
    } else {
      alert("✅ Video updated successfully!");
      history.push("/");
    }
  };

  if (isLoading) {
    return (
      <OuterContainer isSidebarOpen={isSidebarOpen} isMobileView={isMobileView}>
        <LoadingContainer>
          <Spinner />
          <LoadingText>Loading video...</LoadingText>
        </LoadingContainer>
      </OuterContainer>
    );
  }

  if (!video) {
    return (
      <OuterContainer isSidebarOpen={isSidebarOpen} isMobileView={isMobileView}>
        <ErrorContainer>
          <ErrorText>Video not found</ErrorText>
          <BackButton onClick={() => history.push("/")}>← Back to Videos</BackButton>
        </ErrorContainer>
      </OuterContainer>
    );
  }

  return (
    <OuterContainer isSidebarOpen={isSidebarOpen} isMobileView={isMobileView}>
      <ContentWrapper>
        {/* Header */}
        <Header>
          <BackButtonStyled onClick={() => history.push("/")}>
            <ArrowLeft size={20} />
            <span>Back to Videos</span>
          </BackButtonStyled>
          <Title>Edit Video</Title>
          <Subtitle>Update your video information below</Subtitle>
        </Header>

        <GridContainer>
          {/* Preview Card */}
          <PreviewCard>
            <CardHeader>
              <Film size={24} style={{ color: "#0072ce" }} />
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <PreviewContent>
              <ThumbnailContainer>
                {form.thumbnailUrl ? (
                  <ThumbnailImage src={form.thumbnailUrl} alt="Thumbnail" />
                ) : (
                  <ThumbnailPlaceholder>
                    <Youtube size={48} />
                  </ThumbnailPlaceholder>
                )}
              </ThumbnailContainer>
              <VideoInfo>
                <VideoTitle>{form.title || "Title"}</VideoTitle>
                <ChannelName>{form.channelTitle || "Channel Title"}</ChannelName>
                {form.duration && (
                  <DurationContainer>
                    <Clock size={16} />
                    <span>{form.duration}</span>
                  </DurationContainer>
                )}
              </VideoInfo>
            </PreviewContent>
          </PreviewCard>

          {/* Edit Form */}
          <FormCard>
            <StyledForm onSubmit={handleSubmit}>
              {/* Title */}
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                  required
                />
              </FormGroup>

              {/* Channel Title */}
              <FormGroup>
                <Label>Channel Title</Label>
                <Input
                  type="text"
                  name="channelTitle"
                  value={form.channelTitle}
                  onChange={handleChange}
                  placeholder="Enter channel title"
                  required
                />
              </FormGroup>

              {/* Duration */}
              <FormGroup>
                <LabelWithIcon>
                  <Clock size={16} />
                  <span>Duration</span>
                </LabelWithIcon>
                <Input
                  type="text"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="e.g., 10:30"
                  required
                />
              </FormGroup>

              {/* Thumbnail URL */}
              <FormGroup>
                <LabelWithIcon>
                  <Link2 size={16} />
                  <span>Thumbnail URL</span>
                </LabelWithIcon>
                <Input
                  type="url"
                  name="thumbnailUrl"
                  value={form.thumbnailUrl}
                  onChange={handleChange}
                  placeholder="https://power2grow.sharepoint.com/sites/L&D/images/test.jpeg"
                  required
                />
              </FormGroup>

              {/* Embed URL */}
              <FormGroup>
                <LabelWithIcon>
                  <Youtube size={16} />
                  <span>Embed URL</span>
                </LabelWithIcon>
                <Input
                  type="url"
                  name="embedUrl"
                  value={form.embedUrl}
                  onChange={handleChange}
                  placeholder="https://power2grow.sharepoint.com/sites/L&D/embed/..."
                  required
                />
              </FormGroup>

              {/* Submit Button */}
              <SubmitButton type="submit" disabled={isSaving || !isChanged}>
                {isSaving ? (
                  <>
                    <ButtonSpinner />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    <span>Save Changes</span>
                  </>
                )}
              </SubmitButton>
            </StyledForm>
          </FormCard>
        </GridContainer>
      </ContentWrapper>
    </OuterContainer>
  );
};

const OuterContainer = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  min-height: 100vh;
  padding-top: 48px;
  padding-left: ${({ isSidebarOpen, isMobileView }) =>
    isMobileView ? "0px" : isSidebarOpen ? `${FULL_SIDEBAR_WIDTH}px` : "0px"};
  transition: padding-left 0.3s ease;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const BackButtonStyled = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #0072ce;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 16px;
  transition: color 0.2s;
  padding: 0;

  &:hover {
    color: #0f4c9e;
  }
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: #0f0f0f;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: #606060;
  font-size: 14px;
`;

const GridContainer = styled.div`
  display: grid;
  gap: 24px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const PreviewCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e5e5e5;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  height: fit-content;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0f0f0f;
`;

const PreviewContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ThumbnailContainer = styled.div`
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f1f1f1;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ThumbnailPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909090;
`;

const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const VideoTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0f0f0f;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ChannelName = styled.p`
  color: #606060;
  font-size: 14px;
`;

const DurationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #606060;
  font-size: 14px;
`;

const FormCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e5e5e5;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0f0f0f;
  margin-bottom: 8px;
`;

const LabelWithIcon = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #0f0f0f;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 2px;
  color: #0f0f0f;
  font-size: 14px;
  transition: border-color 0.2s;

  &::placeholder {
    color: #909090;
  }

  &:focus {
    outline: none;
    border-color: #0072ce;
  }

  &:hover {
    border-color: #909090;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: #0072ce;
  color: white;
  font-weight: 500;
  padding: 10px 16px;
  border-radius: 18px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.2s;
  font-size: 14px;

  &:hover:not(:disabled) {
    background: #0f4c9e;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 80px 20px;
`;

const Spinner = styled.div`
  display: inline-block;
  width: 48px;
  height: 48px;
  border: 4px solid #e5e5e5;
  border-top-color: #0072ce;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  color: #0f0f0f;
  margin-top: 16px;
  font-size: 16px;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 80px 20px;
`;

const ErrorText = styled.p`
  font-size: 18px;
  color: #0f0f0f;
`;

const BackButton = styled.button`
  margin-top: 16px;
  color: #0072ce;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    color: #0f4c9e;
  }
`;

const ButtonSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default EditPage;