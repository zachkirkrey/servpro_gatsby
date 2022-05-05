import React from 'react'
import tw, { styled } from 'twin.macro'
import { graphql } from 'gatsby'
import Container from '@atoms/Container'
import Breadcrumbs from '../sections/Breadcrumbs'
import Button from '../atoms/Button'
import RichTextEditorStyles from '@utils/RichTextEditorStyles'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'
import paddingDefault from '@utils/paddingDefault'

const TextBanner = ({ data }) => {
  const { headline, subheadline, copy, link, settings, spacing } = data

  const hasBreadcrumbs = !!settings?.has_breadcrumbs
  const hideBackground = !!settings?.hide_background
  const darkMode = !!settings?.dark_mode
  const headlineCenter = !!settings?.headline_center
  const textCenter = !!settings?.copy_center

  return (
    <Background
      isDarkMode={darkMode}
      isHideBackground={hideBackground}
      css={paddingDefault(spacing)}>
      <StyledContainer isHaveBreadscrumbs={hasBreadcrumbs}>
        <ContentWrap>
          <div tw="mb-3">{hasBreadcrumbs && <Breadcrumbs />}</div>
          <Heading
            headlineCenter={headlineCenter}
            isCopy={!!copy}
            dangerouslySetInnerHTML={{ __html: apCaseOnlyTitleTags(headline) }}
          />
          {subheadline && (
            <Subheading
              subheadlineCenter={headlineCenter}
              css={RichTextEditorStyles}
              dangerouslySetInnerHTML={{ __html: subheadline }}
            />
          )}
          <Copy
            textCenter={textCenter}
            css={RichTextEditorStyles}
            dangerouslySetInnerHTML={{ __html: copy }}
          />
          {!!link && !!link?.href && !!link?.title && (
            <div tw="flex lg:justify-center mt-7">
              <Button to={link.href}>{link.title}</Button>
            </div>
          )}
        </ContentWrap>
      </StyledContainer>
    </Background>
  )
}

const Background = styled.div(({ isHideBackground, isDarkMode }) => [
  isHideBackground ? tw`bg-white` : tw`bg-gray-100`,
  isDarkMode && tw`bg-primary-black text-white`
])
const ContentWrap = styled.div(({ textCenter }) => [
  textCenter && tw`lg:text-center`
])
const StyledContainer = styled(Container)(() => [])
const Heading = styled.h2(({ headlineCenter, isCopy }) => [
  tw`text-4xl leading-none mx-auto lg:(text-54px)`,
  isCopy && tw`pb-5`,
  headlineCenter && tw`text-center`
])
const Subheading = styled.h4(({ subheadlineCenter }) => [
  tw`text-xl leading-none mb-5 lg:(text-3xl)`,
  subheadlineCenter && tw`text-center`
])
const Copy = styled.div(({ textCenter }) => [
  tw`text-lg mx-auto lg:(text-xl) whitespace-pre-line`,
  textCenter && tw`text-center lg:max-w-3xl`
])

export const query = graphql`
  fragment TextBannerData on CmsPageBuilderBlocks {
    text_banner {
      headline
      subheadline
      copy
      spacing {
        top_gutter
        bottom_gutter
      }
      link {
        href
        title
      }
      settings {
        headline_center
        copy_center
        dark_mode
        has_breadcrumbs
        hide_background
      }
    }
  }
`

export default TextBanner
