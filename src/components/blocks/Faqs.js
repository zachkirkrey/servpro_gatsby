import React from 'react'
import tw, { styled } from 'twin.macro'
import { graphql } from 'gatsby'
import Accordion from '@atoms/Accordion'
import Container from '@atoms/Container'
import paddingDefault from '@utils/paddingDefault'
import Button from '@atoms/Button'

const Faqs = ({ data }) => {
  const { settings, link } = data
  const { dark_mode } = settings

  return (
    <Background onDark={!!dark_mode} css={paddingDefault()}>
      <Container>
        <div tw="lg:(pl-20 pr-16 mb-2)">
          <Accordion faqs={data} onDark={!!dark_mode} />
          {!!link?.href && (
            <div tw="flex mt-10 lg:mt-12">
              <Button to={link.href}>{link.title}</Button>
            </div>
          )}
        </div>
      </Container>
    </Background>
  )
}

const Background = styled.div(({ onDark }) => [onDark && tw`bg-primary-black`])

export const query = graphql`
  fragment FaqsData on CmsPageBuilderBlocks {
    faqs {
      settings {
        dark_mode
      }
      link {
        href
        title
      }
      headline
      byline
      questions {
        questions {
          question
          answer
        }
      }
    }
  }
`

export default Faqs
