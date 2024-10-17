// src/components/Layout.tsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container, Box } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Box sx={{ minHeight: '80vh', py: 5 }}>
        <Container>{children}</Container>
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
