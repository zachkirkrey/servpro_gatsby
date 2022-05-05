import React, { useRef, useState } from 'react'
import tw, { styled } from 'twin.macro'
import Searchbar from '@atoms/Searchbar'
import Button from '@atoms/Button'
import throttle from 'lodash/throttle'
import { useLocator } from '../../hooks/use-locator'

function Hints({ hintClassName, items, onSelect }, ref) {
  function handleKeyDown(event) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      const currentHintElement = event.currentTarget
      const nextHintElement = currentHintElement.nextElementSibling

      nextHintElement
        ? nextHintElement.focus()
        : ref.current?.querySelector('button')?.focus()
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      const currentHintElement = event.currentTarget
      const prevHintElement = currentHintElement.previousElementSibling

      prevHintElement
        ? prevHintElement.focus()
        : ref.current?.querySelector('button:last-child')?.focus()
    }
  }

  return (
    <StyledHints ref={ref}>
      {items.map((item, index) => {
        return (
          <button
            key={index}
            type="button"
            className={hintClassName}
            tw="h-14 flex items-center px-4 cursor-pointer select-none hover:text-gray-500 w-full border-none"
            onClick={() => onSelect(item.description)}
            onKeyDown={handleKeyDown}>
            <span tw="overflow-hidden overflow-ellipsis whitespace-nowrap">
              {item.description}
            </span>
          </button>
        )
      })}
    </StyledHints>
  )
}

// eslint-disable-next-line no-func-assign
Hints = React.forwardRef(Hints)

const StyledHints = styled.div`
  ${tw`absolute top-14 shadow-lg left-0 w-full bg-white z-30 rounded`};
`

const FranchiseAddressSearchInput = props => {
  const [address, setAddress] = useState(props.value || '')
  const [hints, setHints] = useState([])
  const hintHasBeenSelected = useRef(false)
  const { geo } = useLocator()
  const hintsRef = useRef(null)
  const inputRef = useRef(null)
  const typedOnce = useRef(false)
  const hintClassName = props.hintClassName || ''

  React.useEffect(() => {
    if (props.value) {
      setAddress(props.value)
    }
  }, [props.value])

  const urlGeoPart = React.useMemo(() => {
    if (!geo) {
      return ''
    }
    return geo.latitude && geo.longitude
      ? `&location=${geo.latitude},${geo.longitude}&radius=500`
      : ''
  }, [geo])

  const updateHints = React.useCallback(
    throttle(value => {
      const url = `/api/googlePlaces?input=${value}&types=geocode&components=country:us|country:ca${urlGeoPart}`
      window
        .fetch(url, {
          method: 'GET'
        })
        .then(async response => {
          const result = await response.json()
          if (!result.predictions) {
            return
          }
          setHints(
            result.predictions.map(item => {
              return {
                ...item,
                description: item.description?.replace(', USA', '')
              }
            })
          )
        })
    }, 500),
    [setHints, urlGeoPart]
  )

  const handleDocumentClick = React.useCallback(
    event => {
      if (!hintsRef.current) {
        return
      }
      const isInsideClick = hintsRef.current.contains(event.target)
      if (!isInsideClick) {
        resetHints()
      }
    },
    [setHints]
  )

  React.useEffect(() => {
    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
  }, [])

  React.useEffect(() => {
    if (!typedOnce.current) {
      return
    }
    const VALUE_LENGTH_TO_SHOW_HINTS = 4
    if (address.length < VALUE_LENGTH_TO_SHOW_HINTS) {
      resetHints()
      return
    }
    if (hintHasBeenSelected.current) {
      return
    }
    updateHints(address)
  }, [address])

  const handleLocatorFormSubmit = event => {
    event.preventDefault()
    if (props.inputRef) {
      props.inputRef.current?.blur()
    } else {
      inputRef.current?.blur()
    }
    submit(address)
  }

  function handleInputChange(event) {
    typedOnce.current = true
    setAddress(event.target.value)
    hintHasBeenSelected.current = false
  }

  function handleSelectHint(hint) {
    hintHasBeenSelected.current = true
    resetHints()
    setAddress(hint)
    submit(hint)
  }

  function resetHints() {
    setHints([])
  }

  function handleInputKeyDown(event) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      hintsRef.current?.querySelector('button')?.focus()
    }
  }

  function submit(value) {
    value && props.handleSearch(value)
  }

  return (
    <LocatorForm onSubmit={handleLocatorFormSubmit} id="zip-search-form">
      <Searchbar
        placeholder="Search by zip or city name"
        orangeIcon
        withBorder
        isSquareOneSide
        type="text"
        name="servpro_location"
        autocomplete="off"
        value={address}
        inputRef={props.inputRef ?? inputRef}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <Button
        className={props.className}
        css={tw`mt-4 w-44 md:(mt-0 h-auto)`}
        type="submit"
        form="zip-search-form"
        isSquareOneSide>
        {props.buttonText ? props.buttonText : 'Update'}
      </Button>
      {hints.length > 0 && (
        <Hints
          hintClassName={hintClassName}
          items={hints}
          ref={hintsRef}
          onSelect={handleSelectHint}
        />
      )}
    </LocatorForm>
  )
}

const LocatorForm = tw.form`relative flex flex-col md:(flex-row mb-0) mb-4`

export default FranchiseAddressSearchInput
