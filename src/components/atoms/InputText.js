import React from 'react'
import tw, { styled } from 'twin.macro'

function InputText({ id, placeholder, ...props }) {
  return (
    <InputWrapper>
      <label htmlFor={id}>
        <input id={id} placeholder={placeholder} {...props} />
      </label>
    </InputWrapper>
  )
}

const InputWrapper = styled.div`
  ${tw`w-full`}
  input {
    ${tw`py-4 px-5 w-full`}
    &::placeholder {
      color: #2b3a49;
    }
  }
`

export default InputText
