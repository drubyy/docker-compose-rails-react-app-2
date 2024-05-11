import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from './components/layouts/DefaultLayout'
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Registration from "./pages/Registration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={
          <DefaultLayout childComponent={<Registration/>} showLink={false} />
        } />
        <Route path="/login" element={
          <DefaultLayout childComponent={<Login/>} showLink={false} />
        } />
        <Route path="/" element={<Dashboard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
