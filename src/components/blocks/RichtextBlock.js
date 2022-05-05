import React from 'react'
import tw from 'twin.macro'
import { graphql } from 'gatsby'
import Container from '@atoms/Container'
import RichTextEditorStyles from '@utils/RichTextEditorStyles'

const RichtextBlock = ({ data }) => {
  const { content } = data ?? ''
  return (
    <RichTextSection>
      <Container>
        <RichTextContent
          css={RichTextEditorStyles}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Container>
    </RichTextSection>
  )
}
const RichTextSection = tw.section``
const RichTextContent = tw.div``

export const query = graphql`
  fragment RichtextBlockData on CmsPageBuilderBlocks {
    richtext_block {
      content
    }
  }
`

export default RichtextBlock
