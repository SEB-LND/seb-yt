import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { ThemeProvider } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { columnBreakpoints } from "../components/Videos/columnBreakpoints";
import { useIsMobileView } from "../utils/utils";
import { GridItem } from "../components/Videos/GridItem";
import { useAtom } from "jotai";
import { userSettingToShowFullSidebarAtom, searchTermAtom } from "../store";
import channels from "../components/ChipsBar/chipsArray";
import { supabase } from "../supabaseClient.ts";
import {
  TWO_COL_MIN_WIDTH,
  TWO_COL_MAX_WIDTH,
  THREE_COL_MIN_WIDTH,
  THREE_COL_MAX_WIDTH,
  FOUR_COL_MIN_WIDTH,
  FOUR_COL_MAX_WIDTH,
  SIX_COL_MIN_WIDTH,
  SIX_COL_MAX_WIDTH,
  MOBILE_VIEW_HEADER_HEIGHT,
  DESKTOP_VIEW_HEADER_HEIGHT,
  SHOW_MINI_SIDEBAR_BREAKPOINT,
  MINI_SIDEBAR_WIDTH,
  SHOW_FULL_SIDEBAR_BREAKPOINT,
  FULL_SIDEBAR_WIDTH,
} from "../utils/utils";

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const Videos = ({ selectedChipIndex }) => {
  const VIDEOS_PER_QUERY = 24;
  const isMobileView = useIsMobileView();
  const [userSettingToShowFullSidebar] = useAtom(userSettingToShowFullSidebarAtom);
  const [searchTerm] = useAtom(searchTermAtom);
  const [filteredVideos, setFilteredVideos] = useState([]);

  const selectedChannel = channels[selectedChipIndex].channelTitle;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data, error } = await supabase.from("videos").select("*");
        if (error) throw error;

        let filtered = data || [];

        // Filter by channel
        if (selectedChannel !== "") {
          filtered = filtered.filter((video) =>
            video.channelTitle.toLowerCase().includes(selectedChannel.toLowerCase())
          );
        }

        // filter by search term
        if (searchTerm.trim() !== "") {
          const lowercasedSearchTerm = searchTerm.toLowerCase();
          filtered = filtered.filter((video) =>
            Object.values(video).some(
              (value) =>
                typeof value === "string" &&
                value.toLowerCase().includes(lowercasedSearchTerm)
            )
          );
        }

        // shuffle + limit
        const shuffledAndLimited = shuffleArray(filtered).slice(0, VIDEOS_PER_QUERY);
        setFilteredVideos(shuffledAndLimited);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [searchTerm, selectedChannel]);

  return (
    <OuterVideoContainer showFullSidebar={userSettingToShowFullSidebar}>
      <ThemeProvider theme={columnBreakpoints}>
        <InnerVideoContainer>
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

const OuterVideoContainer = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  padding-top: ${MOBILE_VIEW_HEADER_HEIGHT}px;

  /* 496px padding-top: ${DESKTOP_VIEW_HEADER_HEIGHT}px;  */
  @media screen and (min-width: ${TWO_COL_MIN_WIDTH}px) {
    padding-top: 1px;
  }

  /* 792px */
  @media screen and (min-width: ${SHOW_MINI_SIDEBAR_BREAKPOINT}px) {
    padding-left: ${MINI_SIDEBAR_WIDTH}px;
    padding-right: 48px;
  }

  /* 1313px */
  @media screen and (min-width: ${SHOW_FULL_SIDEBAR_BREAKPOINT}px) {
    padding-left: ${({ showFullSidebar }) => (showFullSidebar ? FULL_SIDEBAR_WIDTH : MINI_SIDEBAR_WIDTH)}px;
    padding-right: 48px;
  }
`;

const InnerVideoContainer = styled.div`
  /* mobile view has 0 margin */
  margin: 0;
  @media screen and (min-width: ${TWO_COL_MIN_WIDTH}px) {
    max-width: ${TWO_COL_MAX_WIDTH}px;
    margin-top: 64px;
    margin-left: auto;
    margin-right: auto;
  }

  @media screen and (min-width: ${THREE_COL_MIN_WIDTH}px) {
    max-width: ${THREE_COL_MAX_WIDTH}px;
    // from 872 px up there's padding left and right
    padding-left: 16px;
    padding-right: 16px;
  }
  @media screen and (min-width: ${FOUR_COL_MIN_WIDTH}px) {
    max-width: ${FOUR_COL_MAX_WIDTH}px;
  }
  /* There's no five columns with MUI Grid 
  @media screen and (min-width: 1952px) {
    max-width: 1804px;
  } */
  @media screen and (min-width: ${SIX_COL_MIN_WIDTH}px) {
    max-width: ${SIX_COL_MAX_WIDTH}px;
  }
`;

export { OuterVideoContainer };
export default Videos;
