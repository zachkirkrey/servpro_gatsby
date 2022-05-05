import React from 'react'
import tw, { styled } from 'twin.macro'
import { graphql } from 'gatsby'
import Container from '@atoms/Container'
import QuicklinksAlt from '@blocks/QuicklinksAlt'
import Breadcrumbs from '@sections/Breadcrumbs'
import RichTextEditorStyles from '@utils/RichTextEditorStyles'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'

const ServicesDetail = ({ data }) => {
  const { headline, copy, quicklinks } = data
  const hasQuickLinks = quicklinks?.links?.length > 0

  return (
    <Background>
      <StyledContainer>
        <ContentWrapLeft>
          <Breadcrumbs tw="mb-3" />
          <Headline
            dangerouslySetInnerHTML={{ __html: apCaseOnlyTitleTags(headline) }}
          />
          <Copy
            css={RichTextEditorStyles}
            dangerouslySetInnerHTML={{ __html: copy }}
          />
        </ContentWrapLeft>
        <ContentWrapRight>
          {hasQuickLinks && <QuicklinksAlt data={quicklinks} />}
        </ContentWrapRight>
      </StyledContainer>
    </Background>
  )
}

const Background = tw.div`relative bg-gray-100 z-10 pb-12 py-8 md:py-16`

const StyledContainer = tw(Container)`
  lg:(flex flex-row justify-between)
`
const ContentWrapLeft = styled.div`
  ${tw`lg:(w-1/2)`};
`

const ContentWrapRight = styled.div`
  ${tw`lg:(w-1/2) flex flex-col justify-start`};
`

const Headline = tw.h2`text-4xl leading-none mb-5 mx-auto lg:(text-54px)`
const Copy = tw.div`text-lg mx-auto lg:(text-xl max-w-3xl) whitespace-pre-line`

export const query = graphql`
  fragment ServicesDetailData on CmsPageBuilderBlocks {
    services_detail {
      headline
      copy
      quicklinks {
        heading
        links {
          href
          title
        }
      }
    }
  }
`

export default ServicesDetail
