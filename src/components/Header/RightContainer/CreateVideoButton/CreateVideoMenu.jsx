import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Menu from '@material-ui/core/Menu'
import ListItemText from '@material-ui/core/ListItemText'
import {
  DEFAULT_FONT_SIZE,
  StyledMenuItem,
  StyledListItemIcon,
} from '../../../../utils/utils'
import { createVideoMenuItems } from './createVideoMenuItems'
import UploadVideoModal from './UploadVideoModal'

const CreateVideoMenu = ({ anchorVideoButton, handleVideoMenuClose }) => {
  const [openUpload, setOpenUpload] = useState(false);

  const handleOpenUpload = () => {
    setOpenUpload(true);
    handleVideoMenuClose(); // close menu
  };

  const handleCloseUpload = () => setOpenUpload(false);

  return (
    <>
      <VideoMenu
        anchorEl={anchorVideoButton}
        open={Boolean(anchorVideoButton)}
        onClose={handleVideoMenuClose}
      >
        {createVideoMenuItems.map(({ Icon, text }) => {
          const handleClick =
            text === "Upload video" ? handleOpenUpload : handleVideoMenuClose;

          return (
            <StyledMenuItem key={text} onClick={handleClick}>
              <StyledListItemIcon>
                <Icon fontSize="small" />
              </StyledListItemIcon>
              <ListItemText primary={text} />
            </StyledMenuItem>
          );
        })}
      </VideoMenu>

      <UploadVideoModal open={openUpload} handleClose={handleCloseUpload} />
    </>
  );
};

export default CreateVideoMenu;

const VideoMenu = styled(({ className, ...props }) => (
  <Menu
    {...props}
    classes={{ paper: className }}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    PaperProps={{ square: true }}
    transitionDuration={0}
    elevation={0}
  />
))`
  border: 1px solid #d3d4d5;

  .MuiTypography-body1 {
    font-size: ${DEFAULT_FONT_SIZE}px;
  }
`;
