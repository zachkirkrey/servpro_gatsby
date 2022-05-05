/*global Invoca*/
import isBrowser from '@utils/is-browser'
// eslint-disable-next-line no-confusing-arrow
const triggerInvoca = () =>
  isBrowser() && !!window?.Invoca ? Invoca.PNAPI.run() : null

export default triggerInvoca
