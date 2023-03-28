import { CButton, CCol, CForm, CFormInput } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { update } from 'src/api/user'
import { logoutAction } from 'src/store'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('auth_user'))
      setUser(user)
    } catch (error) {}
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submit')
    update(user._id, user).then((data) => {
      dispatch(logoutAction())
      navigate('/login')
    })
  }
  return (
    <CForm className="row g-3">
      <CCol md={6}>
        <CFormInput
          onSubmit={handleSubmit}
          type="email"
          id="inputEmail4"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          label="Email"
          defaultValue={user.email}
        />
      </CCol>
      <CCol md={6}>
        <CFormInput
          type="text"
          id="username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          label="username"
          defaultValue={user.username}
        />
      </CCol>
      <CCol xs={12}>
        <CFormInput id="inputAddress" label="id" defaultValue={user._id} readOnly />
      </CCol>
      <CCol xs={12}>
        <CButton onClick={handleSubmit} type="submit">
          Update
        </CButton>
      </CCol>
    </CForm>
  )
}

export default Profile
