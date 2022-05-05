import React from 'react'
import { styled } from 'twin.macro'
import { graphql } from 'gatsby'

const Anchor = ({ data }) => {
  const { anchor_id } = data

  return <AnchorEl id={anchor_id} />
}

const AnchorEl = styled.div`
  height: 0;
`

export const query = graphql`
  fragment AnchorData on CmsPageBuilderBlocks {
    anchor {
      anchor_id
    }
  }
`

export default Anchor
