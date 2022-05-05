import React, { useState } from 'react'
import AccessibleLink from '@atoms/AccessibleLink'
import tw, { css, styled } from 'twin.macro'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'
import apCaseOnlyTitleTags from '@utils/apCaseOnlyTitleTags'

import { ReactComponent as ArrowIcon } from '../../images/svg/arrow-accordion.svg'
import RichTextEditorStyles from '../utils/RichTextEditorStyles'
import { BREAKPOINT_MD } from '../../constants/constants'
import isBrowser from '../utils/is-browser'
import { customScrollTo } from '../utils/scroll-to'

function Accordion({ faqs, onDark, onMediaContent }) {
  const { headline = '', heading = '', byline = '', questions: faqsData } = faqs
  const { questions } = !!faqsData?.length > 0 ? faqsData[0] : []
  const [activeIndex, setActiveIndex] = useState(null)
  const itemsContainerRef = React.useRef(null)
  const initialRender = React.useRef(true)

  const getHeading = () =>
    apCaseOnlyTitleTags(headline) ?? apCaseOnlyTitleTags(heading) ?? ''
  const openAnswer = index => {
    setActiveIndex(index === activeIndex ? null : index)
  }

  const scrollOffset = React.useMemo(() => {
    if (!isBrowser()) {
      return 0
    }
    return window.innerWidth < BREAKPOINT_MD ? 100 : 250
  }, [])

  React.useEffect(() => {
    if (initialRender.current || activeIndex == null) {
      return
    }
    const items = itemsContainerRef.current?.children
    setTimeout(() => {
      customScrollTo(items[activeIndex]?.offsetTop - scrollOffset)
    }, 200)
  }, [activeIndex])

  React.useEffect(() => {
    initialRender.current = false
  }, [])

  return (
    <div tw="w-full">
      {getHeading() !== '' && (
        <AccordionHeading onMediaContent={onMediaContent} onDark={onDark}>
          {getHeading()}
        </AccordionHeading>
      )}
      {byline && (
        <AccordionSubheading
          css={RichTextEditorStyles}
          dangerouslySetInnerHTML={{ __html: byline }}
          onDark={onDark}
        />
      )}
      <div ref={itemsContainerRef}>
        {!!questions &&
          questions.map((pair, index) => {
            const { question, answer, icon, url } = pair
            const isActive = index === activeIndex

            return (
              <QuestionWrap
                key={question}
                onDark={onDark}
                isLast={index === questions.length - 1}>
                <Question isActive={isActive} onClick={() => openAnswer(index)}>
                  {question}
                  <ArrowWrap onDark={onDark} isActive={isActive}>
                    <ArrowIcon />
                  </ArrowWrap>
                </Question>
                <AnswerWrap
                  onDark={onDark}
                  onMediaContent={onMediaContent}
                  isActive={isActive}>
                  {icon?.url && (
                    <AnswerImageWrap>
                      <AnswerImage>
                        <SvgSafeGatsbyImage
                          tw="absolute inset-0 object-cover"
                          image={icon}
                          alt={icon.title}
                        />
                      </AnswerImage>
                    </AnswerImageWrap>
                  )}
                  <div>
                    <Answer
                      css={RichTextEditorStyles}
                      dangerouslySetInnerHTML={{ __html: answer }}
                    />
                    {!!url && (
                      <div tw="mt-4 pb-2">
                        <AccessibleLink tw="font-semibold mt-10" to={url}>
                          Read More ›
                        </AccessibleLink>
                      </div>
                    )}
                  </div>
                </AnswerWrap>
              </QuestionWrap>
            )
          })}
      </div>
    </div>
  )
}

const AccordionHeading = styled.h3(({ onDark, onMediaContent }) => [
  onDark ? tw`text-32px text-trueGray-100` : tw`text-32px text-primary-black`,
  onMediaContent && tw`text-left mb-3`
])
const AccordionSubheading = styled.p(({ onDark }) => [
  tw`mb-10 text-xl`,
  onDark ? tw`text-white` : tw`text-primary-black`
])
const QuestionWrap = styled.div(({ isLast, onDark }) => [
  tw`relative`,
  !onDark && tw`border-b border-trueGray-300`,
  onDark && !isLast && tw`border-b border-trueGray-300`
])
const Question = tw.div`flex justify-between w-full items-center font-semibold text-22px text-primary py-5 cursor-pointer lg:text-lg`
const ArrowWrap = styled.div(({ isActive, onDark }) => [
  `svg { fill: #2B3B48}`,
  tw`transform transition-transform`,
  isActive && tw`rotate-180`,
  onDark && 'svg { fill: #F5F5F5 }'
])
const Answer = styled.div`
  ${tw`lg:text-xl`}
`
const AnswerImage = styled.div`
  ${tw`absolute inset-0`}
`
const AnswerImageWrap = styled.div`
  min-width: 300px;
  ${tw`relative mx-auto mb-5 sm:(mr-10 ml-0 mb-0)`}

  &::before {
    display: block;
    padding-top: 100%;
    content: '';
  }
`
const AnswerWrap = styled.div`
  transition: max-height 0.15s ease, padding-bottom 0.15s ease;

  ${tw`flex flex-col sm:flex-row max-h-0 overflow-hidden text-lg lg:text-base`};

  ${props =>
    props.onDark &&
    `
    ${tw`text-trueGray-100`}
  `};

  ${props =>
    props.isActive &&
    css`
      padding-bottom: 16px;
      max-height: 2000px;
      transition-duration: 0.5s;
    `};
`

export default Accordion
