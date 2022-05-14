import React from 'react'
import { graphql } from 'gatsby'
import tw from 'twin.macro'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'
import Masonry from 'react-masonry-css'
import Container from '@atoms/Container'
import paddingDefault from '@utils/paddingDefault'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'

const breakpointColumnsObj = {
  default: 3,
  700: 2,
  500: 1
}

const Gallery = ({ data }) => {
  const { heading, subheading, images } = data

  return (
    <GallerySection css={paddingDefault()}>
      <Container>
        {(heading || subheading) && (
          <header tw="text-center mb-12">
            {heading && <h2 tw="text-42px">{apCaseOnlyTitleTags(heading)}</h2>}
            {subheading && (
              <p tw="text-primary">{apCaseOnlyTitleTags(subheading)}</p>
            )}
          </header>
        )}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid-column">
          {images.map((image, idx) => (
            <SvgSafeGatsbyImage
              key={idx}
              image={image}
              alt={image.description}
            />
          ))}
        </Masonry>
      </Container>
    </GallerySection>
  )
}

const GallerySection = tw.section``

export const query = graphql`
  fragment GalleryData on CmsPageBuilderBlocks {
    gallery {
      heading
      subheading
      images {
        filename
        title
        url
        description
        localAsset {
          childImageSharp {
            gatsbyImageData(
              width: 1440
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
  }
`

export default Gallery
