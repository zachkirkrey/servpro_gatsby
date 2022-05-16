import React, { useState, useEffect } from 'react'
import tw, { styled } from 'twin.macro'

import AccessibleLink from '@atoms/AccessibleLink'
import Logo from '@atoms/Logo'
import CloseButton from '@atoms/CloseButton'
import FranchiseSearchInput from '@atoms/FranchiseSearchInput'
import { RatingSummary } from '@atoms/RatingSummary'
import isBrowser from '@utils/is-browser'
import { useOutsideClickAndEscKey } from '@hooks/use-outside-click-and-esc-key'
import { useLocator } from '@hooks/use-locator'
import { useChangeLocationLogic } from '@hooks/use-change-location-logic'
import { useFranchisesFromAddress } from '@hooks/use-franchises-from-address'

const DrawerAddressItem = ({ data, onChoose }) => {
  const { average_rating: rating, review_count } = data

  return (
    <div tw="flex items-center justify-between py-2">
      <p tw="font-bold text-lg md:text-xl max-w-[50%] mr-2">{data.yext.name}</p>
      <div tw="flex flex-col items-center">
        <button
          className="change-location-select-cta"
          tw="text-sm py-2 px-2 bg-primary text-white mb-2 font-semibold md:(text-base px-7)"
          onClick={onChoose}>
          Select This Location
        </button>
        {review_count !== 0 && (
          <RatingSummary
            smallSize={true}
            rating={rating}
            count={review_count}
          />
        )}
      </div>
    </div>
  )
}

const ChangeLocationDrawer = ({ visible, onClose }) => {
  const [qry, setQry] = useState()
  const { data: fr, status: frStatus } = useFranchisesFromAddress(qry)
  const { nearby, setFranchise, setGeo } = useLocator()
  const { changeLocationInputRef } = useChangeLocationLogic()
  const [containerNode, setContainerNode] = React.useState(null)
  function setNode(node) {
    if (node === containerNode) {
      return
    }
    setContainerNode(node)
  }

  useOutsideClickAndEscKey(onClose, {
    node: containerNode,
    enabled: visible && containerNode
  })

  const handleSearch = address => {
    if (isBrowser() && !!address && qry !== address) {
      setQry(address)
    }
  }

  const handleChooseLocation = data => {
    setGeo({})
    const cityName = changeLocationInputRef.current.value
    const {
      address: { city, region: state, postalCode: zip },
      cityCoordinate: { latitude, longitude }
    } = data.yext
    setGeo({
      city: cityName ? cityName : city,
      state,
      state_short: '',
      zip,
      location_type: '',
      latitude,
      longitude
    })
    setFranchise(data)
    onClose()
  }

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => {
        changeLocationInputRef.current?.focus()
      }, 1000)
    } else {
      document.body.style.overflow = ''
    }
  }, [visible])

  return (
    <DrawerWrapper visible={visible} ref={setNode}>
      <CloseButton tw="top-8 right-8" onClick={onClose} />
      <div tw="border-b border-gray-200 px-5 pb-3 mb-3 lg:(border-primary px-12 pb-8 mb-10)">
        <div tw="hidden max-w-[250px] mb-10 lg:block">
          <Logo />
        </div>
        <p tw="lg:hidden text-xl text-primary font-bold mb-8">
          24/7 Emergency Service
        </p>
        <CancelWrapper>
          <CancelButton onClick={onClose}>‹ Back</CancelButton>
        </CancelWrapper>
        <div tw="text-lg font-semibold mb-5">Change Location</div>
        <div tw="max-w-[450px]">
          <FranchiseSearchInput
            className="change-location-cta"
            hintClassName="change-location-dropdown-cta"
            buttonText={'Search'}
            handleSearch={handleSearch}
            inputRef={changeLocationInputRef}
          />
        </div>
      </div>
      <div tw="px-5 space-y-2 lg:(px-12 space-y-4)">
        {frStatus === 'loading' && (
          <div tw="mt-6 space-y-7">
            {Array.from(Array(5)).map((_, index) => {
              return (
                <div
                  key={`placeholder-${index}`}
                  tw="h-20 w-full bg-warmGray-300 animate-pulse rounded-sm"
                />
              )
            })}
          </div>
        )}
        {!qry &&
          !!nearby?.length > 0 &&
          nearby
            .filter((_fr, idx) => idx < 5)
            .map((frData, idx) => {
              return (
                <>
                  <DrawerAddressItem
                    key={idx}
                    data={frData}
                    onChoose={() => handleChooseLocation(frData)}
                  />
                  <Divider />
                </>
              )
            })}
        {frStatus === 'success' &&
          fr.franchises?.length > 0 &&
          fr.franchises
            .filter((_fr, idx) => idx < 5)
            .map((frData, idx) => {
              return (
                <>
                  <DrawerAddressItem
                    key={idx}
                    data={frData}
                    onChoose={() => handleChooseLocation(frData)}
                  />
                  <Divider />
                </>
              )
            })}
      </div>
    </DrawerWrapper>
  )
}

const DrawerWrapper = styled.div(({ visible }) => [
  `will-change: transform;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  `,
  tw`bg-white fixed inset-0 shadow-xl z-[1000] transform pt-16 pb-8`,
  tw`md:(inset-1 py-10 w-2/3) xl:(w-1/2) 2xl:(w-2/5)`,
  !visible && tw`translate-x-[-110%]`,
  visible && tw`translate-x-0`,
  !visible && `transition: transform 150ms`,
  visible && `transition: transform 300ms`
])
const CancelWrapper = tw.div`mb-1`
const CancelButton = styled(AccessibleLink)`
  ${tw`text-sm whitespace-nowrap`}
`
const Divider = styled.div`
  height: 2px;
  ${tw`w-full bg-gray-200`}
`

export default ChangeLocationDrawer
