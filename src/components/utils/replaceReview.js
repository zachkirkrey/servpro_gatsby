function replaceButton(copyRef) {
  if (!copyRef.current) {
    return
  }

  const button = copyRef.current.querySelector('.phone-link-button')
  if (!button) {
    return
  }

  const span = document.createElement('span')
  span.textContent = button.textContent
  button.innerHTML = ''
  button.appendChild(span)
}

export default replaceButton
