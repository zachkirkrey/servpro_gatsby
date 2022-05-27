import React, { useState } from 'react'
import { useLocation } from '@reach/router'
import AccessibleLink from '@atoms/AccessibleLink'
import tw, { styled } from 'twin.macro'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'
import { graphql } from 'gatsby'
import format from 'date-fns/format'

import { ReactComponent as FacebookIcon } from '../images/svg/article-fb.svg'
import { ReactComponent as TwitterIcon } from '../images/svg/article-twitter.svg'
import { ReactComponent as LinkIcon } from '../images/svg/article-link.svg'
import RichTextEditorStyles from '../components/utils/RichTextEditorStyles'
import Layout from '@components/Layout'
import Container from '@atoms/Container'
import PageTitle from '@atoms/PageTitle'
import Breadcrumbs from '@sections/Breadcrumbs'
import NearestVertical from '@blocks/NearestVertical'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'
import { BREAKPOINT_SM } from '@constants/constants'
import Seo from '../components/utils/Seo'

const ArticlePage = ({ data, pageContext }) => {
  const {
    title,
    show_date,
    authors,
    content,
    featured_image,
    publish_details,
    sidebar_widgets,
    seo
  } = data.cmsArticle || data.cmsPressRelease || {}
  const { hasLocationWidget } = pageContext
  const { time: publish_time } = publish_details
  const location = useLocation()
  const [CopyAlertVisible, setCopyAlertVisible] = useState(false)

  React.useEffect(() => {
    if (Number(document.documentElement.clientWidth) > BREAKPOINT_SM) {
      document.body.style.overflowX = ''
      document.documentElement.style.overflowX = ''
    }
  }, [])

  return (
    <Layout>
      <Seo
        title={seo?.meta_title || title}
        description={seo?.meta_description}
        imageUrl={seo?.meta_image?.url}
      />
      <Container>
        <Breadcrumbs />
        <PageTitle tw="mb-3 lg:w-2/3 xl:w-3/5">
          {title || 'Untitled Article'}
        </PageTitle>
        <ContentWrap>
          <Article>
            <ArticleMeta>
              {!!show_date && !!publish_time && (
                <ArticleDate>
                  {format(new Date(publish_time), 'yyyy-MM-dd k:mm').toString()}
                </ArticleDate>
              )}
              {!!authors && <ArticleAuthors>By {authors}</ArticleAuthors>}
            </ArticleMeta>
            <ArticleShares>
              <ShareLinks>
                <span tw="font-semibold mr-4">Share: </span>
                <ShareLinkItem>
                  <ShareLink
                    to={`http://www.facebook.com/sharer.php?u=${location.href}`}
                    target="_blank">
                    <FacebookIcon />
                  </ShareLink>
                </ShareLinkItem>
                <ShareLinkItem>
                  <ShareLink
                    to={`http://twitter.com/share?text=${location.href}`}
                    target="_blank">
                    <TwitterIcon />
                  </ShareLink>
                </ShareLinkItem>
                <ShareLinkItem>
                  <ShareLink
                    onClick={() => {
                      setCopyAlertVisible(true)
                      navigator.clipboard.writeText(location.href)
                      setTimeout(() => setCopyAlertVisible(false), 700)
                    }}>
                    <LinkIcon />
                  </ShareLink>
                  <Alert visible={CopyAlertVisible}>Copied!</Alert>
                </ShareLinkItem>
              </ShareLinks>
            </ArticleShares>
            <div tw="my-6">
              {featured_image?.url && (
                <FeaturedImage
                  image={featured_image}
                  alt={featured_image.description}
                />
              )}
            </div>
            <Copy
              css={RichTextEditorStyles}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </Article>
          {hasLocationWidget && (
            <Sidebar>
              <div tw="pt-4 sticky top-5">
                <NearestVertical />
              </div>

              {!!sidebar_widgets &&
                sidebar_widgets.map(sb => (
                  <Widget key={sb.heading}>
                    <WidgetHeading>
                      {apCaseOnlyTitleTags(sb.heading)}
                    </WidgetHeading>
                    <WidgetCopy>{sb.copy}</WidgetCopy>
                  </Widget>
                ))}
            </Sidebar>
          )}
        </ContentWrap>
      </Container>
    </Layout>
  )
}

const ContentWrap = tw.div`lg:(flex flex-row justify-between)`

const Article = tw.article`lg:(flex-auto w-2/5 pr-24) xl:w-3/5`
const ArticleMeta = tw.div`mb-10 text-lg`
const ArticleDate = tw.p``
const ArticleAuthors = tw.p``

const ArticleShares = tw.div``
const ShareLinks = tw.ul`flex flex-row items-center mb-8`
const ShareLinkItem = tw.li`flex items-center justify-center`
const ShareLink = tw(
  AccessibleLink
)`inline-flex items-center py-2 px-3 text-primary`

const Copy = styled.div`
  ${tw`text-xl pb-8`}
`
const FeaturedImage = tw(SvgSafeGatsbyImage)`w-full`

const Sidebar = tw.aside`sticky lg:(flex-auto w-2/5)`
const Widget = tw.div`
  my-10 p-8
  bg-trueGray-100`
const WidgetHeading = tw.h2`
  text-2xl font-normal
`
const WidgetCopy = tw.p`py-2`
const Alert = styled.span(({ visible }) => [
  tw`block bg-primary-black text-white rounded opacity-0 ml-2 p-2 transition-opacity`,
  visible && tw`opacity-100`
])

export const query = graphql`
  query ($slug: String!) {
    cmsArticle(url: { eq: $slug }) {
      title
      url
      show_date
      authors
      content
      featured_image {
        filename
        title
        description
        url
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
      publish_details {
        time
      }
      settings {
        is_featured
        service_line {
          title
          icon {
            filename
            title
            url
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
      seo {
        meta_title
        meta_description
        meta_image {
          url
        }
      }
      sidebar_widgets {
        copy
        heading
      }
    }
    cmsPressRelease(url: { eq: $slug }) {
      title
      url
      show_date
      authors
      content
      featured_image {
        filename
        title
        description
        url
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
      publish_details {
        time
      }
      seo {
        meta_title
        meta_description
        meta_image {
          url
        }
      }
      sidebar_widgets {
        copy
        heading
      }
    }
  }
`

export default ArticlePage
