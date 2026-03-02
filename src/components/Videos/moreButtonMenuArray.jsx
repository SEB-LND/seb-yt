import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

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
  {
    action: 'edit',
    defaultText: 'Edit',
    defaultIcon: EditIcon,
    onlyForOwner: true,
  },
  {
    action: 'delete',
    defaultText: 'Delete',
    defaultIcon: DeleteIcon,
    onlyForOwner: true,
  },
  // { Icon: BlockIcon, text: 'Not interested' },
  // { Icon: RemoveCircleOutlineIcon, text: "Don't recommend channel" },
  // { Icon: FlagOutlinedIcon, text: 'Report' },
]
