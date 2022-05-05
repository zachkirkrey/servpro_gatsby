import tw, { styled } from 'twin.macro'

const Alert = styled.div(({ warning, error }) => [
  warning && tw`bg-amber-500`,
  error && tw`bg-red-500`,
  tw`my-12 p-8 rounded`
])

export default Alert
