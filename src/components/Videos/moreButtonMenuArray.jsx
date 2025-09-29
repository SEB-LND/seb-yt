import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'
import BlockIcon from '@material-ui/icons/Block'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined'

export const moreButtonMenuArray = [
  // { Icon: PlaylistPlayIcon, text: 'Add to queue' },
  {
    action: 'togglePlaylist',
    defaultText: 'Save to Playlist',
    altText: 'Remove from Playlist',
    defaultIcon: PlaylistPlayIcon,
  },
  {
    action: 'toggleWatchLater',
    defaultText: 'Save to Watch Later',
    altText: 'Remove from Watch Later',
    defaultIcon: QueryBuilderIcon,
  },

  // { Icon: BlockIcon, text: 'Not interested' },
  // { Icon: RemoveCircleOutlineIcon, text: "Don't recommend channel" },
  // { Icon: FlagOutlinedIcon, text: 'Report' },
]
