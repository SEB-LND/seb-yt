import React, { useState } from "react";
import { useAtom } from "jotai";
import { historyAtom, isSidebarDrawerOpenAtom } from "../store";
import { useIsMobileView, FULL_SIDEBAR_WIDTH } from "../utils/utils";
import { Grid } from "@material-ui/core";
import { GridItem } from "../components/Videos/GridItem";
import styled from "styled-components/macro";
import { Search, Trash2 } from "lucide-react";

const HistoryPage = () => {
  const [history, setHistory] = useAtom(historyAtom);
  const [isSidebarOpen] = useAtom(isSidebarDrawerOpenAtom);
  const isMobileView = useIsMobileView();

  const [searchQuery, setSearchQuery] = useState(""); // state for search

  const handleClearHistory = () => {
    setHistory([]);
  };

  // filter history based on search
  const filteredHistory = history.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.channelTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!history || history.length === 0) {
    return (
      <EmptyMessage>
        <h2>No videos in history.</h2>
        <p>Watched videos will appear here.</p>
      </EmptyMessage>
    );
  }

  return (
    <OuterVideoContainer isSidebarOpen={isSidebarOpen} isMobileView={isMobileView}>
      <MainLayout>
        {/* Left side: history videos */}
        <HistoryContent>
          <PageTitle>Watch history</PageTitle>
          <Grid container spacing={isMobileView ? 0 : 1}>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((video) => <GridItem key={video.id} video={video} />)
            ) : (
              <p>No matching results.</p>
            )}
          </Grid>
        </HistoryContent>

        {/* Right side: search + clear */}
        <HistorySidebar isSidebarOpen={isSidebarOpen}>
          <SearchBox isSidebarOpen={isSidebarOpen}>
            <Search size={18} color="#606060" />
            <input
                type="text"
                placeholder="Search watch history"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            </SearchBox>

            <ClearHistoryButton onClick={handleClearHistory} isSidebarOpen={isSidebarOpen}>
            <Trash2 size={18} />
            <span>Clear all watch history</span>
            </ClearHistoryButton>
        </HistorySidebar>
      </MainLayout>
    </OuterVideoContainer>
  );
};

export default HistoryPage;

const OuterVideoContainer = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  padding-top: 72px;
  padding-left: ${({ isSidebarOpen, isMobileView }) =>
    isMobileView ? "0px" : isSidebarOpen ? `${FULL_SIDEBAR_WIDTH}px` : "0px"};
  transition: padding-left 0.3s ease;
`;

const MainLayout = styled.div`
  display: flex;
  margin-left: 32px;
`;

const HistoryContent = styled.div`
  flex: 3; /* main area grows more */
`;

const HistorySidebar = styled.div`
  flex: ${({ isSidebarOpen }) => (isSidebarOpen ? "0.6" : "1")};
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 72px;
  align-self: flex-start;
  transition: flex 0.3s ease;
`;

const PageTitle = styled.h2`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f1f1f1;
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 14px;
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? "48px" : "200px")};
  margin-left: 60px;
  overflow: hidden;
  transition: width 0.3s ease;
  
  svg {
    flex-shrink: 0; 
  }

  input {
    border: none;
    outline: none;
    background: transparent;
    flex: 1;
    min-width: 0;
    font-size: 14px;
    opacity: ${({ isSidebarOpen }) => (isSidebarOpen ? 0 : 1)};
    transition: opacity 0.2s ease;
  }
`;

const ClearHistoryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f1f1f1;
  border: none;
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
  color: #0f0f0f;
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? "48px" : "200px")};
  margin-left: 60px;
  overflow: hidden;
  transition: width 0.3s ease;

  span {
    white-space: nowrap;
    opacity: ${({ isSidebarOpen }) => (isSidebarOpen ? 0 : 1)};
    transition: opacity 0.2s ease;
  }

  &:hover {
    background: #e5e5e5;
  }

  svg {
    flex-shrink: 0;
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
