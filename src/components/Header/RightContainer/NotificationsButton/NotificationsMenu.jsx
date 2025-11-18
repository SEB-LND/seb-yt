import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import Popover from '@material-ui/core/Popover'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { NotificationsHeader } from './NotificationsHeader'
import { NotificationsContent } from './NotificationsContent'
import { supabase } from '../../../../supabaseClient.ts'

const NotificationsMenu = ({
  anchorNotificationsButton,
  handleNotificationsMenuClose,
}) => {
  const [notifications, setNotifications] = useState([])

  // Fetch notifications when menu opens
  useEffect(() => {
    if (anchorNotificationsButton) fetchNotifications()
  }, [anchorNotificationsButton])

  const fetchNotifications = async () => {
    const { data, error } = await supabase
      .from('notifications')
      .select(`
        id,
        message,
        created_at,
        videos (
          title,
          thumbnailUrl,
          channelTitle
        )
      `)
      .order('created_at', { ascending: false })

    if (error) console.error(error)
    else setNotifications(data)
  }

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('global-notifications')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          setNotifications((prev) => [payload.new, ...prev])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <PopUpMenu
      anchorEl={anchorNotificationsButton}
      open={Boolean(anchorNotificationsButton)}
      onClose={handleNotificationsMenuClose}
    >
      <NotificationsContainer>
        <NotificationsHeader onClick={handleNotificationsMenuClose} />

        {notifications.length > 0 ? (
          <NotificationList>
            {notifications.map((n) => (
              <NotificationItem key={n.id}>
                <Thumbnail
                  src={n.videos?.thumbnailUrl}
                  alt={n.videos?.title || 'Video thumbnail'}
                />
                <NotificationDetails>
                  <Typography variant="subtitle2" style={{ fontWeight: 600 }}>
                    {n.videos?.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {n.videos?.channelTitle}
                  </Typography>
                  <TimeText>
                    {new Date(n.created_at).toLocaleString('en-MY', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </TimeText>
                </NotificationDetails>
              </NotificationItem>
            ))}
          </NotificationList>
        ) : (
          <EmptyContainer>
            <NotificationsContent />
          </EmptyContainer>
        )}
      </NotificationsContainer>
    </PopUpMenu>
  )
}

export default NotificationsMenu

// Styled Components

const NotificationList = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
`

const NotificationItem = styled(Box)`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #f5f5f5;
  }
`

const Thumbnail = styled.img`
  width: 100px;
  height: 56px;
  object-fit: cover;
  border-radius: 6px;
`

const NotificationDetails = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const TimeText = styled(Typography)`
  && {
    font-size: 12px;
    color: #757575;
    margin-top: 2px;
  }
`

const EmptyContainer = styled(Box)`
  text-align: center;
  padding: 48px 16px;
  color: rgba(0, 0, 0, 0.6);
`

const PopUpMenu = styled(({ className, ...props }) => (
  <Popover
    {...props}
    classes={{ paper: className }}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    PaperProps={{ square: false }}
    transitionDuration={200}
    elevation={6}
  />
))`
  && {
    border-radius: 12px;
    width: 400px;
    max-height: 600px;
    overflow: hidden;
    background: #fff;
  }

  .MuiPaper-root {
    color: #030303;
  }
`

const NotificationsContainer = styled(Paper)`
  && {
    max-width: 100%;
    max-height: 100%;
    border-radius: 12px;
    overflow-y: auto;
  }
`