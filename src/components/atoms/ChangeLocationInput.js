import React, { useState } from 'react'
import tw from 'twin.macro'
import { useLocator } from '@hooks/use-locator'

const ChangeLocationInput = props => {
  const { changeLocation, status } = useLocator()
  const [inputVal, setInputVal] = useState('')

  const handleChangeLocSubmit = event => {
    event.preventDefault()
    changeLocation(inputVal)
  }

  return (
    <FormWrap onSubmit={handleChangeLocSubmit}>
      <Label>
        <Input
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          disabled={status === 'loading'}
          {...props}
        />
      </Label>
    </FormWrap>
  )
}

const FormWrap = tw.form``
const Label = tw.label``
const Input = tw.input`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight`

export default ChangeLocationInput
