import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import React, { useState } from 'react'
import { register } from 'src/api/auth'
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const CreateUser = ({ visible, setVisible }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  })
  const handleSubmit = (e) => {
    e && e.preventDefault()
    console.log(user)
    register(user).then((data) => {
      return navigate(0)
    })
  }
  return (
    <CModal
      className="show d-block position-static"
      keyboard={false}
      portal={false}
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <CModalHeader>
        <CModalTitle>Add User</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSubmit} className="row g-3">
          <CCol md={6}>
            <CFormInput
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="email"
              id="inputEmail4"
              label="Email"
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              id="inputtext4"
              label="username"
            />
          </CCol>
          <CCol xs={12}>
            <CFormInput
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              id="password"
              label="password"
              placeholder="****"
            />
          </CCol>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary">Close</CButton>
        <CButton color="primary" onClick={handleSubmit}>
          Save changes
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
export default CreateUser
