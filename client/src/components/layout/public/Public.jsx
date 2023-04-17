import React from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'

export const Public = () => {
  return (
    <>
        <Header />
        
        <section className='layout__content'>
            <Outlet />
        </section>
    </>
  )
}
