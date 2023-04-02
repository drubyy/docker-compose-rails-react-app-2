import request from "./request"

export const performLogout = () => {
  request('DELETE', '/logout').then(() => {
    localStorage.clear()
    window.location.href = '/'
  })
}