import React from 'react'
import tw, { styled } from 'twin.macro'
import { graphql } from 'gatsby'
import Container from '@atoms/Container'
import Button from '@atoms/Button'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'
import AccessibleLink from '@atoms/AccessibleLink'
import ArticleCard from '@sections/ArticleCard'
import Accordion from '@atoms/Accordion'
import RichTextEditorStyles from '@utils/RichTextEditorStyles'
import paddingDefault from '@utils/paddingDefault'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'

const IconBullets = ({ data }) => {
  const {
    headline,
    subheadline,
    copy,
    blurbs,
    settings,
    button_link,
    spacing
  } = data
  const { dark_mode, one_column, number_of_grid_columns, style } = settings

  function renderLink(link, link_as_text) {
    if (!link || !link.title) {
      return null
    }

    let innerJsx

    if (link_as_text) {
      innerJsx = (
        <AccessibleLink
          className="hover-default"
          tw="text-primary"
          small
          to={link.href}>
          {link.title}
        </AccessibleLink>
      )
    } else {
      innerJsx = (
        <Button small to={link.href}>
          {link.title}
        </Button>
      )
    }

    return <div tw="flex justify-start mt-3">{innerJsx}</div>
  }

  function renderAsCards() {
    return (
      <BlurbsWrap
        isDarkMode={dark_mode}
        isOneColumn={one_column}
        numberOfGridColumns={number_of_grid_columns}>
        {blurbs.map(blurb => {
          const { heading, content, icon, link } = blurb
          return (
            <ArticleCard
              key={heading}
              article={{
                title: heading,
                featured_image: icon,
                content,
                url: link.href
              }}
            />
          )
        })}
      </BlurbsWrap>
    )
  }

  function renderAsAccordion() {
    const questions = blurbs.map(({ heading, content, icon, link }) => {
      return {
        question: heading,
        answer: content,
        icon,
        url: link.href
      }
    })
    return (
      <Accordion
        faqs={{
          questions: [{ questions }]
        }}
        onDark={dark_mode}
      />
    )
  }

  function renderAsDefault() {
    return (
      <BlurbsWrap
        isDarkMode={dark_mode}
        isOneColumn={one_column}
        numberOfGridColumns={number_of_grid_columns}>
        {blurbs.map(blurb => {
          const {
            heading,
            content,
            icon,
            responsive,
            // icon_on_left,
            link,
            link_as_text
          } = blurb
          const icon_on_left = true
          return (
            <Blurb
              key={heading}
              isDarkMode={dark_mode}
              isOneColumn={one_column}
              iconIsOnLeft={icon_on_left}>
              {!!icon?.url && (
                <IconWrap
                  iconIsOnLeft={icon_on_left}
                  isDarkMode={dark_mode}
                  isOneColumn={one_column}
                  isResponsive={!!responsive}>
                  <SvgSafeGatsbyImage image={icon} alt={icon.title} />
                </IconWrap>
              )}
              <div>
                {heading && (
                  <BlurbHeading isDarkMode={dark_mode}>
                    {apCaseOnlyTitleTags(heading)}
                  </BlurbHeading>
                )}
                <BlurbContent
                  isDarkMode={dark_mode}
                  css={RichTextEditorStyles}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
                {renderLink(link, link_as_text)}
              </div>
            </Blurb>
          )
        })}
      </BlurbsWrap>
    )
  }

  function renderItems() {
    switch (style) {
      case 'default':
        return renderAsDefault()
      case 'cards':
        return renderAsCards()
      case 'accordion':
        return renderAsAccordion()
      default:
        return renderAsDefault()
    }
  }

  return (
    <BulletsSection isDarkMode={dark_mode} css={paddingDefault(spacing)}>
      <Container>
        <ContentWrap isOneColumn={one_column}>
          <HeadingWrap isDarkMode={dark_mode} isOneColumn={one_column}>
            {subheadline && (
              <SubHeading
                isOneColumn={one_column}
                isDarkMode={dark_mode}
                dangerouslySetInnerHTML={{
                  __html: apCaseOnlyTitleTags(subheadline)
                }}
              />
            )}
            <Heading
              isOneColumn={one_column}
              isDarkMode={dark_mode}
              dangerouslySetInnerHTML={{
                __html: apCaseOnlyTitleTags(headline)
              }}
            />
            {copy && (
              <Copy
                isDarkMode={dark_mode}
                css={RichTextEditorStyles}
                dangerouslySetInnerHTML={{ __html: copy }}
              />
            )}
          </HeadingWrap>
          {renderItems()}
          {button_link.title && (
            <div tw="flex justify-center pt-10 lg:(pt-36)">
              <Button to={button_link.href}>{button_link.title}</Button>
            </div>
          )}
        </ContentWrap>
      </Container>
    </BulletsSection>
  )
}

