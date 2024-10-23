import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import LandingRoutes from './routes/LandingRoute';

function App(){
  return (
    <Router>
    <LandingRoutes/>
    </Router>
  );
}

export default App;
