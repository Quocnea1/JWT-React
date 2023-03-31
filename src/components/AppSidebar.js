import React from 'react'
import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { AppSidebarNav } from './AppSidebarNav'
import { logoNegative } from 'src/assets/brand/logo-negative'
import { useSelector, useDispatch } from 'react-redux'
import SimpleBar from 'simplebar-react'
// sidebar nav config
import navigation from '../_nav'
const AppSidebar = () => {
  const sidebarShow = useSelector((state) => state.sidebarShow)
  return (
    <CSidebar position="fixed " visible={sidebarShow}>
      {/* logo */}
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
      </CSidebarBrand>
      {/* nav */}
      <CSidebarNav>
        <SimpleBar>
          {/* biến items được gọi từ */}
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      {/*  */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