const Blurb = styled.div`
  ${({ isOneColumn, iconIsOnLeft }) => {
    return [
      isOneColumn
        ? tw`flex flex-col items-start lg:flex-row`
        : tw`flex items-start space-x-5`,
      !iconIsOnLeft && tw`lg:flex-col`,
      iconIsOnLeft && tw`flex-row`
    ]
  }}
`
const BlurbsWrap = styled.div(
  ({ isOneColumn, isDarkMode, numberOfGridColumns }) => {
    return [
      tw`grid grid-cols-1 gap-8 md:(grid-cols-2 gap-8) lg:w-full`,
      isOneColumn && tw`lg:grid-cols-3`,
      isDarkMode ? tw`lg:(gap-x-8 gap-y-8)` : tw`lg:(gap-x-12 gap-y-8)`,
      numberOfGridColumns === 4 && tw`lg:grid-cols-4 md:grid-cols-2 lg:gap-x-6`,
      numberOfGridColumns === 5 && tw`lg:grid-cols-5 md:grid-cols-2 lg:gap-x-6`
    ]
  }
)
const ContentWrap = styled.div(({ isOneColumn }) => [
  tw`flex flex-col`,
  !isOneColumn && tw`xl:(flex-row justify-between)`
])
const HeadingWrap = styled.div(({ isOneColumn }) => [
  tw`w-full mb-8`,
  !isOneColumn && tw`xl:(mr-20 mb-0 max-w-md)`
])
const BulletsSection = styled.div`
  ${({ isDarkMode }) => [
    isDarkMode ? tw`bg-primary-black text-white` : tw`text-primary-black`
  ]}
`
const Heading = styled.h2`
  ${({ isDarkMode, isOneColumn }) => [
    isDarkMode
      ? tw`text-32px text-primary`
      : tw`text-36px text-primary-black lg:text-32px`,
    !isDarkMode && isOneColumn && tw`text-primary`
  ]}
`
const SubHeading = styled.h3`
  letter-spacing: 2.57px;
  ${({ isDarkMode, isOneColumn }) => [
    isDarkMode ? tw`text-21px text-white` : tw`text-21px text-primary`,
    !isDarkMode && isOneColumn && tw`text-primary-black`
  ]}
`
const Copy = styled.div`
  ${({ isDarkMode }) => [
    isDarkMode ? tw`text-xl mt-7` : tw`text-xl xl:text-base whitespace-pre-line`
  ]}
`
const IconWrap = styled.div(
  ({ isResponsive, isOneColumn, isDarkMode, iconIsOnLeft }) => [
    tw`relative w-full mb-2 flex-shrink-0 md:(mb-0 -top-2)`,
    !isResponsive &&
      `max-width: 40px;
  @media (min-width: 1024px) {
    max-width: 64px;
  }
  `,
    !isOneColumn &&
      (`
  max-width: 40px;
  @media (min-width: 1024px) {
    min-width: 60px;
  }
  `,
      tw`md:top-0`),
    isDarkMode ? tw`md:mr-7` : tw`md:mr-1`,
    iconIsOnLeft && tw`mr-5`
  ]
)
const BlurbContent = styled.div`
  letter-spacing: 0.29px;
  ${tw`text-lg mb-auto lg:(leading-6)`};
  ${({ isDarkMode }) => !isDarkMode && tw`text-xl`};
  @media (min-width: 1025px) {
    ${({ isDarkMode }) => [
      isDarkMode
        ? `max-width: 262px; font-size: 1.25rem;`
        : `max-width: 255px; font-size: 1rem;`
    ]}
  }
`
const BlurbHeading = styled.h3(({ isDarkMode }) => [
  tw`mb-2 font-semibold text-lg lg:(text-xl)`,
  !isDarkMode && tw`text-xl mb-4 lg:(text-base mb-2)`
])

export const query = graphql`
  fragment IconBulletsData on CmsPageBuilderBlocks {
    icon_bullets {
      headline
      subheadline
      copy
      spacing {
        top_gutter
        bottom_gutter
      }
      settings {
        dark_mode
        one_column
        number_of_grid_columns
        style
      }
      blurbs {
        heading
        content
        icon {
          filename
          title
          url
          localAsset {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP])
            }
          }
        }
        responsive
        icon_on_left
        link {
          href
          title
        }
        link_as_text
      }
      button_link {
        href
        title
      }
    }
  }
`

export default IconBullets
