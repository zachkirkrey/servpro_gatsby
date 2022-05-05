import React from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input/input'
import tw from 'twin.macro'

function AppPhoneNumberInput(props) {
  const handleChange = e => {
    if (props.form?.setFieldValue) {
      props.form.setFieldValue(props.field.name, e)
    }
  }

  return (
    <StyledPhoneNumberInput
      placeholder={props.field?.placeholder || 'Enter phone number'}
      country="US"
      international={false}
      withCountryCallingCode={false}
      value={props.field?.value || ''}
      onChange={handleChange}
    />
  )
}

const StyledPhoneNumberInput = tw(
  PhoneInput
)`block rounded-md bg-warmGray-200 p-3 w-full`

export default AppPhoneNumberInput
