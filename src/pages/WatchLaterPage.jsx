import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { ThemeProvider } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { columnBreakpoints } from "../components/Videos/columnBreakpoints";
import { useIsMobileView, FULL_SIDEBAR_WIDTH } from "../utils/utils";
import { GridItem } from "../components/Videos/GridItem";
import { useAtom } from "jotai";
import { isSidebarDrawerOpenAtom, watchLaterAtom } from "../store";

const WatchLaterPage = () => {
  const isMobileView = useIsMobileView();

  // Actual sidebar state (dynamic)
  const [isSidebarOpen] = useAtom(isSidebarDrawerOpenAtom);

  // Watch later videos
  const [watchLaterVideos] = useAtom(watchLaterAtom);
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    setFilteredVideos(watchLaterVideos ? [...watchLaterVideos] : []);
  }, [watchLaterVideos]);

  if (!filteredVideos || filteredVideos.length === 0) {
    return (
      <EmptyMessage>
        <h2>Your Watch Later list is empty.</h2>
        <p>Videos you save to watch later will appear here.</p>
      </EmptyMessage>
    );
  }

  return (
    <OuterVideoContainer isSidebarOpen={isSidebarOpen} isMobileView={isMobileView}>
      <ThemeProvider theme={columnBreakpoints}>
        <InnerVideoContainer isSidebarOpen={isSidebarOpen} isMobileView={isMobileView}>
          <PageTitle>Watch later</PageTitle>
          <Grid container spacing={isMobileView ? 0 : 1}>
            {filteredVideos.map((video) => (
              <GridItem key={video.id} video={video} />
            ))}
          </Grid>
        </InnerVideoContainer>
      </ThemeProvider>
    </OuterVideoContainer>
  );
};

export default WatchLaterPage;

const OuterVideoContainer = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  padding-top: 8px;

  /* Push content right only if sidebar is open (desktop) */
  padding-left: ${({ isSidebarOpen, isMobileView }) =>
    isMobileView ? "0px" : isSidebarOpen ? `${FULL_SIDEBAR_WIDTH}px` : "0px"};

  transition: padding-left 0.3s ease;
`;

const PageTitle = styled.h2`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const InnerVideoContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  transition: max-width 0.3s ease;
  padding: 0 16px;
  margin-top: 64px;

  /* Desktop breakpoints */
  @media screen and (min-width: 640px) {
    max-width: ${({ isSidebarOpen }) =>
      isSidebarOpen ? `calc(640px - ${FULL_SIDEBAR_WIDTH}px)` : `640px`};
  }

  @media screen and (min-width: 960px) {
    max-width: ${({ isSidebarOpen }) =>
      isSidebarOpen ? `calc(960px - ${FULL_SIDEBAR_WIDTH}px)` : `960px`};
  }

  @media screen and (min-width: 1280px) {
    max-width: ${({ isSidebarOpen }) =>
      isSidebarOpen ? `calc(1280px - ${FULL_SIDEBAR_WIDTH}px)` : `1280px`};
  }

  @media screen and (min-width: 1920px) {
    max-width: ${({ isSidebarOpen }) =>
      isSidebarOpen ? `calc(1920px - ${FULL_SIDEBAR_WIDTH}px)` : `1920px`};
  }
`;

const EmptyMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
`;
