import React from 'react'
import Lottie from 'react-lottie'

const WaterAnimatedIcon = ({ animationData }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return <Lottie options={defaultOptions} width={60} />
}

export default WaterAnimatedIcon
