import React from 'react'
import AccessibleLink from '@atoms/AccessibleLink'
import tw, { styled } from 'twin.macro'
import { IoIosArrowForward } from 'react-icons/io'
import { truncate, truncateHTML } from '@utils/Truncate'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'
import { striptags } from 'striptags'

const ArticleBlock = ({ isIndex, withImage, article, isMultiBlogroll }) => {
  const { featured_image, title, content, url } = article
  const truncatedTitle = truncate(title, 100)
  // eslint-disable-next-line no-nested-ternary
  const truncatedContent = content
    ? isMultiBlogroll
      ? truncateHTML(striptags(content), 90)
      : truncateHTML(striptags(content), 400)
    : 'no content'

  return (
    <ArticleContainer isIndex={isIndex}>
      {featured_image?.url && withImage && (
        <CardImageContainer>
          <CardImage image={featured_image} alt={featured_image.description} />
        </CardImageContainer>
      )}
      <div>
        <ArticleTitle>
          <AccessibleLink to={url}>{truncatedTitle}</AccessibleLink>
        </ArticleTitle>
        <ArticleContent
          dangerouslySetInnerHTML={{
            __html: truncatedContent
          }}
        />
        {url && !isIndex && (
          <ArticleLink>
            <AccessibleLink to={url}>Read More</AccessibleLink>
            <IoIosArrowForward size={13} tw="ml-1" />
          </ArticleLink>
        )}
      </div>
    </ArticleContainer>
  )
}

const ArticleContainer = styled.div(({ isIndex }) => [
  tw`flex flex-col items-start lg:flex-row`,
  `
  border-bottom: 1px solid rgba(202, 202, 202, 1); 
  my-4
  `,
  isIndex ? tw`pt-4` : tw`py-4`
])
const CardImageContainer = styled.div`
  &::before {
    display: block;
    padding-top: 63%;
    content: '';
  }
  min-width: 100%;

  @media (min-width: 1024px) {
    min-width: 340px;
  }

  ${tw`mb-4 relative flex-shrink-0 mx-auto lg:(ml-0 mr-9)`}
`
const CardImage = styled(SvgSafeGatsbyImage)`
  ${tw`object-center object-cover mb-4`}
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
const ArticleTitle = styled.h3`
  margin-bottom: 8px;
  line-height: 1.16;
  ${tw`text-primary text-xl`}
`
const ArticleContent = styled.div`
  margin-bottom: 24px;
  font-size: 18px;
  line-height: 1.2;
`
const ArticleLink = styled(AccessibleLink)`
  ${tw`flex items-center font-semibold`}
`

export default ArticleBlock
