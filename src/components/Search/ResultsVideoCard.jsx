import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Typography } from '@material-ui/core'
import { TWO_COL_MIN_WIDTH } from '../../utils/utils'
import { useAtom } from 'jotai'
import { historyAtom } from '../../store'
import { timeAgo } from '../../utils/timeAgo'
import { supabase } from '../../supabaseClient.ts'

// Main Component 
const ResultsVideoCard = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [, setHistory] = useAtom(historyAtom)
  const [viewCount, setViewCount] = useState(video.viewCount || 0)

  // Increment view count in Supabase
  const incrementViewCount = async () => {
    try {
      const { error } = await supabase.rpc('increment_view', { video_id: Number(video.id) })
      if (error) throw error
      setViewCount(prev => (prev || 0) + 1)
    } catch (err) {
      console.error('Error incrementing view count:', err.message)
    }
  }

  const handleThumbnailClick = () => {
    setIsPlaying(true)

    // Increment view count
    incrementViewCount()

    // Add video to history
    setHistory(prev => {
      if (prev.some(v => v.id === video.id)) return prev
      return [...prev, video]
    })
  }

  return (
    <StyledCard>
      {isPlaying ? (
        <VideoPlayer embedUrl={video.embedUrl} />
      ) : (
        <Thumbnail src={video.thumbnailUrl} alt={video.title} onClick={handleThumbnailClick} />
      )}
      <DeskChannelContentContainer>
        <VideoTitle>{video.title}</VideoTitle>
        <ChannelTitle>{video.channelTitle}</ChannelTitle>
        <MetaData>
          {viewCount} views • {timeAgo(video.publishedAt)}
        </MetaData>
      </DeskChannelContentContainer>
    </StyledCard>
  )
}

export default ResultsVideoCard

const StyledCard = styled.div`
  display: flex;
  margin-top: 12px;
  padding: 0 12px;
  height: 90px;

  @media screen and (min-width: ${TWO_COL_MIN_WIDTH}px) {
    width: 100%;
    height: auto;
  }
`

const DeskChannelContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 60%;
  margin-left: 12px;
`

const Thumbnail = styled.img`
  width: 160px;
  height: 90px;
  object-fit: cover;
  cursor: pointer;

  @media screen and (min-width: ${TWO_COL_MIN_WIDTH}px) {
    width: 246px;
    height: 138px;
  }
`

const VideoPlayer = styled.iframe.attrs(props => ({
  src: props.embedUrl,
  allowFullScreen: true,
  frameBorder: 0,
  scrolling: 'no',
  title: 'Video Player',
}))`
  width: 160px;
  height: 90px;

  @media screen and (min-width: ${TWO_COL_MIN_WIDTH}px) {
    width: 246px;
    height: 138px;
  }
`
const VideoTitle = styled(Typography)`
  && {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`

const ChannelTitle = styled(Typography)`
  && {
    color: #606060;
    font-size: 12px;
    margin-bottom: 2px;
  }
`

const MetaData = styled(Typography)`
  && {
    color: #909090;
    font-size: 12px;
  }
`