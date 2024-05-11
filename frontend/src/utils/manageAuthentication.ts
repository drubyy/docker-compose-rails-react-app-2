export const isUserLoggedIn = localStorage.getItem('loggedIn') === 'true'

export const currentUser = {
  email: localStorage.getItem('email')
}