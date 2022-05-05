import React from 'react'
import { graphql } from 'gatsby'
import tw, { styled } from 'twin.macro'
import Container from '@atoms/Container'
import ArticleCard from '@sections/ArticleCard'
import paddingDefault from '@utils/paddingDefault'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'

const MultiBlogroll = ({ data }) => {
  const { subblog: subblogs } = data

  return (
    <BlogrollSection css={paddingDefault()}>
      <Container tw="flex flex-wrap justify-between">
        {!!subblogs &&
          subblogs.map((subroll, i) => {
            const { articles } = subroll.articles[0] || []
            const { title } = subroll.articles[0]
            const isFull = articles.length === 4

            return (
              <BlogrollGridWrapper key={i} isFull={isFull}>
                {title && (
                  <BlogrollHeading>
                    {apCaseOnlyTitleTags(title)}
                  </BlogrollHeading>
                )}
                <BlogrollGrid isFull={isFull}>
                  {articles.map(article => (
                    <BlogrollGridItem key={article.title}>
                      <ArticleCard article={article} />
                    </BlogrollGridItem>
                  ))}
                </BlogrollGrid>
              </BlogrollGridWrapper>
            )
          })}
      </Container>
    </BlogrollSection>
  )
}

const BlogrollSection = tw.section``
const BlogrollHeading = tw.h2`
  font-medium
  text-primary text-lg
  border-b border-primary
  pt-4 pb-2 mb-2
  lg:(text-2xl mb-10)
`
const BlogrollGridWrapper = styled.div(({ isFull }) => [
  tw`mb-2 w-full lg:mb-10`,
  isFull ? tw`lg:w-full` : `@media (min-width: 1024px){width: 49%}`
])
const BlogrollGrid = styled.ul(({ isFull }) => [
  tw`pt-4 pb-10 grid grid-cols-1 gap-6 md:(grid-cols-2 gap-y-16)`,
  isFull && tw`lg:(grid-cols-4)`
])
const BlogrollGridItem = tw.li`flex-auto w-full`

export const query = graphql`
  fragment MultiBlogrollData on CmsPageBuilderBlocks {
    multi_blogroll {
      subblog {
        heading
        articles {
          title
          articles {
            featured_image {
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
            title
            content
            url
          }
        }
      }
    }
  }
`

export default MultiBlogroll
