import React from 'react'
import { moreButtonMenuArray } from './moreButtonMenuArray'
import { PopperRow } from './PopperRow'
import { useLocation } from 'react-router'

export const PopperMenuBottom = ({ onClick }) => {
  const currentLocation = useLocation()
  const isInSearchResultsPage = currentLocation.pathname === '/results'

  // in desktop view search page, only `Report` row appears in bottom part of popper menu
  const arrayToLoop = isInSearchResultsPage
    ? moreButtonMenuArray.slice(-1)
    : moreButtonMenuArray.slice(6)

    // change to 3 if need the moreButtonMenuArray to display all

  return arrayToLoop.map(({ Icon, text }, ind) => {
    return <PopperRow key={`${ind}-${text}`} {...{ Icon, text, onClick }} />
  })
}
