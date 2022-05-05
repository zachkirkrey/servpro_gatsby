import React from 'react'
import tw, { styled, css } from 'twin.macro'
import { truncateHTML } from '../utils/Truncate'
import StyledLink from './StyledLink'

function CollapsibleText({
  children,
  collapsingDisabled: collapsingDisabledProp,
  maxLength = 90,
  ...rest
}) {
  const [collapsed, setCollapsed] = React.useState(false)
  const textContainerRef = React.useRef(null)
  const realTextContainerRef = React.useRef(null)
  const truncatedTextContainerRef = React.useRef(null)
  const initialHeight = React.useRef(-1)
  const collapsingDisabled =
    collapsingDisabledProp || children?.length <= maxLength
  const [initialized, setInitialized] = React.useState(false)

  React.useEffect(() => {
    if (collapsingDisabled) {
      setInitialized(true)
      return
    }
    setTimeout(() => {
      textContainerRef.current.style.maxHeight = `${truncatedTextContainerRef.current.offsetHeight}px`
      textContainerRef.current.style.height = `${realTextContainerRef.current.offsetHeight}px`
      initialHeight.current = truncatedTextContainerRef.current.offsetHeight
      setInitialized(true)
    }, 300)
  }, [])

  React.useEffect(() => {
    if (collapsingDisabled) {
      return
    }
    if (collapsed) {
      textContainerRef.current.style.maxHeight = '500px'
    } else if (initialHeight.current > -1) {
      textContainerRef.current.style.maxHeight = `${initialHeight.current}px`
    }
  }, [collapsed])

  const truncatedText = React.useMemo(() => {
    if (!children) {
      return ''
    }
    return truncateHTML(children, maxLength)
  }, [children])

  if (!children) {
    return null
  }

  return (
    <div {...rest}>
      <TextContainer tw="relative" collapsed={collapsed} ref={textContainerRef}>
        <noindex>
          <div
            ref={truncatedTextContainerRef}
            css={[
              initialized && tw`absolute`,
              collapsed ? tw`invisible` : tw`visible`
            ]}
            dangerouslySetInnerHTML={{ __html: truncatedText }}
          />
        </noindex>
        <div
          ref={realTextContainerRef}
          css={[
            !initialized && tw`absolute`,
            collapsed ? tw`visible` : tw`invisible`
          ]}
          dangerouslySetInnerHTML={{ __html: children }}
        />
      </TextContainer>
      {!collapsingDisabled && (
        <StyledLink
          className="default-link"
          tw="mt-3"
          onClick={() => setCollapsed(state => !state)}>
          {' '}
          Show {collapsed ? 'less' : 'more'}
        </StyledLink>
      )}
    </div>
  )
}

const TextContainer = styled.div`
  position: relative;
  transition: max-height 0.125s ease-out;
  overflow: hidden;

  ${props =>
    props.collapsed &&
    css`
      transition-duration: 1s;
    `};
`

export default CollapsibleText
