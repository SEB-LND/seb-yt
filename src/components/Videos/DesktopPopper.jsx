import React from 'react'
import {
  ClickAwayListener,
  MenuList,
  Paper,
  Popper,
  MenuItem,
} from '@material-ui/core'
import { moreButtonMenuArray } from './moreButtonMenuArray'

export const DesktopPopper = ({
  isPopupOpen,
  anchorRef,
  handlePopupClose,
  handleListKeyDown,
  onMenuClick,
  menuArray = [],
}) => {
  return (
    <Popper
      open={isPopupOpen}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
    >
      <Paper>
        <ClickAwayListener onClickAway={handlePopupClose}>
          <MenuList
            dense
            autoFocusItem={isPopupOpen}
            onKeyDown={handleListKeyDown}
          >
            {menuArray.map(({ Icon, text }) => (
              <MenuItem key={text} onClick={() => onMenuClick(text)}>
                {Icon && <Icon style={{ marginRight: 8 }} />}
                {text}
              </MenuItem>
            ))}
          </MenuList>
        </ClickAwayListener>
      </Paper>
    </Popper>
  )
}
