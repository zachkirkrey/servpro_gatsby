import tw, { styled } from 'twin.macro'
import React from 'react'

function CloseButton(props) {
  return (
    <StyledCloseButton {...props}>
      <CloseButtonRow />
      <CloseButtonRow />
    </StyledCloseButton>
  )
}

const StyledCloseButton = styled.button`
  ${tw`absolute w-8 h-8 z-30`}

  &:focus:not(:focus-visible) {
    outline: none;
  }
`

const CloseButtonRow = styled.div`
  width: 3px;
  height: 30px;
  ${tw`absolute top-0 right-1/2 transform rotate-45 bg-trueGray-300`}
  &:last-of-type {
    ${tw`-rotate-45`}
  }
`

export default CloseButton
