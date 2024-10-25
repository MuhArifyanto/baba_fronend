import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/page/public/HomePage/index';
import ChatHelpdesk from '../components/page/public/ChatHelpdesk';


function LandingRoutes(){
  const PublicRoutes = [
    {path: "/",element: <HomePage />,},
    {path: "/helpdesk",element: <ChatHelpdesk />,},
  ];

  return (
    <>
      {PublicRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </>
  );
};

export default LandingRoutes;
