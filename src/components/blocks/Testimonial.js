import React from 'react'
import tw from 'twin.macro'
import { graphql } from 'gatsby'
import Container from '@atoms/Container'
import paddingDefault from '@utils/paddingDefault'

const Testimonial = ({ data }) => {
  const { author_name, author_company, quote } = data

  return (
    <Background css={paddingDefault()}>
      <Container>
        <div tw="flex flex-col justify-between lg:flex-row">
          <div tw="mb-8 lg:(w-2/3 pt-4 pl-7 mr-20 mb-0)">
            <p tw="text-sm tracking-widest mb-1">{author_name}</p>
            <p tw="text-sm font-light tracking-widest mb-3">{author_company}</p>
            <p tw="text-primary text-26px leading-snug lg:text-32px">{quote}</p>
          </div>
        </div>
      </Container>
    </Background>
  )
}

const Background = tw.div`bg-trueGray-100`

export const query = graphql`
  fragment TestimonialData on CmsPageBuilderBlocks {
    testimonial {
      author_name
      author_company
      quote
    }
  }
`

export default Testimonial
