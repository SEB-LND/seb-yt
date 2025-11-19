import React, { useState, useRef, useEffect } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import { StyledIconButton } from './VideoCard'
import { useIsMobileView } from '../../utils/utils'
import { MobileModal } from './MobileModal'
import { DesktopPopper } from './DesktopPopper'
import { useAtom } from 'jotai'
import { moreButtonMenuArray } from './moreButtonMenuArray'
import { playlistAtom } from '../../store'
import { watchLaterAtom } from '../../store'
import { useHistory } from 'react-router-dom'
import { supabase } from '../../supabaseClient.ts'

export const MoreButton = ({ isSearchPage, video }) => {
  const history = useHistory();
  const isMobileView = useIsMobileView()
  const [playlist, setPlaylist] = useAtom(playlistAtom)
  const [watchLater, setWatchLater] = useAtom(watchLaterAtom)
  
  const currentUserRole = localStorage.getItem('role') || 'user'

  const isInPlaylist = playlist.some(v => v.id === video?.id)
  const isInWatchLater = watchLater.some(v => v.id === video?.id)

  // build dynamic menu from base config
  const dynamicMenuArray = moreButtonMenuArray.map((item) => {
    if (item.action === 'togglePlaylist') {
      return {
        ...item,
        text: isInPlaylist ? item.altText : item.defaultText,
        Icon: isInPlaylist ? DeleteOutlineIcon : item.defaultIcon,
      }
    }
    if (item.action === 'toggleWatchLater') {
      return {
        ...item,
        text: isInWatchLater ? item.altText : item.defaultText,
        Icon: isInWatchLater ? DeleteOutlineIcon : item.defaultIcon,
      }
    }
    if (item.action === 'edit') {
      if (currentUserRole !== 'AdminIsNana') return null
      return { 
        ...item, 
        text: item.defaultText, 
        Icon: item.defaultIcon, 
        onClick: () => history.push(`/edit-video/${video.id}`) }
    }
    return item
  }).filter(Boolean)

  // states for Modal in mobile view
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleModalClose = () => setIsModalOpen(false)

  // states for popup menu in desktop view
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const anchorRef = useRef(null)

  const handlePopupClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setIsPopupOpen(false)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setIsPopupOpen(false)
    }
  }

  // toggle actions
  const handleMenuClick = (item) => {
    if (item.action === 'togglePlaylist' && video?.id) {
      setPlaylist(prev => {
        const exists = prev.some(v => v.id === video.id)
        return exists ? prev.filter(v => v.id !== video.id) : [...prev, video]
      })
    }

    if (item.action === 'toggleWatchLater' && video?.id) {
      setWatchLater(prev => {
        const exists = prev.some(v => v.id === video.id)
        return exists ? prev.filter(v => v.id !== video.id) : [...prev, video]
      })
    }
    if (item.onClick) item.onClick()
      
    setIsPopupOpen(false)
    setIsModalOpen(false)
  }

  // what is triggered onClick depends on the view
  const handleMoreIconClick = () => {
    if (isMobileView) {
      setIsModalOpen(true)
    } else {
      // toggle if desktop view
      setIsPopupOpen((prevOpen) => !prevOpen)
    }
  }

  return (
    <StyledIconButton disableRipple={true}>
      <MoreVertIcon
        ref={anchorRef}
        onClick={handleMoreIconClick}
        style={{ color: 'rgb(144, 144, 144)' }}
      />

      {/* desktop popper */}
      <DesktopPopper
        {...{ isPopupOpen, anchorRef, handlePopupClose, handleListKeyDown }}
        onMenuClick={handleMenuClick}
        menuArray={dynamicMenuArray}
      />

      {/* mobile modal */}
      <MobileModal
        {...{ isModalOpen, handleModalClose, isSearchPage }}
        onMenuClick={handleMenuClick}
        menuArray={dynamicMenuArray}
      />
    </StyledIconButton>
  )
}
