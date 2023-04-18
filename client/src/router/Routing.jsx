import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Public } from '../components/layout/public/Public';
import { Private } from '../components/layout/private/Private';
import { Login } from '../components/user/Login';
import { Register } from '../components/user/Register';
import { Feed } from '../components/publication/Feed';

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Public />}>
          <Route index element={<Login />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        <Route path='/social' element={<Private />}>
          <Route index element={<Feed />}></Route>
          <Route path='feed' element={<Feed />}></Route>
        </Route>

        <Route path='*' element={
          <h1>Error 404</h1>
        }/>
      </Routes>
    </BrowserRouter>
  )
}
