import React from 'react'
import { globalHistory } from '@reach/router'
import tw, { styled } from 'twin.macro'
import { StaticImage } from 'gatsby-plugin-image'
import AccessibleLink from '@atoms/AccessibleLink'
import Searchbar from '@atoms/Searchbar'
import Section from '@atoms/Section'
import { useFooterLegal } from '@hooks/use-footer-legal'
import { useDynamicFooterDisclaimers } from '@hooks/use-dynamic-footer-disclaimers'
import RichTextEditorStyles from '@utils/RichTextEditorStyles'

import { ReactComponent as IconLinkedIn } from '@images/svg/linkedin.svg'
import { ReactComponent as IconTwitter } from '@images/svg/twitter.svg'
import { ReactComponent as IconYoutube } from '@images/svg/youtube.svg'
import { ReactComponent as IconFacebook } from '@images/svg/facebook.svg'
import { ReactComponent as ResponderLogoIcon } from '@images/first-responder-logo.svg'
import {
  SOCIAL_URL_FACEBOOK,
  SOCIAL_URL_LINKEDIN,
  SOCIAL_URL_TWITTER,
  SOCIAL_URL_YOUTUBE
} from '../../constants/constants'
import { getPath } from '@utils/paths'

const staticLinks = [
  {
    title: 'Services',
    links: [
      {
        title: 'Water Damage',
        url: 'waterDamage'
      },
      {
        title: 'Fire Damage',
        url: 'fireDamage'
      },
      {
        title: 'Mold Remediation',
        url: 'moldRemediation'
      },
      {
        title: 'Storm/Disaster',
        url: 'stormDisaster'
      },
      {
        title: 'Construction',
        url: 'constructionService',
        sublinks: [
          {
            title: 'Residential Construction',
            url: 'residentialConstruction'
          },
          {
            title: 'Commercial Construction',
            url: 'commercialConstruction'
          },
          {
            title: 'Roof Tarp/Board-up',
            url: 'roofTarpBoardUp'
          }
        ]
      },
      {
        title: 'Commercial Services',
        url: 'commercialServices',
        sublinks: [
          {
            title: 'Large Loss',
            url: 'largeLoss'
          },
          {
            title: 'Emergency Ready Plan',
            url: 'emergencyReadyPlan'
          },
          {
            title: 'Industries Serviced',
            url: 'industriesServiced'
          },
          {
            title: 'Services',
            url: 'services'
          }
        ]
      },
      {
        title: 'Cleaning',
        url: 'cleaning',
        sublinks: [
          {
            title: 'Specialty Cleaning',
            url: 'specialtyCleaningServices',
            sublinks: [
              {
                title: 'Air Duct/HVAC Cleaning',
                url: 'airDuctHVACCleaning'
              },
              {
                title: 'Biohazard/Crime Scene',
                url: 'biohazardCrimeScene'
              },
              {
                title: 'COVID-19',
                url: 'covid19'
              },
              {
                title: 'Document Restoration',
                url: 'documentRestoration'
              },
              {
                title: 'Odor Removal',
                url: 'odorRemoval'
              },
              {
                title: 'Vandalism/Graffiti',
                url: 'vandalismGraffiti'
              }
            ]
          },
          {
            title: 'General Cleaning',
            url: 'generalCleaningServices',
            sublinks: [
              {
                title: 'Carpet/Upholstery',
                url: 'carpetUpholstery'
              },
              {
                title: 'Ceiling/Floors/Walls',
                url: 'ceilingFloorsWalls'
              },
              {
                title: 'Drapes/Blinds',
                url: 'drapesBlinds'
              }
            ]
          }
        ]
      },
      {
        title: 'Store',
        url: 'store'
      }
    ]
  },
  {
    title: 'About',
    links: [
      {
        title: 'Find a Location',
        url: 'findALocation'
      },
      {
        title: 'History',
        url: 'history'
      },
      {
        title: 'Insurance Professionals',
        url: 'insuranceProfessionals'
      },
      {
        title: 'Leadership',
        url: 'leadership'
      },
      {
        title: 'Sponsorships & Initiatives',
        url: 'sponsorshipsInitiatives',
        sublinks: [
          {
            title: 'First Responder',
            url: 'firstResponder'
          },
          {
            title: 'PGA',
            url: 'pga'
          }
        ]
      },
      {
        title: 'Newsroom',
        url: 'newsroom',
        sublinks: [
          {
            title: 'Media Resources',
            url: 'mediaResources'
          },
          {
            title: 'Press Releases',
            url: 'pressReleases'
          },
          {
            title: 'In the Community',
            url: 'inTheCommunity'
          }
        ]
      },
      {
        title: 'Advertising',
        url: 'advertising',
        other: '/resources/tv-commercials'
      },
      {
        title: 'Contact Us',
        url: 'contactUs'
      }
    ]
  },
  {
    title: 'Resources',
    links: [
      {
        title: 'Resources Home',
        url: 'resourcesHome',
        sublinks: [
          {
            title: 'Water',
            url: 'water'
          },
          {
            title: 'Fire',
            url: 'fire'
          },
          {
            title: 'Mold',
            url: 'mold'
          },
          {
            title: 'Storm',
            url: 'storm'
          },
          {
            title: 'Specialty Cleaning',
            url: 'specialtyCleaningResources'
          },
          {
            title: 'General Cleaning',
            url: 'generalCleaningResources'
          },
          {
            title: 'Why SERVPRO?',
            url: 'whySERVPRO'
          }
        ]
      },
      {
        title: 'FAQ',
        url: 'faq'
      },
      {
        title: 'Glossary',
        url: 'glossary'
      }
    ]
  },
  {
    title: 'Careers',
    links: [
      {
        title: 'Careers Home',
        url: 'careersHome',
        sublinks: [
          {
            title: 'Headquarters Careers',
            url: 'headquarters'
          },
          {
            title: 'Local Franchise Careers',
            url: 'localFranchiseCareers'
          },
          {
            title: 'Own a Franchise',
            url: 'ownAFranchise'
          }
        ]
      }
    ]
  },
  {
    title: 'Legal',
    links: [
      {
        title: 'Ingredients/Safety Data',
        url: 'ingredientsSafetyData'
      },
      {
        title: 'Terms & Conditions',
        url: 'termsConditions'
      },
      {
        title: 'Privacy Policy',
        url: 'privacyPolicy'
      },
      {
        title: 'Cookie Settings',
        className: 'ot-sdk-show-settings'
      }
      // {
      //   title: 'California: Your Privacy Rights',
      //   url: 'californiaPrivacyRights'
      // },
      // // TODO: Add link for 'Do Not Sell My Personal Information'
      // {
      //   title: 'Do Not Sell My Personal Information',
      //   url: 'doNotSellMyPersonalInformation'
      // }
    ]
  }
]

