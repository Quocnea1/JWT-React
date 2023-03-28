import { CFormInput, CInputGroup, CInputGroupText } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { deleteUser, getAll } from 'src/api/user'
import CreateUser from './CreateUser'

const User = () => {
  const auth = useSelector((state) => state.auth)
  const [users, setUsers] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize] = useState(5)
  const [visible, setVisible] = useState(false)
  const [search, setSearch] = useState('')

  const totalPage = Math.ceil(users.length / pageSize)

  const handleDelete = async (id) => {
    deleteUser(id).then((data) => {
      setUsers(() => users.filter((user) => user._id !== id))
    })
  }
  useEffect(() => {
    getAll().then((data) => setUsers(data.filter((x) => x._id !== auth._id)))
  }, [auth._id])

  return (
    <div className="card mb-4">
      <CreateUser visible={visible} setVisible={setVisible} />
      <div className="card-header">
        {auth.isAdmin && (
          <button onClick={() => setVisible(!visible)} className="btn btn-primary mx-2">
            add user
          </button>
        )}
      </div>
      <div className="card-body">
        <CInputGroup className="mb-3">
          <CInputGroupText id="basic-addon1">search</CInputGroupText>
          <CFormInput
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </CInputGroup>
        <div className="example">
          <div className="tab-content rounded-bottom">
            <div className="tab-pane fade active show p-3 preview">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">email</th>
                    <th scope="col">userName</th>
                    <th scope="col">IsAdmin</th>
                    <th scope="col">Acctions</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
                    .filter((user) => user.username.includes(search))
                    .map((user) => (
                      <tr key={user._id}>
                        <th scope="row">{user._id}</th>

                        <th scope="row">{user.email}</th>
                        <td>{user.username} </td>
                        <td>{user.isAdmin ? 'admin' : 'user'}</td>
                        <td>
                          {auth.isAdmin && (
                            <button
                              className="btn  btn-danger"
                              onClick={() => handleDelete(user._id)}
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <button
                      className="page-link"
                      href="#/"
                      onClick={() => setPageIndex(pageIndex > 1 ? pageIndex - 1 : pageIndex)}
                    >
                      Previous
                    </button>
                  </li>

                  <li className="page-item">
                    <button
                      className="page-link"
                      href="#/"
                      onClick={() =>
                        setPageIndex(pageIndex < totalPage ? pageIndex + 1 : pageIndex)
                      }
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
