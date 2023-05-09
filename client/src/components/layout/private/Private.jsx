import React from 'react'
import { Header } from './Header'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { Loader } from '../../../helpers/Loader'

export const Private = () => {

  const { auth, loading } = useAuth();

  if (loading) {
    return <div className='loader__bx loader__bx--center'><Loader /></div>
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
