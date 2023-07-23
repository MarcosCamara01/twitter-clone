import React from 'react'
import { Header } from './Header'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import "../../../assets/css/styles.css";
import { BsTwitter } from 'react-icons/bs';

export const Private = () => {

  const { auth, loading } = useAuth();

  if (loading) {
    return <div className='twitter-logo-bx'><BsTwitter /></div>
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
