import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from './components/layouts/DefaultLayout'
import Dashboard from "./pages/Dashboard"
import PrivateRoute from "./components/authentication/PrivateRoute";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Registration from "./pages/Registration";

function App() {
  const [triggerFetchVideos, setTriggerFetchVideos] = useState(1)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={
          <DefaultLayout childComponent={<Registration/>} showLink={false} />
        } />
        <Route path="/login" element={
          <DefaultLayout childComponent={<Login/>} showLink={false} />
        } />
        <Route path="/" element={<DefaultLayout triggerFetchVideos={triggerFetchVideos} setTriggerFetchVideos={setTriggerFetchVideos} childComponent={
          <Dashboard triggerFetchVideos={triggerFetchVideos} />
        } />} />
        <Route path="/private" element={
          <PrivateRoute children={<DefaultLayout childComponent={<Dashboard/>} />} />
        } />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
