import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Auth from '../pages/Auth'

function AllRoutes() {
     return (
          <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/auth" element={<Auth />} />
          </Routes>
     )
}

export default AllRoutes