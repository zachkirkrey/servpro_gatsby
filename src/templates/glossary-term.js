import React from 'react'
import tw from 'twin.macro'

import { graphql } from 'gatsby'
import Layout from '@components/Layout'
import Container from '@atoms/Container'
import PageTitle from '@atoms/PageTitle'
import Subnav from '@blocks/Subnav'
import Breadcrumbs from '@sections/Breadcrumbs'
import RichTextEditorStyles from '@utils/RichTextEditorStyles'
import { useResourcesSubnav } from '@hooks/use-resources-subnav'
import BackLink from '@atoms/BackLink'
import paddingDefault from '../components/utils/paddingDefault'
import Seo from '../components/utils/Seo'

const GlossaryTermPage = ({ data, pageContext }) => {
  const { seo } = pageContext
  const { title, description } = data.cmsGlossaryTerm
  const resourcesSubnav = useResourcesSubnav()
  // Transform the hook data to match the modular block format:
  const subnavData = { subnav: [resourcesSubnav] }

  return (
    <Layout>
      <Seo
        title={seo?.meta_title || title}
        description={seo?.meta_description || description}
        imageUrl={seo?.meta_image?.url}
      />
      <Subnav data={subnavData} />
      <div css={paddingDefault()}>
        <Container css={RichTextEditorStyles}>
          <div tw="hidden lg:block">
            <Breadcrumbs />
          </div>
          <div tw="mb-4">
            <PageTitle>{title || 'Untitled Glossary Term Page'}</PageTitle>
          </div>
          <Copy
            css={RichTextEditorStyles}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <BackLink to="/resources/glossary">Glossary</BackLink>
        </Container>
      </div>
    </Layout>
  )
}

const Copy = tw.div`font-normal text-xl mb-14`

export const query = graphql`
  query ($slug: String!) {
    cmsGlossaryTerm(url: { eq: $slug }) {
      title
      url
      description
    }
  }
`

export default GlossaryTermPage
