// Takes the last 10 digits of a phone number string and
//   returns them as a String in the format: `(xxx) xxx-xxxx`
const formatPhoneLink = tenDigitFormat => {
  if (tenDigitFormat === undefined) {
    return ''
  }

  const tenDigits = tenDigitFormat.replace(/\D/g, '').substr(-10)
  const areaCode = tenDigits.substr(0, 3)
  const regionNumber = tenDigits.substr(3, 3)
  const subscriberNumber = tenDigits.substr(-4)

  return `(${areaCode}) ${regionNumber}-${subscriberNumber}`
}

export const formatPhoneNumber = tenDigitFormat => {
  if (tenDigitFormat === undefined) {
    return ''
  }

  const tenDigits = tenDigitFormat.replace(/\D/g, '').substr(-10)
  const areaCode = tenDigits.substr(0, 3)
  const regionNumber = tenDigits.substr(3, 3)
  const subscriberNumber = tenDigits.substr(-4)

  return `${areaCode}-${regionNumber}-${subscriberNumber}`
}

export default formatPhoneLink
