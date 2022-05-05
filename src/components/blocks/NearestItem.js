import React, { useState } from 'react'
import tw, { styled } from 'twin.macro'
import Button from '@atoms/Button'
import SvgSafeGatsbyImage from '@atoms/SvgSafeGatsbyImage'
import AccessibleLink from '@atoms/AccessibleLink'
import { RatingSummary } from '@atoms/RatingSummary'
import formatPhoneLink from '@utils/format-phone-link'
import { filterSortServiceTypes } from '@utils/serviceTypesHelpers'
import { useServiceTypes } from '@hooks/use-service-types'
import { BREAKPOINT_SM } from '../../constants/constants'
import isBrowser from '../utils/is-browser'

const RenderVertical = ({ data }) => {
  const { heading, phone, rating, number_of_reviews, link } = data

  return (
    <NearestWrapperVertical>
      <div tw="">
        <h4 tw="font-semibold text-3xl mb-4">{heading}</h4>
        <div tw="mb-2 sm:flex">
          <div tw="mb-8 sm:(mr-8 mb-0)">
            <div tw="mb-5">
              <Button to={`tel:${formatPhoneLink(phone)}`} isBig>
                {formatPhoneLink(phone)}
              </Button>
            </div>
            <div tw="flex items-center mb-5">
              {number_of_reviews !== 0 && (
                <RatingSummary rating={rating} count={number_of_reviews} />
              )}
            </div>
          </div>
        </div>
        {!!link?.href && (
          <AccessibleLink tw="font-semibold text-lg" to={link.href}>
            {link.title}
          </AccessibleLink>
        )}
      </div>
    </NearestWrapperVertical>
  )
}

const ServiceTypes = ({ data }) => {
  return (
    <ul tw="flex mt-3 mb-3 md:(grid gap-3 grid-cols-4)">
      {!!data &&
        !!data.length > 0 &&
        data.map((item, id) => {
          return <ServiceTypesItem key={id} data={item} />
        })}
    </ul>
  )
}

const ServiceTypesItem = ({ data }) => {
  if (!data) {
    return <></>
  }
  return (
    <li tw="flex flex-col justify-start md:(flex-row items-center)">
      {!!data.icon?.url && (
        <ServiceTypeIconWrapper>
          <SvgSafeGatsbyImage
            tw="flex-none w-7 h-full md:(w-7)"
            image={data.icon}
            alt={data.icon.title}
          />
        </ServiceTypeIconWrapper>
      )}
      <ServiceTypeItemHeading>{data.title}</ServiceTypeItemHeading>
    </li>
  )
}

const ServiceTypeIconWrapper = styled.div(() => [tw`relative flex-shrink flex`])

const ServiceTypeItemHeading = styled.h4(() => [
  tw`hidden font-semibold md:(block ml-2)`
])

const RenderHorizontal = ({ data }) => {
  const { heading, phone, rating, number_of_reviews, link, services } = data
  const { edges: serviceTypes } = useServiceTypes()
  const [serviceListVisible, setServiceListVisible] = useState(false)
  const isMobile = React.useMemo(() => {
    if (!isBrowser()) {
      return undefined
    }
    return window.innerWidth < BREAKPOINT_SM
  }, [])

  if (data && Object.keys(data).length === 0) {
    return <></>
  }

  return (
    <NearestWrapperHorizontal>
      <div tw="flex-shrink-0">
        <div tw="mb-2 sm:(flex justify-between flex-shrink-0)">
          <div tw="mb-4 sm:(mb-0 pr-16)">
            <h4 tw="font-semibold text-3xl mb-4">{heading}</h4>
            {!!services && !!services?.length && (
              <NearestServiceWrapperHorizontal>
                <NearestServicesListHorizontal>
                  <ServiceTypes
                    data={filterSortServiceTypes(serviceTypes, services)}
                  />
                  {serviceListVisible || !isMobile ? (
                    <>
                      {services.map((item, idx) => (
                        <>
                          <NearestServiceItemHorizontal key={idx}>
                            {item?.service_line ? item.service_line : ''}
                          </NearestServiceItemHorizontal>
                        </>
                      ))}
                      {isMobile && (
                        <button
                          tw="text-primary underline"
                          onClick={() => {
                            setServiceListVisible(!serviceListVisible)
                          }}>
                          Hide Services
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      tw="text-primary underline"
                      onClick={() => {
                        setServiceListVisible(!serviceListVisible)
                      }}>
                      Show all Services
                    </button>
                  )}
                </NearestServicesListHorizontal>
              </NearestServiceWrapperHorizontal>
            )}
          </div>
          <div tw="mb-8 sm:(mr-8 mb-0 flex flex-col justify-center items-end)">
            <div tw="mb-5">
              <Button to={`tel:${formatPhoneLink(phone)}`} isBig>
                {formatPhoneLink(phone)}
              </Button>
            </div>
            <div tw="flex items-center mb-5">
              {number_of_reviews !== 0 && (
                <RatingSummary rating={rating} count={number_of_reviews} />
              )}
            </div>
            {!!link?.href && (
              <AccessibleLink tw="font-semibold text-lg" to={link.href}>
                {link.title}
              </AccessibleLink>
            )}
          </div>
        </div>
      </div>
    </NearestWrapperHorizontal>
  )
}

const NearestItem = ({ data, isFull }) => {
  return isFull ? (
    <RenderHorizontal data={data} />
  ) : (
    <RenderVertical data={data} />
  )
}

const NearestWrapper = styled.div`
  border-bottom: 1px solid rgba(199, 199, 199, 1);

  &:not(:last-child) {
    margin-bottom: 45px;
  }
`

const NearestWrapperVertical = styled(NearestWrapper)`
  ${tw`flex items-start flex-col pb-9 md:(flex-row justify-between)`}
`

const NearestWrapperHorizontal = styled(NearestWrapper)`
  ${tw``}
`
const NearestServiceWrapperHorizontal = styled.div`
  ${tw`mb-3`}
`
const NearestServicesListHorizontal = styled.ul``
const NearestServiceItemHorizontal = styled.li`
  ${tw`inline text-sm`}
  ~::before {
    content: ', ';
  }
`

export default NearestItem
