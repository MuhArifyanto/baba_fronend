import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import LandingRoutes from './routes/LandingRoute';
import NotFoundPage from './components/main/NotFoundPage';

function App(){
  return (
    <Router>
      <Routes>
        {LandingRoutes()}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
