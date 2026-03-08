import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import Tooltip from '@material-ui/core/Tooltip'
import { TWO_COL_MIN_WIDTH } from '../../../utils/utils'
import { useIsMobileView } from '../../../utils/utils'

const YouTubeLogo = () => {
  const fullLogoUrl =
    'https://www.sarawakenergy.com/assets/images/general/logo.png'
  const smallLogoUrl =
    'https://www.sarawakenergy.com/assets/images/general/logo.png'

  const isMobileView = useIsMobileView()
  const currentLocation = useLocation()
  const isInSearchResultsPage = currentLocation.pathname === '/results'

  return (
    <Link to="/" className="header-home-link" data-header-home-link>
      <YouTubeLogoTooltip title="Sarawak Energy Videos">
        <YouTubeLogoContainer data-header-logo-wrap>
          <Logo
            src={
              isInSearchResultsPage && isMobileView ? smallLogoUrl : fullLogoUrl
            }
            alt="logo"
            width="60"
            height="20"
          />
        </YouTubeLogoContainer>
      </YouTubeLogoTooltip>
    </Link>
  )
}

export default YouTubeLogo

const YouTubeLogoTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))`
  /* it has to be popper in classes, then specify .MuiToolTip-tooltip, not sure why  */
  .MuiTooltip-tooltip {
    background-color: white;
    color: gray;
    border: 1px solid gray;
    font-size: 0.8rem;
    padding: 0.2rem 0.4rem;
    border-radius: 2px;
  }
`

const YouTubeLogoContainer = styled.div`
  border: none;
  background-color: transparent;
  height: 100%;
  display: flex;
  align-items: center;
`

const Logo = styled.img`
  margin: auto 1rem;
  width: 60px;
  height: 20px;
  cursor: pointer;
  @media screen and (min-width: ${TWO_COL_MIN_WIDTH}px) {
    margin: auto 16px;
  }
`
