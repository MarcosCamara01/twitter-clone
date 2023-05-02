import React from 'react'
import { Header } from './Header'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'

export const Private = () => {

  const { auth, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>
  } else {
    return (
      <>
        <Header />

        <section className='layout__content'>
          {
            auth._id ? <Outlet /> : <Navigate to="/login" />
          }
        </section>
      </>
    )
  }
}
