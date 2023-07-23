import React from 'react'
import { Header } from './Header'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import twitter from "../../../assets/img/Twitter_Logo.svg.png"
import "../../../assets/css/styles.css";

export const Private = () => {

  const { auth, loading } = useAuth();

  if (loading) {
    return <div className='twitter-logo-bx'><img src={twitter} className='img-logo' alt="Twitter logo" /></div>
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
