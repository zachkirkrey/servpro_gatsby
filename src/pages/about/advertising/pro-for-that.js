import React from 'react'
import { styled } from 'twin.macro'
import { Helmet } from 'react-helmet'
import throttle from 'lodash/throttle'

import Layout from '@components/Layout'
import PanelScrolling from '@atoms/PanelScrolling'
import HeroSection from '@landing-sections/HeroSection'
import BackgroundVideoSection from '@landing-sections/BackgroundVideoSection'
import VideoGallery from '@landing-sections/VideoGallery'
import ImageGallery from '@landing-sections/ImageGallery'
import ProFilesSection from '@landing-sections/ProFilesSection'
import Footer from '@components/sections/Footer'
import Seo from '../../../components/utils/Seo'

function LandingPage() {
  const [headerHiddenForced, setHeaderHiddenForced] = React.useState(false)
  const scrollerRef = React.useRef(null)

  function handleWheel() {
    const value = event.wheelDelta || -event.deltaY || -event.detail
    const delta = Math.max(-1, Math.min(1, value))
    const direction = delta > 0 ? -1 : 1

    setHeaderHiddenForced(direction === 1)
  }

  const handleScroll = React.useCallback(
    throttle(() => {
      if (scrollerRef.current.scrollTop === 0) {
        setHeaderHiddenForced(false)
      }
    }, 500),
    []
  )

  React.useEffect(() => {
    scrollerRef.current = document.querySelector('[data-scroller]')

    scrollerRef.current.addEventListener('scroll', handleScroll)

    return () => {
      scrollerRef.current.removeEventListener('scroll', handleScroll)
    }
  }, [])

  React.useEffect(() => {
    document.addEventListener('wheel', handleWheel)

    return () => {
      document.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <Layout
      headerHiddenForced={headerHiddenForced}
      headerAlwaysFixed
      smallHeader
      noFooter>
      <Seo
        title="Restoration Services to Make it Like it Never Happened"
        description="When disaster strikes, depend on the restoration experts at SERVPRO to conquer commercial and residential restoration needs—and make it like it never happened."
      />
      <Helmet>
        <link rel="stylesheet" href="https://use.typekit.net/fai2qft.css" />
      </Helmet>
      <Wrapper>
        <PanelScrolling>
          <HeroSection />
          <BackgroundVideoSection />
          <VideoGallery />
          <ImageGallery />
          <ProFilesSection />
          <Footer />
        </PanelScrolling>
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.div`
  overflow: hidden;
  background-color: #000;
`

export default LandingPage
