import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/page/public/HomePage';
import ChatHelpdesk from '../components/page/public/ChatHelpdesk';

const LandingRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/helpdesk" element={<ChatHelpdesk />} />
    </Routes>
  );
};

export default LandingRoutes;
