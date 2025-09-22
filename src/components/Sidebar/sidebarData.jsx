import HomeIcon from '@material-ui/icons/Home'
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined'
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined'
import VideoLibraryOutlinedIcon from '@material-ui/icons/VideoLibraryOutlined'
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined'
import ShopOutlinedIcon from '@material-ui/icons/ShopOutlined'
import PlaylistPlayOutlinedIcon from '@material-ui/icons/PlaylistPlayOutlined'
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined'
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined'
import YouTubeIcon from '@material-ui/icons/YouTube'
import VideogameAssetOutlinedIcon from '@material-ui/icons/VideogameAssetOutlined'
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna'
import SportsHandballOutlinedIcon from '@material-ui/icons/SportsHandballOutlined'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined'
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined'
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined'
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined'

export const sideBarShowMore = [
  { Icon: ExpandMoreOutlinedIcon, text: 'Show more' },
]

export const sideBarShowLess = [
  { Icon: ExpandLessOutlinedIcon, text: 'Show less' },
]

export const sideBarMenuRows = [
  { Icon: HomeIcon, text: 'Home', path: '/' },
  // { Icon: ExploreOutlinedIcon, text: 'Explore' },
  // { Icon: SubscriptionsOutlinedIcon, text: 'Subscriptions' },
  // { Icon: VideoLibraryOutlinedIcon, text: 'Library' },
  // { Icon: ShopOutlinedIcon, text: 'Your videos' },
  { Icon: PlaylistPlayOutlinedIcon, text: 'Playlists', path: '/playlist' },
  { Icon: QueryBuilderOutlinedIcon, text: 'Watch Later', path: '/watch-later' },
]

export const moreFromYouTubeRows = [
  { Icon: YouTubeIcon, text: 'YouTube Premium' },
  { Icon: VideogameAssetOutlinedIcon, text: 'Gaming' },
  { Icon: SettingsInputAntennaIcon, text: 'Live' },
  { Icon: SportsHandballOutlinedIcon, text: 'Sport' },
  { Icon: SettingsOutlinedIcon, text: 'Settings' },
  { Icon: FlagOutlinedIcon, text: 'Report history' },
  { Icon: HelpOutlineOutlinedIcon, text: 'Help' },
  { Icon: FeedbackOutlinedIcon, text: 'Send feedback' },
]

// mobile footer uses the same array
export const miniSidebarRows = [
  { Icon: HomeIcon, text: 'Home' },
  // { Icon: ExploreOutlinedIcon, text: 'Explore' },
  // { Icon: SubscriptionsOutlinedIcon, text: 'Subscriptions' },
  // { Icon: VideoLibraryOutlinedIcon, text: 'Library' },
]
