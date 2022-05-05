import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'

const SvgSafeGatsbyImage = ({ image, ...props }) => {
  // Expects { filename, title, url } for all + { localAsset } for non-SVG
  const { filename, localAsset, title, url } = image

  // Bulletproofing:
  const isSVG = () => {
    const path = filename ? filename : url
    return !!path && path.slice(-4) === '.svg'
  }

  const isGif = () => {
    const path = filename ? filename : url
    return !!path && path.slice(-4) === '.gif'
  }

  const altText = () => props.alt ?? title ?? ''

  // TODO: refactor nested ternaries
  // eslint-disable-next-line no-nested-ternary
  return isSVG() || isGif() || !localAsset ? (
    <img src={url} alt={altText()} {...props} />
  ) : getImage(localAsset) ? (
    <GatsbyImage image={getImage(localAsset)} alt={altText()} {...props} />
  ) : (
    <></>
  )
}

export default SvgSafeGatsbyImage
