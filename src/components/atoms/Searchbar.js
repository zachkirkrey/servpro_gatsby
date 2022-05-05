import React from 'react'
import isPropValid from '@emotion/is-prop-valid'
import tw, { css, styled } from 'twin.macro'
import { ReactComponent as IconSearch } from '../../images/svg/search.svg'
import { useSiteSearch } from '../../contexts/search/SiteSearchContext'

function Searchbar(props) {
  const {
    isWhite,
    withBorder,
    orangeIcon,
    placeholder,
    inputRef,
    siteSearch,
    noDecoration,
    onFocus,
    value,
    autocomplete,
    onChange
  } = props
  const name = ![false, 'false'].includes(props.name) ? props.name : 'q'

  const { setVisible: setSiteSearchVisible } = useSiteSearch()

  function handleInputFocus(event) {
    if (siteSearch) {
      setTimeout(() => {
        setSiteSearchVisible(true)
      }, 0)
    }
    onFocus?.(event)
  }

  return (
    <InputWrapper
      isWhite={isWhite}
      withBorder={withBorder}
      isSquareOneSide={props.isSquareOneSide}
      noDecoration={noDecoration}>
      <ContentWrapper
        tw="flex items-center h-full"
        isWhite={isWhite}
        noDecoration={noDecoration}
        isSquareOneSide={props.isSquareOneSide}>
        <StyledIcon orangeIcon={orangeIcon} />
        <input
          css={[
            tw`bg-white w-full h-full pl-12 bg-opacity-0 z-10 rounded-full rounded-r-none border-none placeholder:(text-primary-black text-base) outline-none focus:ring-1 ring-orange-400 h-11`,
            props.isSquareOneSide && tw`rounded-full lg:rounded-r-none`,
            props.noDecoration && tw`rounded-full pr-12`
          ]}
          placeholder={placeholder}
          name={name || (!siteSearch && 'q')}
          value={value}
          onChange={onChange}
          type="search"
          ref={node => {
            if (inputRef) {
              inputRef.current = node
            }
          }}
          autoComplete={autocomplete || siteSearch ? 'off' : ''}
          onFocus={handleInputFocus}
        />
      </ContentWrapper>
      {!noDecoration && (
        <DecorativePart
          isSquareOneSide={props.isSquareOneSide}
          isWhite={isWhite}
        />
      )}
    </InputWrapper>
  )
}

const InputWrapper = styled.div`
  ${tw`relative rounded-full w-full pr-10`}
  ${props => props.isSquareOneSide && tw`pr-0 md:rounded-r-none`};
  ${props => props.withBorder && tw`border-2 border-primary`};
  ${props => props.noDecoration && tw`pr-0`};
`

const ContentWrapper = styled.div`
  ${props => [
    tw`flex items-center rounded-full rounded-r-none`,
    props.isWhite ? tw`bg-white` : tw`bg-gray-100`,
    props.noDecoration && tw`rounded-r-full`,
    props.isSquareOneSide && tw`rounded-full md:rounded-r-none`
  ]}
`

const StyledIcon = styled(IconSearch, {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'orangeIcon'
})(({ orangeIcon }) => [
  tw`absolute left-4 flex-shrink-0`,
  `stroke: #2B3B48`,
  orangeIcon && `stroke: #FF6600;`
])

const DecorativePart = styled.div`
  ${tw`absolute top-0 right-0 overflow-hidden h-full w-11`}

  ${
    // eslint-disable-next-line no-confusing-arrow
    props =>
      props.isWhite
        ? css`
            &::before {
              ${tw`content block absolute right-6 top-0 bottom-0 h-full w-full bg-white transform rotate-45`}
            }

            &::after {
              border: 3px solid transparent;
              border-top: 3px solid white;
              border-right: 3px solid white;
              ${tw`content block absolute right-3 top-0 bottom-0 h-full w-full transform rotate-45`};
            }
          `
        : css`
            &::before {
              ${tw`content block absolute right-6 top-0 bottom-0 h-full w-full bg-gray-100 transform rotate-45`}
            }

            &::after {
              right: 15px;
              border: 2px solid transparent;
              border-top: 2px solid #ff6600;
              border-right: 2px solid #ff6600;
              ${tw`content block absolute top-0 bottom-0 h-full w-full transform rotate-45`}
            }
          `
  };

  ${props =>
    props.isSquareOneSide &&
    css`
      &::before,
      &::after {
        content: none;
      }
    `};
`

export default Searchbar
