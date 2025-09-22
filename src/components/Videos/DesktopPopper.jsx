import React from 'react'
import {
  ClickAwayListener,
  MenuList,
  Paper,
  Popper,
  MenuItem,
} from '@material-ui/core'

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
            {menuArray.map((item) => (
              <MenuItem key={item.action} onClick={() => onMenuClick(item)}>
                {item.Icon && <item.Icon style={{ marginRight: 8 }} />}
                {item.text}
              </MenuItem>
            ))}
          </MenuList>
        </ClickAwayListener>
      </Paper>
    </Popper>
  )
}
