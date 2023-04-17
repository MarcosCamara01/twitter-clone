import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Public } from '../components/layout/public/Public';
import { Login } from '../components/user/Login';
import { Register } from '../components/user/Register';

export const Routing = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Public />}>
                <Route index element={<Login />} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
