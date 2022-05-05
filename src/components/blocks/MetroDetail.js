import React from 'react'
import tw, { styled, css } from 'twin.macro'
import { graphql } from 'gatsby'
import RichTextEditorStyles from '@utils/RichTextEditorStyles'
import Container from '@atoms/Container'
import NearestMore from '@blocks/NearestMore'
import paddingDefault from '@utils/paddingDefault'

const MetroDetail = ({ data, disableNearby, nearbyData }) => {
  const { copy } = data

  return (
    <Background css={paddingDefault()}>
      <Container>
        <MetroDetailWrap>
          <CopyWrap
            fullWidth={disableNearby}
            css={RichTextEditorStyles}
            dangerouslySetInnerHTML={{ __html: copy }}
          />
          {!disableNearby && (
            <Sidebar disable={disableNearby}>
              <NearestMore maxItems={5} data={nearbyData} />
            </Sidebar>
          )}
        </MetroDetailWrap>
      </Container>
    </Background>
  )
}

const Background = styled.div`
  ${tw`relative bg-gray-100 z-10`}
`

const CopyWrap = styled.div(({ fullWidth }) => [
  tw`py-3 lg:py-12`,
  fullWidth
    ? tw``
    : css`
        @media (min-width: 1025px) {
          max-width: 500px;
        }
      `
])

const Sidebar = styled.aside``
const MetroDetailWrap = styled.div(() => [
  tw`flex flex-col-reverse items-start justify-between lg:flex-row`
])

export const query = graphql`
  fragment MetroDetailData on CmsPageBuilderBlocks {
    metro_detail {
      copy
    }
  }
`

export default MetroDetail
