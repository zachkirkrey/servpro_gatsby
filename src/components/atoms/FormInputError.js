import React from 'react'
import tw from 'twin.macro'
import { ErrorMessage } from 'formik'

export function FormInputError(props) {
  return (
    <ErrorMessage {...props}>
      {message => {
        return <span tw="text-red-400 text-sm">{message}</span>
      }}
    </ErrorMessage>
  )
}
