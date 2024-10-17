// import ListGroup from "./components/ListGroup";

// function App() {
//   return <div><ListGroup /></div>
// }

// export default App;

// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/page/public/HomePage';
import HelpdeskButton from './components/main/HelpdeskButton';
// import ServicesPage from './page/ServicesPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/layanan" element={<ServicesPage />} /> */}
      </Routes>
      <HelpdeskButton/>
    </Router>
  );
};

export default App;
