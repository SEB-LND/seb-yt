import React from 'react'
import styled from 'styled-components/macro'
import Chip from '@material-ui/core/Chip'
import channels from './chipsArray'

export const ChipsBar = ({ selectedChipIndex, setSelectedChipIndex }) => {
  return (
    <ChipsContainer>
      {channels.map((channel, index) => (
        <StyledChip
          key={channel.label}
          label={channel.label}
          onClick={() => setSelectedChipIndex(index)}
          color={selectedChipIndex === index ? 'primary' : 'default'}
        />
      ))}
    </ChipsContainer>
  )
}

const ChipsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 12px 0;
  background-color: #ffffff;
  position: sticky;
  top: 56px;
  z-index: 2;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const StyledChip = styled(Chip)`
  && {
    margin: 0 4px;
    height: 32px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 16px;

    &:first-child {
      margin-left: 24px;
    }

    &:last-child {
      margin-right: 24px;
    }
  }
`;

export default ChipsBar;
