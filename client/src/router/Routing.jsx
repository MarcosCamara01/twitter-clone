import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Public } from '../components/layout/public/Public';
import { Private } from '../components/layout/private/Private';
import { Login } from '../components/user/Login';
import { Register } from '../components/user/Register';
import { Feed } from '../components/publication/Feed';
import { AuthProvider } from '../context/AuthProvider';
import { Logout } from '../components/user/Logout';
import { People } from '../components/user/People';
import { Config } from '../components/user/Config';
import { Following } from '../components/follow/Following';
import { Followers } from '../components/follow/Followers';

export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Public />}>
            <Route index element={<Login />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>

          <Route path='/social' element={<Private />}>
            <Route index element={<Feed />} />
            <Route path='feed' element={<Feed />} />
            <Route path='logout' element={<Logout />} />
            <Route path='people' element={<People />} />
            <Route path='settings' element={<Config />} />
            <Route path='following/:userId' element={<Following />} />
            <Route path='followers/:userId' element={<Followers />} />
          </Route>

          <Route path='*' element={
            <h1>Error 404</h1>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
