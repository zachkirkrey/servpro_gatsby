import React from 'react'
import AccessibleLink from '@atoms/AccessibleLink'
import tw, { styled, css } from 'twin.macro'
import RichTextEditorStyles from '../utils/RichTextEditorStyles'

function Button(props) {
  if (props.loading) {
    return (
      <StyledLink
        to={props.to}
        className="hover-default"
        bgSecondary={props.bgSecondary}
        data-button>
        <ButtonContent
          css={RichTextEditorStyles}
          isBig={props.isBig}
          isSquareOneSide={props.isSquareOneSide}
          smallOnMobile={props.smallOnMobile}
          bgSecondary={props.bgSecondary}>
          {props.loadingIcon}
          &nbsp;&nbsp;&nbsp;
          {props.loadingText}
        </ButtonContent>
      </StyledLink>
    )
  }
  if (props.to) {
    return (
      <StyledLink
        to={props.to}
        className="hover-default"
        bgSecondary={props.bgSecondary}
        data-button>
        <ButtonContent
          css={RichTextEditorStyles}
          dangerouslySetInnerHTML={{ __html: props.children }}
          isBig={props.isBig}
          isThin={props.isThin}
          isSquareOneSide={props.isSquareOneSide}
          smallOnMobile={props.smallOnMobile}
          bgSecondary={props.bgSecondary}
        />
      </StyledLink>
    )
  }

  return (
    <StyledButton
      className={`hover-default ${props.className ? props.className : ''}`}
      type={props.type}
      onClick={props.onClick}
      {...props}
      data-button>
      <ButtonContent
        css={RichTextEditorStyles}
        dangerouslySetInnerHTML={{ __html: props.children }}
        isBig={props.isBig}
        isThin={props.isThin}
        isSquareOneSide={props.isSquareOneSide}
        smallOnMobile={props.smallOnMobile}
        bgSecondary={props.bgSecondary}
      />
    </StyledButton>
  )
}

const ButtonStyles = props => css`
  ${tw`block relative overflow-hidden border-white whitespace-nowrap pr-10 h-11`}

  &::before {
    width: 46px;
    ${tw`content block absolute right-6 top-0 bottom-0 bg-primary transform rotate-45`};

    ${props.bgSecondary &&
    css`
      ${tw`bg-secondary`}
    `};
  }

  &::after {
    width: 46px;
    ${tw`content block absolute right-3 top-0 bottom-0 border-r-4 border-t-4 border-primary transform rotate-45`}

    ${props.bgSecondary &&
    css`
      ${tw`border-secondary`}
    `};
  }
`
const StyledLink = styled(AccessibleLink)`
  ${ButtonStyles}
`
const StyledButton = styled.button`
  ${ButtonStyles}
`
const ButtonContent = styled.div(
  ({ isBig, isSquareOneSide, isThin, smallOnMobile, bgSecondary }) => [
    tw`relative bg-primary text-white font-semibold leading-tight rounded-full rounded-r-none z-10 h-full flex items-center justify-start`,
    isBig ? tw`px-10` : tw`px-7`,
    isSquareOneSide && tw`md:rounded-l-none md:pl-5`,
    isThin && tw`lg:(text-2xl pl-8 tracking-normal) font-normal`,
    smallOnMobile ? tw`text-base lg:text-lg` : tw`text-lg`,
    bgSecondary && tw`bg-secondary`
  ]
)

export default Button
