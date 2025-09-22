import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const isSidebarDrawerOpenAtom = atom(false)

// default userSetting to show FullWidthSidebar
export const userSettingToShowFullSidebarAtom = atom(true)

export const searchTermAtom = atom('')
export const searchResultsAtom = atom(null)
export const playlistAtom = atomWithStorage('playlist', [])
export const watchLaterAtom = atomWithStorage('watchLater', [])
export const likedAtom = atomWithStorage('liked', [])