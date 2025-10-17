import React from 'react'
import styled from 'styled-components/macro'
import SearchIcon from '@material-ui/icons/Search'
import {
  IconTooltip,
  StyledIconButton,
  useClearSearchTerm,
} from '../../../utils/utils'
import { useAtom } from 'jotai'
import { searchTermAtom, searchResultsAtom } from '../../../store'
import { useHistory } from 'react-router'
import axios from 'axios'

export const SearchContainerWithTextField = () => {
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom)
  const [, setSearchResults] = useAtom(searchResultsAtom)
  const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const term = searchTerm.trim().toLowerCase()

    try {
      // Fetch all videos from your backend (which uses Supabase)
      const res = await axios.get('http://localhost:8080/api/videos')
      const videos = res.data || []

      // Filter videos by search term
      const filtered = videos.filter((video) =>
        Object.values(video).some(
          (value) =>
            typeof value === 'string' &&
            value.toLowerCase().includes(term)
        )
      )

      // Store results in atom so SearchPage can display them
      setSearchResults(filtered)

      // Navigate to results page with query param
      history.push(`/results?search_query=${encodeURIComponent(searchTerm)}`)
    } catch (error) {
      console.error('Error searching videos:', error)
      setSearchResults([])
      history.push(`/results?search_query=${encodeURIComponent(searchTerm)}`)
    }
  }

  // reset searchTerm when click on Home button and goes to landing page
  useClearSearchTerm(history, setSearchTerm)

  return (
    <StyledForm onSubmit={handleSubmit}>
      <SearchBox
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <IconTooltip title="Search">
        <SearchIconContainer>
          <StyledIconButton type="submit">
            <SearchIcon />
          </StyledIconButton>
        </SearchIconContainer>
      </IconTooltip>
    </StyledForm>
  )
}

export const StyledForm = styled.form`
  flex-grow: 1;
  margin-left: 40px;
  margin-right: 4px;
  display: flex;
  max-width: 640px;
  border: 0.2px solid lightgray;
`

export const SearchBox = styled.input`
  border: none;
  padding: 1px 2px;
  padding-left: 12px;
  height: 40px;
  width: 100%;
  font-size: 16px;

  &::placeholder {
    color: #909090;
    font-size: 16px;
  }
`

export const SearchIconContainer = styled.div`
  width: 72px;
  height: 40px;
  display: grid;
  place-items: center;
  flex-grow: 1;
  cursor: pointer;
  border-left: 0.2px solid lightgray;
  background-color: #f8f8f8;

  &:hover {
    background-color: #f0f0f0;
  }
`
