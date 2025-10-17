import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { useAtom } from 'jotai'
import { useLocation } from 'react-router-dom'
import { searchResultsAtom, searchTermAtom, userSettingToShowFullSidebarAtom } from '../store'
import { OuterVideoContainer as PageContainer } from './LandingPage'
import ResultsVideoCard from '../components/Search/ResultsVideoCard'
import { TWO_COL_MIN_WIDTH, useIsMobileView } from '../utils/utils'
import TuneIcon from '@material-ui/icons/Tune'
import { FilterButton } from '../components/Search/FilterButton'
import { List } from '@material-ui/core'
import axios from 'axios'

const SearchPage = () => {
  const [searchResults, setSearchResults] = useAtom(searchResultsAtom)
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom)
  const [userSettingToShowFullSidebar] = useAtom(userSettingToShowFullSidebarAtom)
  const isMobileView = useIsMobileView()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const query = params.get('search_query') || ''
    setSearchTerm(query)

    if (query) {
      const fetchResults = async () => {
        try {
          const res = await axios.get('http://localhost:8080/api/videos')
          const videos = res.data || []

          // Filter videos by search term
          const filtered = videos.filter(video =>
            Object.values(video).some(
              value =>
                typeof value === 'string' &&
                value.toLowerCase().includes(query.toLowerCase())
            )
          )
          setSearchResults(filtered)
        } catch (err) {
          console.error('Error fetching videos:', err)
          setSearchResults([])
        }
      }

      fetchResults()
    }
  }, [location.search, setSearchResults, setSearchTerm])

  return (
    <PageContainer showFullSidebar={userSettingToShowFullSidebar}>
      <InnerSearchContainer>
        {!isMobileView && (
          <FilterButton
            variant="contained"
            color="default"
            startIcon={<TuneIcon />}
            disableElevation
            disableRipple
          >
            FILTERS
          </FilterButton>
        )}

        <VideoCardsContainer component="div">
          {searchResults && searchResults.length > 0 ? (
            searchResults.map(video => {
              const key = video.id.videoId || video.id.channelId
              return <ResultsVideoCard key={key} video={video} />
            })
          ) : (
            <NoResults>No results found for "{searchTerm}"</NoResults>
          )}
        </VideoCardsContainer>
      </InnerSearchContainer>
    </PageContainer>
  )
}

export default SearchPage

// --------- STYLED COMPONENTS ---------
const VideoCardsContainer = styled(List)`
  @media screen and (min-width: ${TWO_COL_MIN_WIDTH}px) {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`

const InnerSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1096px;
  margin: 0 auto;

  @media screen and (min-width: ${TWO_COL_MIN_WIDTH}px) {
    padding: 16px 24px;
  }
`

const NoResults = styled.p`
  color: #666;
  padding: 16px 0;
`
