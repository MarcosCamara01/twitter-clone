import React from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export const Private = () => {
  return (
    <>
        <Header />
        
        <section className='layout__content'>
            <Outlet />
        </section>

        <Sidebar />
    </>
  )
}
