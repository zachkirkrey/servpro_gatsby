import React from 'react'
import DatePicker from 'react-date-picker'
import tw, { css } from 'twin.macro'

function AppDatePicker(props) {
  const handleChange = date => {
    if (props.form?.setFieldValue) {
      props.form.setFieldValue(props.field.name, date)
    }
  }
  return (
    <StyledDatePicker
      css={DatePickerStyles}
      value={props.field?.value || ''}
      onChange={handleChange}
    />
  )
}

const StyledDatePicker = tw(
  DatePicker
)`block rounded-md bg-warmGray-200 p-3 w-full`

const DatePickerStyles = css`
  & {
    .react-date-picker__wrapper {
      border: none;
    }
    .react-calendar__tile--now {
      background: #ffd580;
    }
  }
`

export default AppDatePicker
// .react-calendar__month-view__days__day--weekend:nth-child(even) {
//   color: #2b3b48;
// }
