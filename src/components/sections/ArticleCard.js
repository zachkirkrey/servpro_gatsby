import React from 'react'
import AccessibleLink from '@atoms/AccessibleLink'
import tw, { styled } from 'twin.macro'
import { IoIosArrowForward } from 'react-icons/io'
import { truncate as truncateText } from '../utils/Truncate'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'
import truncate from 'truncate-html'

const ArticleCard = ({ article, htmlContent = true }) => {
  const { featured_image, title, content, url } = article

  const contentStyles = tw`text-lg leading-tight overflow-y-hidden mb-2`
  const contentMaxLength = 90
  const contentTruncateOptions = {
    forceEllipsis: true,
    noEllipsisIfEmpty: true
  }

  return (
    <div
      tw="shadow-md relative p-2 pb-5 h-full bg-white text-primary-black"
      key={title}>
      {featured_image?.url && (
        <CardImageContainer to={url}>
          <CardImage image={featured_image} alt={featured_image.description} />
        </CardImageContainer>
      )}
      <GridContainer>
        <h3 tw="text-primary text-xl leading-7 tracking-wide mb-3">
          <AccessibleLink tw="lg:inline" to={url}>
            {title}
          </AccessibleLink>
        </h3>
        <div tw="flex mb-4">
          <span tw="inline-block h-px w-12 bg-secondary" />
        </div>
        {htmlContent ? (
          <div
            css={[contentStyles]}
            dangerouslySetInnerHTML={{
              __html: truncate(content, contentMaxLength)
            }}
          />
        ) : (
          <div css={[contentStyles]}>
            {truncateText(content, contentMaxLength, contentTruncateOptions)}
          </div>
        )}
        <div tw="flex items-center font-semibold mt-4">
          <AccessibleLink className="hover-default" to={url}>
            Read More
          </AccessibleLink>
          <IoIosArrowForward size={13} tw="ml-1" />
        </div>
      </GridContainer>
    </div>
  )
}

const CardImageContainer = styled(AccessibleLink)`
  &::before {
    display: block;
    padding-top: 86%;
    content: '';
  }
  ${tw`block relative mb-1`}
`
const CardImage = styled(SvgSafeGatsbyImage)`
  ${tw`block object-center object-cover mb-4 lg:max-h-80`}
  position: absolute !important;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  clip-path: polygon(0% 0%, 100% 0, 100% 75%, 50% 97%, 0 75%);
`
const GridContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto 73px;
  ${tw`px-4`}
`

export default ArticleCard
