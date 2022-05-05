import React from 'react'
import AccessibleLink from '@atoms/AccessibleLink'
import tw, { styled } from 'twin.macro'
import Container from '@atoms/Container'
import ArticleCard from '@sections/ArticleCard'
import ArticleBlock from '@sections/ArticleBlock'
import paddingDefault from '@utils/paddingDefault'

const IndexMultiblogroll = ({ articles, isIndex, url }) => (
  <BlogrollGrid isIndex={isIndex}>
    {!!articles?.length &&
      articles.map((article, index) => {
        if (index < 2) {
          return (
            <BlogrollGridItem key={article.title}>
              {!!article?.title && <ArticleCard article={article} />}
            </BlogrollGridItem>
          )
        }
        return null
      })}
    <BlogrollGridItemDouble>
      {!!articles?.length &&
        articles.map((article, index) => {
          if (index >= 2 && index <= 4) {
            return (
              <ArticleBlock
                isMultiBlogroll={true}
                withImage={false}
                isIndex={isIndex}
                key={article.title}
                article={article}
              />
            )
          }
          return null
        })}
      {!!url && (
        <AccessibleLink tw="text-xl text-black font-medium" to={url}>
          See All Articles {'>'}
        </AccessibleLink>
      )}
    </BlogrollGridItemDouble>
  </BlogrollGrid>
)
const SingleMultiblogroll = ({ articles, isIndex, url }) => (
  <BlogrollGrid isIndex={isIndex}>
    <BlogrollGridItem>
      {!!articles?.length &&
        articles.map(article => (
          <ArticleBlock
            withImage={true}
            isIndex={isIndex}
            key={article.title}
            article={article}
          />
        ))}
      {!!url && (
        <AccessibleLink tw="text-xl text-black font-medium" to={url}>
          See All Articles {'>'}
        </AccessibleLink>
      )}
    </BlogrollGridItem>
  </BlogrollGrid>
)

const MultiBlogrollAlt = ({ data }) => {
  const { subblog: subblogs, isIndex } = data || { subblog: [], isIndex: false }

  return (
    <BlogrollSection css={paddingDefault()}>
      <Container tw="flex flex-wrap justify-between">
        {!!subblogs &&
          subblogs.map(subroll => {
            const { heading: title, url, articles } = subroll

            if (!articles) {
              return null
            }

            return (
              <BlogrollGridWrapper key={title}>
                {!!title && (
                  <AccessibleLink tw="" to={url}>
                    <BlogrollHeading isIndex={isIndex}>{title}</BlogrollHeading>
                  </AccessibleLink>
                )}

                {isIndex ? (
                  <IndexMultiblogroll
                    articles={articles}
                    isIndex={isIndex}
                    url={url}
                  />
                ) : (
                  <SingleMultiblogroll
                    articles={articles}
                    isIndex={isIndex}
                    url={url}
                  />
                )}
              </BlogrollGridWrapper>
            )
          })}
      </Container>
    </BlogrollSection>
  )
}

const BlogrollSection = tw.section``
const BlogrollHeading = styled.h2(({ isIndex }) => [
  tw`font-medium text-lg pb-2 mb-2 lg:(text-2xl mb-10)`,
  isIndex
    ? tw`text-primary border-b border-b-2 border-primary`
    : tw`text-center lg:(text-3xl mb-4)`
])

const BlogrollGridWrapper = tw.div`
  mb-4 w-full lg:mb-16
`
const BlogrollGrid = styled.ul(({ isIndex }) => [
  tw`pt-4 pb-10`,
  isIndex
    ? tw`md:(grid gap-6 grid-cols-2 gap-y-16) lg:(grid-cols-4)`
    : tw`flex flex-col`
])
const BlogrollGridItem = tw.li`mb-6 md:mb-0 flex-auto w-full`
const BlogrollGridItemDouble = styled.li`
  @media (min-width: 1024px) {
    grid-column: 3 / 5;
  }
`

export default MultiBlogrollAlt