const Footer = () => {
  const { location: currentPage } = globalHistory
  const { copy: staticDisclaimerCopy } = useFooterLegal()
  const { edges: dynamicFooterDisclaimers } = useDynamicFooterDisclaimers()

  const links = staticLinks

  return (
    <SiteFooter tw="border-t-2 border-primary">
      <FooterContainer>
        <WidgetSection id="main-footer--nav">
          <FooterMobileInfo>
            801 Industrial Blvd
            <br />
            Gallatin, TN 37066
            <br />
          </FooterMobileInfo>
          <SearchbarWrapper>
            <Searchbar placeholder="Search" siteSearch />
          </SearchbarWrapper>
          <LinksColumns>
            {links.map((group, id) => {
              const doubleWidth = id === 0
              const lastItem = id === links.length - 1
              const penultItem = id === links.length - 2
              return (
                <LinksColumn
                  doubleWidth={doubleWidth}
                  lastItem={lastItem}
                  penultItem={penultItem}
                  key={id}>
                  <NavTitle tw="font-medium">{group.title}</NavTitle>
                  <NavContainer tw="xs:space-x-10">
                    <NavLinks tw="xs:(w-full)" doubleWidth={doubleWidth}>
                      {group.links.map(
                        ({ title, url, className, sublinks = [] }, i) => {
                          return (
                            <React.Fragment key={i}>
                              <NavLinksItem>
                                {url && getPath[url]() ? (
                                  <AccessibleLink
                                    to={getPath[url]()}
                                    className={className}>
                                    {title}
                                  </AccessibleLink>
                                ) : (
                                  <p tw="cursor-default" className={className}>
                                    {title}
                                  </p>
                                )}
                              </NavLinksItem>
                              {sublinks.length > 0 &&
                                sublinks.map(
                                  (
                                    {
                                      title: sublinkTitle,
                                      url: sublinkUrl,
                                      className: subClassName,
                                      sublinks: nestedSublinks = []
                                    },
                                    j
                                  ) => {
                                    return (
                                      <React.Fragment key={j}>
                                        <NavLinksItem tw="xs:ml-2">
                                          {sublinkUrl &&
                                          getPath[sublinkUrl]() ? (
                                            <AccessibleLink
                                              to={getPath[sublinkUrl]()}
                                              className={subClassName}>
                                              {sublinkTitle}
                                            </AccessibleLink>
                                          ) : (
                                            <p
                                              tw="cursor-default"
                                              className={subClassName}>
                                              {sublinkTitle}
                                            </p>
                                          )}
                                        </NavLinksItem>
                                        {nestedSublinks.length > 0 &&
                                          nestedSublinks.map(
                                            (
                                              {
                                                title: nestedSublinkTitle,
                                                url: nestedSublinkUrl,
                                                className: nestedClassName
                                              },
                                              k
                                            ) => {
                                              return (
                                                <NavLinksItem
                                                  key={k}
                                                  tw="xs:ml-2">
                                                  {nestedSublinkUrl &&
                                                  getPath[
                                                    nestedSublinkUrl
                                                  ]() ? (
                                                    <AccessibleLink
                                                      to={getPath[
                                                        nestedSublinkUrl
                                                      ]()}
                                                      className={
                                                        nestedClassName
                                                      }>
                                                      {nestedSublinkTitle}
                                                    </AccessibleLink>
                                                  ) : (
                                                    <p
                                                      tw="cursor-default"
                                                      className={
                                                        nestedClassName
                                                      }>
                                                      {nestedSublinkTitle}
                                                    </p>
                                                  )}
                                                </NavLinksItem>
                                              )
                                            }
                                          )}
                                      </React.Fragment>
                                    )
                                  }
                                )}
                            </React.Fragment>
                          )
                        }
                      )}
                    </NavLinks>
                  </NavContainer>
                </LinksColumn>
              )
            })}
          </LinksColumns>
          <NavImage>
            <MobilePaleDivider />
            <div tw="w-full flex flex-col items-center space-y-2 pb-2 sm:(flex-row space-y-0 space-x-8 pb-0) lg:(justify-end)">
              <StaticImage
                width={300}
                alt="Certificates"
                formats={['AUTO', 'WEBP']}
                src="../../images/certificates.png"
              />
              <ResponderLogoIcon />
            </div>
          </NavImage>
        </WidgetSection>
        {!!staticDisclaimerCopy && (
          <StaticDisclaimer>
            <div
              tw="leading-snug mb-6"
              css={RichTextEditorStyles}
              dangerouslySetInnerHTML={{ __html: staticDisclaimerCopy }}
            />
          </StaticDisclaimer>
        )}
        <DynamicDisclaimers>
          {dynamicFooterDisclaimers
            .filter(({ node: fd }) => fd?.page_match === currentPage?.pathname)
            .map(({ node: fd }, idx) => (
              <React.Fragment key={idx}>
                {!!fd?.content_before && (
                  <div
                    tw="leading-snug mb-6"
                    css={RichTextEditorStyles}
                    dangerouslySetInnerHTML={{ __html: fd.content_before }}
                  />
                )}
                {!!fd?.content && (
                  <div
                    tw="leading-snug mb-6"
                    css={RichTextEditorStyles}
                    dangerouslySetInnerHTML={{ __html: fd.content }}
                  />
                )}
              </React.Fragment>
            ))}
        </DynamicDisclaimers>
        <Subfooter id="main-footer--subfooter">
          <SubfooterCol>
            <Colophon>
              © {new Date().getFullYear()} SERVPRO. All rights reserved.
            </Colophon>
          </SubfooterCol>
          <SubfooterCol>
            <SubfooterSocialLinks>
              <SubfooterSocialLink to={SOCIAL_URL_LINKEDIN} target="_blank">
                <IconLinkedIn />
              </SubfooterSocialLink>
              <SubfooterSocialLink to={SOCIAL_URL_TWITTER} target="_blank">
                <IconTwitter />
              </SubfooterSocialLink>
              <SubfooterSocialLink to={SOCIAL_URL_YOUTUBE} target="_blank">
                <IconYoutube />
              </SubfooterSocialLink>
              <SubfooterSocialLink to={SOCIAL_URL_FACEBOOK} target="_blank">
                <IconFacebook />
              </SubfooterSocialLink>
            </SubfooterSocialLinks>
          </SubfooterCol>
        </Subfooter>
      </FooterContainer>
    </SiteFooter>
  )
}

