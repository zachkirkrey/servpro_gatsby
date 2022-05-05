import React from 'react'
import tw, { styled } from 'twin.macro'

import Layout from '@components/Layout'
import Container from '@atoms/Container'
import Button from '@atoms/Button'

const NotFoundPage = () => (
  <Layout>
    <StyledContainer>
      <Heading>404 page not found</Heading>
      <SmallText>It&apos;s like it never even happened...</SmallText>
      <div tw="flex justify-center mb-10">
        <Button to="/">Let&apos;s get back to the action.</Button>
      </div>
      <VideoContainer>
        <VideoContainerInner>
          <Video
            src="/404.mp4"
            autoPlay
            playsInline={true}
            muted={true}
            loop={true}
            preload
          />
        </VideoContainerInner>
      </VideoContainer>
    </StyledContainer>
  </Layout>
)

const StyledContainer = tw(Container)`py-12`
const Heading = tw.h1`text-center text-3xl mb-2 leading-none text-[#C8C9C5] md:(text-4xl) lg:(mb-2 text-5xl) 2xl:(text-[72px] mb-5)`
const SmallText = tw.p`text-center text-[#C8C9C5] text-base mb-4 md:(text-xl) lg:(text-2xl) 2xl:(text-3xl mb-5)`
// const StyledContainer = tw(Container)`pt-28 pb-20`
// const Heading = tw.h1`text-center text-7xl leading-none text-[#C8C9C5] mb-5 2xl:(text-[112px] mb-7)`
// const SmallText = tw.p`text-center text-[#C8C9C5] mb-5 text-3xl 2xl:(text-5xl mb-10)`

const VideoContainer = tw.div`flex justify-center`
const VideoContainerInner = styled.div`
  position: relative;
  width: 55vw;
  overflow: hidden;

  &:before {
    content: '';
    display: block;
    padding-top: 44.8333%;
  }
`
const Video = styled.video`
  position: absolute;
  top: -3px;
  left: -3px;
  height: calc(100% + 6px);
  width: calc(100% + 6px);
  max-width: unset;
`

export default NotFoundPage
