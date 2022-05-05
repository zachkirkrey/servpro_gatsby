import React from 'react'
import AccessibleLink from '@atoms/AccessibleLink'
import { graphql } from 'gatsby'
import tw, { styled } from 'twin.macro'
import Container from '@atoms/Container'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'
import paddingDefault from '@utils/paddingDefault'

const TeamMembers = ({ data }) => {
  const { team_members } = data

  return (
    <TeamMembersSection css={paddingDefault()}>
      <Container>
        <TeamMembersWrap>
          {team_members.map(member => {
            const { company_title: job, headshot, title: name, url } = member

            return (
              <MemberItem key={name}>
                <MemberLink to={url}>
                  <HeadshotWrap>
                    <MemberHeadshot image={headshot} alt={headshot.title} />
                  </HeadshotWrap>
                  <MemberName>{name}</MemberName>
                  <MemberJob>{job}</MemberJob>
                </MemberLink>
              </MemberItem>
            )
          })}
        </TeamMembersWrap>
      </Container>
    </TeamMembersSection>
  )
}

const TeamMembersSection = tw.section``
const TeamMembersWrap = tw.ul`grid grid-cols-1 gap-6 md:grid-cols-2 lg:(grid-cols-3 gap-x-12 gap-y-20)`
const MemberItem = styled.li`
  ${tw`flex-initial relative pt-5`}
`
const MemberLink = tw(AccessibleLink)``
const HeadshotWrap = styled.div`
  ${tw`relative mb-5`}

  &::before {
    display: block;
    padding-top: 86%;
    content: '';
  }
`
const MemberHeadshot = styled(SvgSafeGatsbyImage)`
  ${tw`absolute top-0 left-0 h-full w-full object-cover`}
`

const MemberName = tw.h3`
  font-semibold text-xl
  text-warmGray-600
`
const MemberJob = tw.p`
  font-semibold
  text-warmGray-500
  tracking-wide
  w-4/5
`

export const query = graphql`
  fragment TeamMembersData on CmsPageBuilderBlocks {
    team_member_grid {
      team_members {
        url
        title
        company_title
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
  }
`

export default TeamMembers
