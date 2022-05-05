import React from 'react'
import tw, { styled } from 'twin.macro'

const NumberBlock = ({ children }) => {
  return (
    <NumberBlockWrapper className="font-family-video">
      {children}
    </NumberBlockWrapper>
  )
}

const NumberBlockWrapper = styled.div`
  color: #75b32c;
  font-size: 22px;
  letter-spacing: 0.27em;
  opacity: 0.9;
  font-weight: 500;
  ${tw`hidden lg:block`}
`

export default NumberBlock
