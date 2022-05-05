import React from 'react'
import { graphql } from 'gatsby'
import tw, { styled } from 'twin.macro'
import Container from '@atoms/Container'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'
import paddingDefault from '@utils/paddingDefault'

const InsurerGrid = ({ data }) => {
  const { insurers } = data

  return (
    <InsurerGridSection css={paddingDefault()}>
      <Container>
        <GridWrap>
          {insurers.map(insurer => (
            <GridItem key={insurer.name}>
              {!!insurer.logo && (
                <InsurerLogo image={insurer.logo} alt={insurer?.logo?.title} />
              )}
              <div tw="px-4">
                <InsurerName>{insurer.name}</InsurerName>
                <div tw="mb-4">
                  <div tw="h-px w-12 bg-secondary" />
                </div>
                <p tw="text-lg leading-6">{insurer.excerpt}</p>
              </div>
            </GridItem>
          ))}
        </GridWrap>
      </Container>
    </InsurerGridSection>
  )
}

const InsurerGridSection = tw.section``
const GridWrap = tw.ul`grid grid-cols-1 gap-10 md:(grid-cols-2) lg:(grid-cols-3 gap-9)`
const GridItem = tw.li`flex-initial w-full shadow-md px-2 pt-3 pb-10`
const InsurerLogo = styled(SvgSafeGatsbyImage)`
  aspect-ratio: 12 / 10;
  ${tw`mb-4 w-full`}
`
const InsurerName = tw.h3`text-primary text-2xl mb-1`

export const query = graphql`
  fragment InsurerGridData on CmsPageBuilderBlocks {
    insurer_grid {
      insurers {
        name
        excerpt
        logo {
          filename
          title
          url
          localAsset {
            childImageSharp {
              gatsbyImageData(
                width: 280
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
          }
        }
      }
    }
  }
`

export default InsurerGrid
