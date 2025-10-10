import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import { Typography, IconButton } from '@material-ui/core'
import {
  useIsMobileView,
  TWO_COL_MIN_WIDTH,
} from '../../utils/utils'
import he from 'he'
import { ChannelDetails } from './ChannelDetails'
import { MoreButton } from './MoreButton'
import { useAtom } from 'jotai'
import { historyAtom, likedAtom } from '../../store' 
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import { supabase } from '../../supabaseClient.ts'

// const sampleVideo = {
//   id: 'dQw4w9WgXcQ', // YouTube video ID
//   title: 'The 6 Switching Duties of High Voltage Switchgears',
//   channelTitle: 'EIU/CAC',
//   publishedAt: '2009-10-25T06:57:33Z',
//   viewCount: '55',
//   thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
//   duration: '4:42',
//   embedUrl: 'https://power2grow.sharepoint.com/sites/LearningDevelopment/_layouts/15/embed.aspx?UniqueId=f3de6630-1499-4a69-bbc9-0b690aacd37d&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create',
// }

const VideoCard = (vid) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const sampleVideo = vid.video
  const [, setHistory] = useAtom(historyAtom)
  const [likedVideos, setLikedVideos] = useAtom(likedAtom)
  const [viewCount, setViewCount] = useState(sampleVideo.viewCount || 0)

  // Increment view count via Supabase RPC
  const incrementViewCount = async () => {
    try {
      const { error } = await supabase.rpc('increment_view', {
        video_id: Number(sampleVideo.id),
      })
      if (error) throw error

      setViewCount((prev) => (prev || 0) + 1)
      console.log('✅ View count incremented for video ID:', sampleVideo.id)
    } catch (err) {
      console.error('❌ Error incrementing view count:', err.message)
    }
  }

  // Trigger increment when video starts playing
  useEffect(() => {
    if (isPlaying) {
      incrementViewCount()
    }
  }, [isPlaying])

  const handleThumbnailClick = () => {
    setIsPlaying(true)

   // Save video to history when played
    setHistory((prev) => {
      const alreadyInHistory = prev.some((v) => v.id === sampleVideo.id)
      if (alreadyInHistory) return prev
      return [...prev, sampleVideo]
    })
  }

    // --- Like toggle ---
  const isLiked = likedVideos.some((v) => v.id === sampleVideo.id)
  const toggleLike = () => {
    if (isLiked) {
      setLikedVideos(likedVideos.filter((v) => v.id !== sampleVideo.id))
    } else {
      setLikedVideos([...likedVideos, sampleVideo])
    }
  }

  return (
    <StyledCard square={true} elevation={0}> 
      {isPlaying ? (
        <VideoPlayer embedUrl={sampleVideo.embedUrl} />
      ) : (
        <Thumbnail
          thumbnailImage={sampleVideo.thumbnailUrl}
          formattedDuration={sampleVideo.duration}
          onClick={handleThumbnailClick}
        />
      )}

      <StyledCardHeader
        // avatar={<StyledAvatar src={sampleVideo.channelAvatarUrl} />}
        action={
          <ActionContainer>
            <IconButton onClick={toggleLike}>
              {isLiked ? <ThumbUpAltIcon style={{ color: 'red' }} /> : <ThumbUpAltOutlinedIcon />}
            </IconButton>
            <MoreButton video={sampleVideo} isSearchPage={false}/>
          </ActionContainer>
        }
        title={<VideoTitle variant="h3">{he.decode(sampleVideo.title)}</VideoTitle>}
        subheader={
          <ChannelDetails
            channelTitle={sampleVideo.channelTitle}
            publishedAt={sampleVideo.publishedAt}
            viewCount={sampleVideo.viewCount}
          />
        }
      />
    </StyledCard>
  )
}

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const Thumbnail = ({ thumbnailImage, formattedDuration, onClick }) => {
  return (
    <ImageContainer onClick={onClick}>
      <ThumbnailImage src={thumbnailImage} alt="Please sign in to view" />
      <DurationContainer variant="body2">{formattedDuration}</DurationContainer>
    </ImageContainer>
  )
}

const VideoPlayer = ({ embedUrl }) => {
  return (
    <VideoContainer>
      <StyledIframe
        src={embedUrl}
        width="640"
        height="360"
        frameBorder="0"
        scrolling="no"
        allowFullScreen
        title="Embedded SharePoint Video"
      ></StyledIframe>
    </VideoContainer>
  )
}

export const StyledIconButton = styled(IconButton)`
  && {
    padding: 8px;
    color: #030303;

    &:hover {
      background-color: transparent;
    }
  }
`

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; // 16:9 aspect ratio
  overflow: hidden;
`

const ThumbnailImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  cursor: pointer;
`

export const DurationContainer = styled(Typography)`
  && {
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 4px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    border-radius: 2px;
    padding: 1px 4px;
    @media screen and (min-width: ${TWO_COL_MIN_WIDTH}px) {
      padding: 2px 6px;
    }
  }
`

const StyledCard = styled(Card)`
  && {
    width: 100%;
    margin-bottom: 10px;
    @media screen and (min-width: ${TWO_COL_MIN_WIDTH}px) {
      background-color: transparent;
      margin-bottom: 30px; // original is 40px but 30px here account for padding
    }
  }
`

export const StyledCardHeader = styled(CardHeader)`
  && {
    padding: 10px;

    @media screen and (min-width: ${TWO_COL_MIN_WIDTH}px) {
      padding: 10px 0;
    }
  }
  .MuiCardHeader-avatar {
    align-self: flex-start;
    margin-right: 0;
  }
  .MuiCardHeader-content {
    padding-left: 2px;
  }
`

export const VideoTitle = styled(Typography)`
  /* 1rem in original YouTube in 10px */
  && {
    font-size: 14px;
    line-height: 20px;
    max-height: 40px;
    font-weight: 600;
    max-height: 40px;
    margin-bottom: 3px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    @media screen and (min-width: ${TWO_COL_MIN_WIDTH}px) {
      margin-bottom: 6px;
    }
  }
`

export const StyledAvatar = styled(Avatar)`
  &&& {
    cursor: pointer;
    width: 40px;
    height: 40px;

    @media screen and (min-width: ${TWO_COL_MIN_WIDTH}px) {
      width: 36px;
      height: 36px;
      background-color: #ef6c00;
    }
  }
`

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; // 16:9 aspect ratio
`

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`

export default VideoCard
