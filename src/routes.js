import React from 'react'

const Users = React.lazy(() => import('./views/pages/users/User'))
const Profile = React.lazy(() => import('./views/pages/profile/Profile'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/users', name: 'Users', element: Users },
  { path: '/profile', name: 'Users', element: Profile },
]

export default routes
