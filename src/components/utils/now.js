export function getNow() {
  return window.performance?.now?.() || +new Date()
}
