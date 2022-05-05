import React from 'react'
import tw from 'twin.macro'
import { useLocator } from '@hooks/use-locator'

const Fab = () => {
  const { geo, getFranchise } = useLocator()

  return (
    <Wrap>
      <H>Locator Context:</H>
      <P>geo: {JSON.stringify(geo, null, 2)}</P>
      <P>franchise: {JSON.stringify(getFranchise(), null, 2)}</P>
    </Wrap>
  )
}

const Wrap = tw.aside`fixed left-4 top-1/2 px-4 py-2 text-warmGray-400 text-xs bg-warmGray-700 rounded-lg shadow-lg`
const H = tw.h2``
const P = tw.pre``

export default Fab
