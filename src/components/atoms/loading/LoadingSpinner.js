import React from 'react'
import tw from 'twin.macro'

function LoadingSpinner({ className }) {
  return (
    <StyledSvg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    />
  )
}

const StyledSvg = tw.svg`animate-spin m-auto rounded-full h-5 w-5 border-t-2 border-b-2 border-white`

export default LoadingSpinner
