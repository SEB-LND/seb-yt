import React, { useState, useRef } from 'react'
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
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";

export const MoreButton = ({ isSearchPage, video }) => {
  const history = useHistory();
  const isMobileView = useIsMobileView()
  const [playlist, setPlaylist] = useAtom(playlistAtom)
  const [watchLater, setWatchLater] = useAtom(watchLaterAtom)

  const currentUserRole = localStorage.getItem('role') || 'user'

  const isInPlaylist = playlist.some(v => v.id === video?.id)
  const isInWatchLater = watchLater.some(v => v.id === video?.id)

  // state for delete confirmation popup
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  // build dynamic menu
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

    // EDIT - Only Admin
    if (item.action === 'edit') {
      if (currentUserRole !== 'AdminIsNana') return null
      return {
        ...item,
        text: item.defaultText,
        Icon: item.defaultIcon,
        onClick: () => history.push(`/edit-video/${video.id}`)
      }
    }

    // DELETE - Only Admin
    if (item.action === 'delete') {
      if (currentUserRole !== 'AdminIsNana') return null
      return {
        ...item,
        text: item.defaultText,
        Icon: item.defaultIcon,
        onClick: () => setIsDeleteOpen(true)
      }
    }

    return item
  }).filter(Boolean)

  // Mobile modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleModalClose = () => setIsModalOpen(false)

  // Desktop popup state
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const anchorRef = useRef(null)
  const handlePopupClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return
    setIsPopupOpen(false)
  }
  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      setIsPopupOpen(false)
    }
  }

  // handle actions
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

  const handleMoreIconClick = () => {
    if (isMobileView) {
      setIsModalOpen(true)
    } else {
      setIsPopupOpen(prev => !prev)
    }
  }

  // Confirm delete handler
  const handleConfirmDelete = async () => {
    const { error } = await supabase
      .from('videos')
      .delete()
      .eq('id', video.id)

    if (error) {
      console.error("Delete error:", error)
      alert("Failed to delete video.")
      return
    }

    alert("Video deleted successfully.")
    setIsDeleteOpen(false)
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

      {/* Small Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Video</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this video? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteOpen(false)} color="default">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </StyledIconButton>
  )
}
