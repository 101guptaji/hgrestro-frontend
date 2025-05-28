import React from 'react'
import Sidebar from '../components/Sidebar'
import MenuPage from './MenuPage'
import '../styles/menuManagement.css'

const MenuManagement = () => {
  return (
    <div className='menumanagement'>
      <div className="menu-sidebar">
        <Sidebar selected={"menumanagement"} />
      </div>
  
      <div className="menus">
        <MenuPage />
      </div>

    </div>
  )
}

export default MenuManagement