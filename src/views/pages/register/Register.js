import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { loginAction } from 'src/store'
import { register } from 'src/api/auth'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const Register = () => {
  const isLogin = useSelector((state) => state.isLogin)
  const dispatch = useDispatch()
  const [user, setUser] = useState({ username: '', password: '' })

  const [checkUsername, usernameError] = useState(true)
  const [checkPassword, passwordError] = useState(true)

  if (isLogin) return <Navigate to={'/profile'} replace />
  const handleSubmit = (e) => {
    e.preventDefault()
    if (user.username.length < 5 || user.password.length < 5) {
      if (user.username.length < 5) {
        return toast.error('username must be more than 5 characters')
      }
      if (user.password.length < 5) {
        return toast.error('password must be more than 5 characters')
      }
    }
    register(user)
      .then(() => dispatch(loginAction(user)))
      .catch((e) => toast.error('Username exists'))
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      onChange={(e) => {
                        setUser({ ...user, username: e.target.value })
                        usernameError(e.target.value.length < 5)
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={(e) => {
                        setUser({ ...user, password: e.target.value })
                        passwordError(e.target.value.length < 5)
                      }}
                    />
                  </CInputGroup>

                  <div className="d-flex justify-content-between">
                    <div className="col-6">
                      <CButton
                        className="w-100"
                        type="submit"
                        color="success"
                        // disabled={passwordError || usernameError}
                      >
                        Create Account
                      </CButton>
                    </div>
                    <div className="col-6">
                      <Link to="/login">
                        <CButton className="w-100" color="primary">
                          Login
                        </CButton>
                      </Link>
                    </div>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
