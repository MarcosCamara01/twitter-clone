import React from 'react'
import { Header } from './Header'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { BsTwitter } from 'react-icons/bs';

export const Public = () => {

  const { auth, loading } = useAuth();

  if (loading) {
    return <div className='twitter-logo-bx'><BsTwitter /></div>
  } else {
    return (
      <>
        <Header />

        <section className='layout__content'>
          {
            !auth._id ? <Outlet /> : <Navigate to="/social" />
          }
        </section>
      </>
    )
  }
}
