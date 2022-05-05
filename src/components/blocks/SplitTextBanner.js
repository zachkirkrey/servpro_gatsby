import React from 'react'
import tw, { styled } from 'twin.macro'
import { graphql } from 'gatsby'
import Button from '@atoms/Button'
import Container from '@atoms/Container'
import Breadcrumbs from '@sections/Breadcrumbs'
import RichTextEditorStyles from '@utils/RichTextEditorStyles'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'

const SplitTextBanner = ({ data }) => {
  const { settings, headlines, left, right } = data
  const { headline: titleHeadline, subheadline: titleSubheadline } = headlines
  const { headline: leftHeadline, copy: leftCopy, link: leftLink } = left
  const { headline: rightHeadline, copy: rightCopy, link: rightLink } = right

  const hasBreadcrumbs = !!settings?.has_breadcrumbs
  const hideBackground = !!settings?.hide_background
  const darkMode = !!settings?.dark_mode

  return (
    <Background isDarkMode={darkMode} isHideBackground={hideBackground}>
      <StyledContainer hasBreadcrumbs={hasBreadcrumbs}>
        {hasBreadcrumbs && (
          <div tw="mb-3">
            <Breadcrumbs />
          </div>
        )}

        <div tw="mb-16">
          {!!titleHeadline && (
            <h2 tw="text-4xl leading-none mb-5 mx-auto lg:(text-54px)">
              {titleHeadline}
            </h2>
          )}
          {!!titleSubheadline && (
            <div
              tw="text-lg lg:(text-xl max-w-3xl)"
              css={RichTextEditorStyles}
              dangerouslySetInnerHTML={{ __html: titleSubheadline }}
            />
          )}
        </div>
        <ContentWrap>
          <SplitColLeft>
            <h3 tw="text-4xl text-primary leading-none mb-5 mx-auto lg:(text-36px)">
              {apCaseOnlyTitleTags(leftHeadline)}
            </h3>
            <Copy
              tw="lg:mb-4"
              css={RichTextEditorStyles}
              dangerouslySetInnerHTML={{ __html: leftCopy }}
            />
            {!!leftLink?.href && (
              <div tw="flex mt-8 lg:mt-auto">
                <Button to={leftLink.href}>{leftLink.title}</Button>
              </div>
            )}
          </SplitColLeft>
          <SplitColRight>
            <h3 tw="text-4xl text-primary leading-none mb-5 mx-auto lg:(text-36px)">
              {apCaseOnlyTitleTags(rightHeadline)}
            </h3>
            <Copy
              tw="lg:mb-4"
              css={RichTextEditorStyles}
              dangerouslySetInnerHTML={{ __html: rightCopy }}
            />
            {!!rightLink?.href && (
              <div tw="flex mt-8 lg:mt-auto">
                <Button to={rightLink.href}>{rightLink.title}</Button>
              </div>
            )}
          </SplitColRight>
        </ContentWrap>
      </StyledContainer>
    </Background>
  )
}

const Background = styled.div(({ isHideBackground, isDarkMode }) => [
  isHideBackground ? tw`bg-white` : tw`bg-gray-100`,
  isDarkMode && tw`bg-primary-black text-white`
])
const ContentWrap = tw.div`relative flex flex-col flex-nowrap mx-auto xl:(flex-row)`
const StyledContainer = styled(Container)(({ hasBreadcrumbs }) => [
  hasBreadcrumbs ? tw`pt-2 pb-4 md:(pb-16 pt-6)` : tw`py-10 md:py-16`
])
const SplitColLeft = tw.div`flex flex-col relative mx-auto mb-8 xl:(w-1/2 flex-shrink-0 m-0 pr-8)`
const SplitColRight = tw.div`flex flex-col relative mx-auto xl:(w-1/2 flex-shrink-0 m-0 pl-8)`
const Copy = styled.div`
  ${tw`text-lg lg:(text-xl max-w-3xl)`}

  p a img {
    width: 100%;
    max-width: 150px;
  }
`

export const query = graphql`
  fragment SplitTextBannerData on CmsPageBuilderBlocks {
    split_text_banner {
      settings {
        dark_mode
        has_breadcrumbs
        hide_background
      }
      headlines {
        headline
        subheadline
      }
      left {
        headline
        copy
        link {
          href
          title
        }
      }
      right {
        headline
        copy
        link {
          href
          title
        }
      }
    }
  }
`

export default SplitTextBanner
