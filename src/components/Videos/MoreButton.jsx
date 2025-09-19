import React, { useState, useRef } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import { StyledIconButton } from './VideoCard'
import { useIsMobileView } from '../../utils/utils'
import { MobileModal } from './MobileModal'
import { DesktopPopper } from './DesktopPopper'
import { useAtom } from 'jotai'
import { watchLaterAtom } from '../../store'

export const MoreButton = ({ isSearchPage, video }) => {
  const isMobileView = useIsMobileView()
  const [watchLater, setWatchLater] = useAtom(watchLaterAtom)
  
  const isInWatchLater = watchLater.some(v => v.id === video?.id);
  // generate dynamic menu based on watch later status
  const dynamicMenuArray = [
    {
      text: isInWatchLater ? 'Remove from Watch Later' : 'Save to Watch Later',
      Icon: isInWatchLater ? DeleteOutlineIcon : QueryBuilderIcon,
      action: 'toggleWatchLater',
    },
  ]

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

  // 🔑 toggle Watch Later
  const handleMenuClick = (item) => {
    if ((item === 'Save to Watch Later' || item === 'Remove from Watch Later') && video?.id) {
      setWatchLater(prev => {
        const exists = prev.some(v => v.id === video.id);
        if (exists) return prev.filter(v => v.id !== video.id);
        return [...prev, video];
      });
    }
    setIsPopupOpen(false);
    setIsModalOpen(false);
  };

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