const SiteFooter = tw.footer`bg-white z-10 relative`
const FooterContainer = styled.div`
  max-width: 1120px;
  ${tw`mx-auto px-4 xs:px-8 lg:px-6 xl:px-0 pb-16 lg:pb-0`}
`
const FooterMobileInfo = styled.p`
  max-width: 250px;
  ${tw`lg:hidden mb-8`}
`
const WidgetSection = tw(Section)`
  relative
  pt-9 lg:(pb-7 mb-8)
`
const StaticDisclaimer = tw.section`text-sm`
const DynamicDisclaimers = tw.section`text-sm`
const Subfooter = tw(Section)`
  text-lg py-3 justify-center
  lg:(flex flex-row items-center justify-between border-t border-trueGray-300 text-sm)`
const SubfooterCol = tw.div`
  flex flex-wrap items-center
  lg:(flex-auto space-x-14)
  `
const SubfooterSocialLinks = tw.ul`
  flex items-center justify-between
  w-full
  pt-4 pb-3 lg:(ml-auto max-w-max space-x-12)
  text-xl`
const SubfooterSocialLink = styled(AccessibleLink)`
  ${tw`text-primary`}
  svg {
    fill: #ff6600;
  }
`
const Colophon = tw.p`
  text-center
  flex-shrink-0
  w-full lg:w-auto
  lg:(px-2 py-4 text-left)
`
const LinksColumns = styled.div`
  grid-auto-flow: dense;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 2fr;
  }
  ${tw`grid grid-cols-1 items-start md:(flex-row flex-wrap justify-between)`}
`
const LinksColumn = styled.div(({ penultItem, lastItem }) => [
  tw`grid mb-5 lg:(mb-0)`,
  `  @media (min-width: 1024px) {
    grid-row: 1 / 3;
  }`,
  lastItem &&
    `
  @media (min-width: 1024px) {
    grid-row: 2 / 3;
    grid-column: 4 / 5;
  }
  `,
  penultItem &&
    `
  @media (min-width: 1024px) {
    grid-row: 1 / 2;
    grid-column: 4 / 5;
  }
  `
])
const NavTitle = tw.p`
  text-primary
  text-lg
  lg:(border-b border-primary text-21px)
  mb-2 pb-1
  w-40`
const NavContainer = tw.div`
  flex md:space-x-10
  lg:(flex-row space-x-14)`
const NavLinks = styled.ul(({ doubleWidth }) => [
  tw`mr-3 mb-4 xs:mr-0 md:mb-0`,
  `grid-auto-flow: column; grid-template-rows: repeat(15, min-content)`,
  doubleWidth
    ? tw`flex flex-col lg:(grid grid-cols-2)`
    : tw`flex flex-col gap-0 lg:(grid grid-cols-1)`
])
const NavLinksItem = styled.li`
  margin-bottom: 0.75rem;
  ${NavLinks} {
    ${tw`pl-3`}
  }
`
const NavImage = tw.div`
  flex py-2 bottom-0 left-0 right-0 lg:(absolute -z-1)
`
const MobilePaleDivider = styled.div`
  height: 1px;
  background-color: #f5f5f5;
  ${tw`my-9 lg:hidden`}
`
const SearchbarWrapper = styled.div`
  max-width: 325px;
  ${tw`mb-12 text-lg lg:(hidden pr-0)`}
`

export default Footer
