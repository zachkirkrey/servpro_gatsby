import React from 'react'
import tw, { styled } from 'twin.macro'
import AccessibleLink from '@atoms/AccessibleLink'
import { graphql } from 'gatsby'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'
import Layout from '@components/Layout'
import Container from '@atoms/Container'
import PageTitle from '@atoms/PageTitle'
import RichTextEditorStyles from '@utils/RichTextEditorStyles'
import Seo from '../components/utils/Seo'

const LeadershipPage = ({ data }) => {
  const {
    title: fullName,
    company_title: job,
    bio,
    headshot,
    seo
  } = data.cmsLeadership

  return (
    <Layout>
      <Seo
        title={seo?.meta_title || fullName}
        description={seo?.meta_description}
        imageUrl={seo?.meta_image?.url}
      />
      <div tw="lg:(py-10)">
        <Container>
          <div tw="lg:mb-7 lg:(flex flex-row-reverse)">
            <LeadershipLink to="/about/leadership">Back To Team</LeadershipLink>
          </div>
          <div tw="flex flex-col-reverse lg:(flex-row justify-between)">
            <ContentWrap>
              <PageHeading>{fullName || 'John Doe'}</PageHeading>
              <JobTitle>{job}</JobTitle>
              <Copy
                css={RichTextEditorStyles}
                dangerouslySetInnerHTML={{ __html: bio }}
              />
            </ContentWrap>
            <div>
              <HeadshotWrap>
                {!!headshot?.url && <Headshot image={headshot} />}
              </HeadshotWrap>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  )
}

const LeadershipLink = tw(AccessibleLink)`
  -mx-4 px-4 py-2 lg:mr-auto
  font-semibold
  text-primary text-sm
  tracking-wide`

const HeadshotWrap = styled.div`
  ${tw`relative pt-4 mb-8 lg:(pt-0 mb-0)`}
  @media (min-width: 769px) {
    max-width: 525px;
  }
`
const Headshot = styled(SvgSafeGatsbyImage)`
  ${tw`w-full max-h-full mt-3 md:mt-10 lg:mt-14`}
  aspect-ratio: 1154 / 1000;
`

const ContentWrap = tw.div`flex-1 lg:(max-w-md mr-14) xl:mr-0`
const PageHeading = tw(PageTitle)`mb-1`
const JobTitle = tw.h3`text-lg mb-7 md:text-base`
const Copy = tw.div`font-normal text-base leading-relaxed pb-8 lg:pr-0`

export const query = graphql`
  query ($slug: String!) {
    cmsLeadership(url: { eq: $slug }) {
      url
      title
      company_title
      bio
      headshot {
        filename
        title
        url
        localAsset {
          childImageSharp {
            gatsbyImageData(
              width: 1440
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
  }
`

export default LeadershipPage
