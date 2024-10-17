// src/routes/HelpdeskRoute.tsx
import React from 'react';
import { Route } from 'react-router-dom';
import ChatHelpdesk from '../components/page/public/ChatHelpdesk';

const HelpdeskRoute = () => (
  <Route path="/helpdesk" element={<ChatHelpdesk />} />
);

export default HelpdeskRoute;
